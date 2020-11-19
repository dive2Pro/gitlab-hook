const mongoose = require("mongoose");
const Service = require("egg").Service;

class GitlabService extends Service {
    async saveComment(json) {
        const comment = new this.ctx.model.Gitlab.Comment(json);
        await comment.save();
        return "OK";
    }

    async saveMergerequest(json) {
        const mr = await this.ctx.model.Gitlab.MergeRequest.findOneAndUpdate(
            {
                id: json.object_attributes.id
            },
            {...json, id: json.object_attributes.id},
            {upsert: true}
        );
        return mr;
    }

    async saveIssue(issue) {

    }

    async findMergerequest(id) {
    }

    async findIssue(id) {
    }
}

module.exports = GitlabService;
