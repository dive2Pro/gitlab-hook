const Controller = require('egg').Controller;


class MergeRequestController extends Controller {
    async index() {
        if(this.ctx.request.body.object_attributes.action === 'open') {
            await this.ctx.service.gitlab.saveMergerequest(this.ctx.request.body);
        } else {
            // update

        }
    }
}

module.exports = MergeRequestController;