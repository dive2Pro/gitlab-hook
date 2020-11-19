const Service = require("egg").Service;

class Common extends Service {
    async extractUsersFrom(description) {
        const reg = /((@([^\s]*)?\s)|(@(.+)$))/gm;

        const mentions = [];
        let result;
        while ((result = reg.exec(description)) !== null) {
            mentions.push(result[0].trim().replace("@", ""));
        }

        // 找到 users
        const users = await this.ctx.model.Info.User.find({username: {$in: mentions}})
        return users;
    }

    async extractMergeRequestFrom(note) {
        const reg = /((!([^\s]*)?\s)|(!(.+)$))/gm;
        const merge_request = reg.exec(note);

        if (!merge_request) {
            return null;
        }

        const id = merge_request[0].trim().replace("!", "");

        return await this.ctx.model.Info.MergeRequest.find({ id });
    }
}

module.exports = Common;
