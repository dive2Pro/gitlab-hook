const Service = require("egg").Service;
const Charbot = require('dingtalk-robot-sender');

const ROBOT = {
    comment: 'https://oapi.dingtalk.com/robot/send?access_token=2e82c6c2721d515f8310cee3b9625dc8e2303d56afd30ad2ff29a05d7159b63e'
}


const robot = new Charbot({
    webhook: ROBOT.comment
})

class DingDingService extends Service {

    comments(mq, users, comments) {

        robot.markdown(mq.title + ' ---- ',
            `# 合并请求: ${mq.title}; 已有如下回复,  \n\n` +
            `>  review [查看](${mq.url}) \n\n` +
            comments.map((cm, index) => {
                return `- ${cm.name}: ${cm.note} ; [查看](${cm.url})`
            }).join("\n\n"),
            {
                atMobiles: users.map(user => user.phone)
            }
        ).then((res, v) => {
            console.log(res, v)
        })
        ;

        robot.text('review: 下列参与的同学可以去查看咯 ', {
            atMobiles: users.map(user => user.phone)
        })
    }

    comment() {
        // 通知
    }

    merge(info) {

        robot.markdown(info.title + "--",
            `# ${info.title} \n\n` +
            `所有人已经review 完毕， 可以合并了 \n\n [查看](${info.url})
             `);

        robot.text(`Comment: 找最近的【查看】`, {atMobiles: [info.phone],})
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
             `,
            info.atMobiles
        )

        robot.text(`Comment: 找最近的【查看】`, {
            atMobiles: info.atMobiles,
        })
    }

}

module.exports = DingDingService;
