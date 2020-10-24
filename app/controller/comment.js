const Controller = require('egg').Controller;


class CommentController extends Controller {
    async index() {
        if(this.ctx.request.body.merge_request) {
            return this.merge_request();
        } else if(this.ctx.request.body.commit) {
            return this.commit()
        } else if(this.ctx.request.body.issue) {
            return this.issue()
        } else {
            this.ctx.body = 'No more support!'
        }
        
    }
    async merge_request() {
        // 1. save to gitlab db
        // 2. extract data to info db
        // 3. stop & start an event loop
        this.ctx.body = 'merge_request'
    }

    async commit() {
        // 1. save to gitlab db
        // 2. extract data to info db
        // 3. stop & start an event loop

    }

    async issue() {
        // 1. save to gitlab db
        // 2. extract data to info db
        // 3. stop & start an event loop
    }
}

module.exports = CommentController;