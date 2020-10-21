const Http = require('http');
const queryString = require('querystring')
const Person = require('./person');
const DingDing = require('./dingding');
const Store = require('./store');

async function formData(request) {
    return new Promise((resolve, reject) => {
        let formData = '';
        request.on('data', buffer => {
            formData += buffer.toString();
        })
        request.on('end', () => {
            const passedData = JSON.parse(formData);
            console.log(passedData, ' = data')
            resolve(passedData)
        })
        request.on('error', reject);
    })
}



const handlerComment = async ({req, context}, res) => {
    const body = await formData(req);

    const { user, object_attributes, merge_request } = body;
    
    const { noteable_type, note, url,  } = object_attributes

    DingDing.dispatch('comment', {
        author: user.name,
        msg: note,
        type: noteable_type,
        url,
        target: Person[merge_request.author_id],
        title: merge_request.title,
        username: user.username,
        authorId:  Users[user.username].id ,
        id:  merge_request.id
    })

    res.writeHead(200, { 'Context-Type': 'application/json'})
    res.end(`{ "code": true }`);
}

const Users = Object.entries(Person).reduce((p, [id, obj])=> {
    p[obj.username] = {
        ...obj,
        id
    }
    return  p
}, {})


const handlerMergerequest = async ({ req, context}, res) => {
    const body = await formData(req);

    const { user, object_attributes, assignee } = body;
    
    const { noteable_type, note, url, description  } = object_attributes
    if(object_attributes.merge_status !== 'can_be_merged') {
        
    } else {
        const info = {
            author: user.name,
            msg: description,
            type: noteable_type,
            url,
            target: Person[object_attributes.author_id],
            title: object_attributes.title,
            username: user.username,
            id: object_attributes.id
        }

        const data = new RegExp('(review:)(.+)?(\\r\\n)*', 'gi').exec(description);
        const users = data[2].trim().split(" ").filter(Boolean).map(username => username.replace("@", "").trim());
        if(users.find((user) =>  user === 'all')) {
            info.isAtAll = true;
            info.atMobiles = Object.entries(Person).map(([k, v]) => v.dingding.phone)
        } else {
            info.atMobiles = users.map( user => {
                return Users[user].dingding.phone
            })
        }

        const isCreated = await Store.create(info.id, info.isAtAll  ? Object.keys(Person) : users.map( username => Users[username].id))
        console.log(isCreated, ' -=-= isCrate')
        if(isCreated) {
            DingDing.dispatch('review', info)
        }
    }

    res.writeHead(200)
    res.end('')
}

const routers = {
    "POST:/comment": handlerComment,
    "POST:/mergerequest": handlerMergerequest
}

const app = Http.createServer(async (req, res) => {
    const { method, url } = req
    const key = `${method}:${url}`;
    if(routers[key] === undefined) {
        res.writeHead(404)
        return res.end('')
    } 

    try {
        await routers[key]({req, context: {}}, res)
    }catch(e) {
        console.error(e);
    }

}).listen(3000)
