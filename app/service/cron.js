const Service = require("egg").Service;


class Loop {
    constructor(service, id) {
        this.count = 1;
        this.id = id;
    }

    update(cb) {
        this.stop();
        this.timeout = setTimeout(() => {
            cb(this.id);
            // if (this.count <= 6)
            //     this.count++;
            // this.update(cb);
            // 每 (20 * n) min
        }, (20 * this.count) * 1000 * 60);
    }

    isOfficeTime = () => {
        // 8:30 : 18:00
        const dayInWeek = new Date().getDay();
        const hours = new Date().getHours();

    }

    stop() {
        clearTimeout(this.timeout);
    }
}

const weakCache = new Map();

class CronService extends Service {
    triggerLoop(merge_request_id) {
        console.log(this)
        if (!weakCache.get(merge_request_id)) {
            weakCache.set(merge_request_id, new Loop(this, merge_request_id));
        }

        // 当有回复的时候, 顺延当前的请求

        weakCache.get(merge_request_id).update(this.trigger);
    }

    // 取出最后的几个 comment 作为提示
    trigger = async (merge_request_id) => {
        const found = await this.ctx.model.Info.MergeRequest.findOne({
            id: merge_request_id,
        }).exec();
        const comments = []
        for await  (let id of found.comments.slice(-5)) {
            const comment = await this.ctx.model.Gitlab.Comment.findOne({
                id
            }).exec();
            const {object_attributes: {note, url}, user: {name}} = comment;
            comments.push({note, url, name});
        }
        const mq = await this.ctx.model.Gitlab.MergeRequest.findOne({
            id: merge_request_id
        }).exec();

        const users = await this.ctx.model.Info.User.find({
            id: { "$in": found.users }
        })
        this.ctx.service.dingding.comments(mq.object_attributes, users, comments)
    }

    stopLoop(merge_request_id) {
        if (weakCache.get(merge_request_id)) {
            weakCache.get(merge_request_id).stop();
            weakCache.delete(merge_request_id)
        }
    }
}


module.exports = CronService;
