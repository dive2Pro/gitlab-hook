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
    const users = await this.ctx.model.Info.User.find({ username: { $in: mentions }})
    return users;
  }
}

module.exports = Common;
