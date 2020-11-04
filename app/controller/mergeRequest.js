const Controller = require("egg").Controller;

class MergeRequestController extends Controller {
    async index() {

        if (this.ctx.request.body.object_attributes.action === "open") {
            await this.ctx.service.gitlab.saveMergerequest(this.ctx.request.body);
        } else {
            // update
            await this.ctx.service.gitlab.saveMergerequest(this.ctx.request.body);
        }
        // update Info
        const {object_attributes, user} = this.ctx.request.body;

        const {id, author_id, description} = object_attributes;
        const users = this.ctx.service.common.extractUsersFrom(description);

        const infoMergeRequest = await this.ctx.model.Info.MergeRequest.findOneAndUpdate(
            {id},
            {
                id,
                users: Array.from(new Set([author_id, ...users.map( user => user.id)])),
            },
            {
                upsert: true,
            }
        );
        this.ctx.body = infoMergeRequest;
    }
}

module.exports = MergeRequestController;
