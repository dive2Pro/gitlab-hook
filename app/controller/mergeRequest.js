const Controller = require("egg").Controller;

class MergeRequestController extends Controller {
    async index() {
        if (this.ctx.request.body.object_attributes.action === "open") {
            await this.ctx.service.gitlab.saveMergerequest(this.ctx.request.body);
        } else if (this.ctx.request.body.object_attributes.action === "close") {
            return;
        } else {
            // update
            await this.ctx.service.gitlab.saveMergerequest(this.ctx.request.body);
        }

        // update Info
        const {object_attributes} = this.ctx.request.body;
        const author = await this.ctx.model.Info.User.findOne({
            id: object_attributes.author_id
        })

        const {id, iid , description, merge_status, state, assignee_id } = object_attributes;
        const users = await this.ctx.service.common.extractUsersFrom(description);
        const reviewers = Array.from(new Set([...users.map(user => user.id)]));
        const infoMergeRequest = await this.ctx.model.Info.MergeRequest.findOneAndUpdate(
            {id},
            {
                id,
                reviewers,
                users: [...reviewers, author.id],
                iid,
                author: assignee_id
            },
            {
                upsert: true,
            }
        );
        this.ctx.body = infoMergeRequest;

        // 只要状态是可以review 的, 那么就应该通知

        const mrAuthor = await this.ctx.model.Info.User.findOne({
            id: assignee_id
        });

        const info = {
            url: object_attributes.url,
            // 应该是
            target: author.name,
            title: object_attributes.title,
            atMobiles: users.map(user => user.phone),
            author: mrAuthor.name,
        }
        if(state === 'merged') {
            //
            this.ctx.service.dingding.merged(users, info)
        } else if (merge_status === 'can_be_merged' && users.length > 0) {
            this.ctx.service.dingding.review(users, info)
        }

    }
}

module.exports = MergeRequestController;
