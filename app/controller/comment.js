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
        const {id, note} = body.object_attributes;
        const {username} = body.user;
        // 取出 note 中被 @ 的人

        const users = this.ctx.service.common.extractUsersFrom(note);

        // 添加当前 comment id 到 数据库

        // 2.2  写入数据
        const found = await this.ctx.model.Info.MergeRequest.findOne({
            id: merge_request_id,
        }).exec();

        if (!found) {
            // TODO throw error
        }

        found.users = Array.from(new Set([...found.users, users.map(user => user.id)]));
        found.comments = Array.from(new Set([...found.comments, id]));
        await found.save();
        this._triggerLoop();
        // 3. stop & start an event loop
    }

    // TODO: 发送消息
    _triggerLoop() {
    }

    async commit(body) {
        // 2. extract data to info db
        const {id: commit_id} = body.commit;
        const {id: comment_id, note} = body.object_attributes;
        const {username} = body.user;

        const users = await this.ctx.service.common.extractUsersFrom(note);
        const mergeRequest = await this.ctx.service.common.extractMergeRequestFrom(note) || {};

        const foundCommit = await this.ctx.model.Info.Commit.findOne({
            id: commit_id
        }, {upsert: true});


        // 3. stop & start an event loop
        this._triggerLoop();
    }

    async issue(body) {
        // 2. extract data to info db
        // 3. stop & start an event loop
    }
}

module.exports = CommentController;
