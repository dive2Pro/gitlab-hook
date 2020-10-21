const queryString = require('querystring')
const https = require('https')
const Charbot = require('dingtalk-robot-sender');
const Store = require('./store');

const ROBOT = {
    comment: 'https://oapi.dingtalk.com/robot/send?access_token=2e82c6c2721d515f8310cee3b9625dc8e2303d56afd30ad2ff29a05d7159b63e'
}


const robot = new Charbot({
    webhook: ROBOT.comment
})


class DingDing {
    async dispatch(type, info) {
        if(type === 'comment') {
            if(info.msg.toLowerCase().indexOf('lgtm') > -1) {
                if (await Store.load(info.id, 'done')) {
                    return;
                }
                await Store.save(info.id, info.authorId);
                const all = await Store.loadAll(info.id)
                if(Object.values(all).every(Boolean)) {
                    await Store.maker(info.id, { done: true })
                    robot.markdown(info.title + "--" + info.target.dingding, 
                    `# ${info.title} \n\n` +
                    `所有人已经review 完毕， 可以合并了 \n\n [查看](${info.url}) `);

                    robot.text(`Comment: 找最近的【查看】`, {
                        atMobiles: [info.target.dingding.phone],
                    })
                    return;
                }
            }
            
            if(info.username === info.target.username) {
                return;
            }

            robot.markdown(info.title + "--" + info.target.dingding.name, 
            `# ${info.title} \n`+
            `开发者： ${info.target.dingding.name} \n\n Comment:  \n\n` +
            `${info.author} : ${info.msg} \n\n [查看](${info.url}) `);

            robot.text(`Comment: 找最近的【查看】`, {
                atMobiles: [info.target.dingding.phone],
            })
        } else if(type === 'review') {
            robot.markdown(info.title + '-- review',
            `# ${info.title} \n`+
            `开发者： ${info.target.dingding.name} \n\n ` +
            `已经准备好被review了： [查看](${info.url}) `,
            )

            robot.text('review: 请这些同学review ' + info.atMobiles.map( s => `@${s}`).join(" "), {
                ...info
            })
        }
    }

    post(data, type) {
        const postData = JSON.stringify(data);

        // const req = https.request(ROBOT[type], { method: 'POST', headers: {
        //     "Content-Type": 'application/json',
        //     "Content-Length": postData.length
        // }}, (res) => {
        //     console.log(`statusCode: ${res.statusCode}`)
        //     let data = '';
        //     res.on('data', (chunk) => {
        //         data += chunk
        //     })

        //     res.on('end', () => {
        //         console.log(JSON.parse(data));
        //     })
        // })

        // req.write(postData);
        // req.end();
    }

}

module.exports = new DingDing()