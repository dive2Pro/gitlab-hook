const Service = require('egg').Service;


class GitlabService extends Service {
    async saveComment(json) {
        const comment = new this.ctx.model.Gitlab.Comment(json)
        console.log(comment)
        comment.save(function (err) {
            if(err) {
                console.error(err)
            } else {
                console.log('saved')
            }
        })
    }

    async saveMergerequest(merge_request) {
    }

    async saveIssue(issue) {

    }

    async findMergerequest(id) {

    }

    async findIssue(id) {

    }

}

module.exports = GitlabService;