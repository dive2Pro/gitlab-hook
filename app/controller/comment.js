const Controller = require("egg").Controller;

class CommentController extends Controller {
    async index() {
        // 1. save to gitlab db
        await this.ctx.service.gitlab.saveComment(this.ctx.request.body);
        if (this.ctx.request.body.merge_request) {
            return this.merge_request(this.ctx.request.body);
        } else if (this.ctx.request.body.commit) {
            return this.commit(this.ctx.request.body);
        } else if (this.ctx.request.body.issue) {
            return this.issue(this.ctx.request.body);
        } else {
            this.ctx.body = "No support yet!";
        }
    }

    // 都是在 info 中操作
    async merge_request(body) {
        // 2. extract data to info db
        // 2.1  找到  merge_request 所需的数据,
        const {id: merge_request_id} = body.merge_request;
        const {id, note, author_id} = body.object_attributes;
        const {username} = body.user;
        // 取出 note 中被 @ 的人

        const users = await this.ctx.service.common.extractUsersFrom(note);

        // 添加当前 comment id 到 数据库

        // 2.2  写入数据
        const found = await this.ctx.model.Info.MergeRequest.findOne({
            id: merge_request_id,
        }).exec();

        if (!found) {
            // TODO throw error
        } else {
            found.users = Array.from(new Set([...found.users, ...users.map(user => user.id)]));
            found.comments = Array.from(new Set([...found.comments, id]));

            const containsLGTM = this.ctx.service.common.containsLGTM(note);
            if (containsLGTM) {
                found.approved = Array.from(new Set([...found.approved, author_id]));
            }

            await found.save();

            if (found.approved.length === found.reviewers.length) {
                this.cleanLoop(merge_request_id)

                const mq = await this.ctx.model.Gitlab.MergeRequest.findOne({
                    id: merge_request_id
                });

                const u = await this.ctx.model.Info.User.findOne({
                    id: author_id
                });
                // dingding
                this.ctx.service.dingding.merge({
                    title: mq.object_attributes.title,
                    url: mq.object_attributes.url,
                    phone: u.phone
                })
            } else {
                if (this.ctx.service.common.extractNowFrom(note)) {
                    this.triggerNow(merge_request_id);
                } else {
                    this.triggerLoop(merge_request_id);
                }
            }
        }

        // 3. stop & start an event loop
        this.ctx.body = 'OK';
    }

    triggerNow(id) {
        this.ctx.service.cron.trigger(id);
    }

    cleanLoop(merge_request_id) {

    }

    //  当前的更新时间, 发送消息 发送消息
    triggerLoop(merge_request_id) {
        this.ctx.service.cron.triggerLoop(merge_request_id);
    }

    async commit(body) {
        // 2. extract data to info db
        const {id: commit_id} = body.commit;
        const {id: comment_id, note} = body.object_attributes;

        const users = await this.ctx.service.common.extractUsersFrom(note);
        let mergeRequest = await this.ctx.service.common.extractMergeRequestFrom(note);


        const found = await this.ctx.model.Info.Commit.findOneAndUpdate({
            id: commit_id,
        }, {
            id: commit_id
        }, {
            upsert: true,
            returnOriginal: false
        });

        if (!mergeRequest) {
            mergeRequest = found.merge_request;
        }

        found.users = Array.from(new Set([...found.users, ...users.map(user => user.id)]));
        found.comments = Array.from(new Set([...found.comments, comment_id]));

        // 关联 mergeRequest 和  foundCommit
        if (mergeRequest) {
            mergeRequest.commits = Array.from(new Set([...mergeRequest.commits, commit_id]));
            mergeRequest.users = Array.from(new Set([...mergeRequest.users, ...found.users]));
            mergeRequest.comments = Array.from(new Set([...mergeRequest.comments, ...found.comments]));
            await this.ctx.model.Info.MergeRequest.findOneAndUpdate({
                id: mergeRequest.id
            }, mergeRequest)
            found.merge_request = mergeRequest;
        }

        await found.save();

        // 3. stop & start an event loop
        if (mergeRequest) {
            if (this.ctx.service.common.extractNowFrom(note)) {
                this.triggerNow(mergeRequest.id);
            } else {
                this.triggerLoop(mergeRequest.id);
            }
        }
    }

    async issue(body) {
        // 2. extract data to info db
        // 3. stop & start an event loop
    }
}

module.exports = CommentController;
