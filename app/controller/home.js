const Controller = require('egg').Controller;


class HomeController extends Controller {
    async index() {
        this.ctx.body = "HELLO"
    }
}

module.exports = HomeController;