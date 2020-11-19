const Service = require("egg").Service;
const Charbot = require('dingtalk-robot-sender');

const ROBOT = {
    comment: 'https://oapi.dingtalk.com/robot/send?access_token=2e82c6c2721d515f8310cee3b9625dc8e2303d56afd30ad2ff29a05d7159b63e'
}


const robot = new Charbot({
    webhook: ROBOT.comment
})

class DingDingService extends Service {

    comment() {
        // 通知
    }

    review(users, object_attributes) {
        const info = {
            url: object_attributes.url,
            target: object_attributes.user.name,
            title: object_attributes.title,
            atMobiles: users.map(user => user.phone)
        }

        robot.markdown(info.title + '-- review',
            `# ${info.title} \n` +
            `开发者： ${info.target} \n\n ` +
            `已经准备好被review了： [查看](${info.url}) \n
             **这是演习!!!**
             `,
            info.atMobiles
        )

        robot.text(`Comment: 找最近的【查看】`, {
            atMobiles: info.atMobiles,
        })
    }

}

module.exports = DingDingService;
