module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        username: String,
        id: String,
        name: String,
        phone: String
    });

    return mongoose.model("User", schema);
};

function insertUsers() {
    this.ctx.model.Info.User.insertMany([
        {
            name: '黄艺川',
            phone: '13060823841',
            username: 'toyluck',
            id: 103
        },
        {
            name: '曾绮晴',
            phone: '15521167235',
            username: 'zengqiqing',
            id: 171
        },
        {
            id: 84,
            name: '黎杰',
            phone: '17665308376',
            username: 'jie'
        },
        {
            username: 'chenyiqiu',
            id: 19,
            name: '陈亿秋',
            phone: '13544039923'
        }
        ,
        {
            username: 'chenhui',
            id: 143,
            name: '陈辉',
            phone: '18680205694'
        },
        {
            id: 155,
            name: "陈航",
            phone: '18574929495',
            username: 'chenhang'
        }
    ], function(err) {
        console.log(err)
    })
}