const fs = require('fs/promises');
const path = require('path');

let DATABASE;


async function readDatabase() {
    const data = await fs.readFile(path.join(__dirname, 'store.json'), 'utf-8')
    DATABASE = JSON.parse(data);
}

async function saveDatabase(data) {
    await fs.writeFile(path.join(__dirname, 'store.json'), JSON.stringify(data), 'utf-8')
}


(async () => {
  await readDatabase();
})()

class Store {
    async create(mqId, commentIds) {
        if(!DATABASE) {
            DATABASE = await readDatabase();
        }
        let data = DATABASE;

        if (data[mqId]) {
            const olds = Object.keys(data[mqId])
            if (commentIds.every(id => olds.find(oldId => oldId === id))) {
                return false;
            } else {
                const oldObj = data[mqId];
                data[mqId] = {};
                commentIds.forEach(id => {
                    data[mqId][id] = !!oldObj[id] 
                })
            }
        } else {
            data[mqId] = {};
            commentIds.forEach(id => {
            data[mqId][id] = false
        })
        }
        await saveDatabase(data);
        return true;
    }

    async save(mqId, commendId) {
        if(!DATABASE) {
            DATABASE = await readDatabase();
        }
        DATABASE[mqId][commendId] = true;
        await saveDatabase(DATABASE);
        return DATABASE[mqId];
    }

    async load(mqId, commendId) {
        if(!DATABASE) {
            DATABASE = await readDatabase();
        }
        return DATABASE[mqId][commendId];
    }

    async loadAll(mqId) {
        if(!DATABASE) {
            DATABASE = await readDatabase();
        }
        return DATABASE[mqId];
    }

    async maker(mqId, obj) {
        if(!DATABASE) {
            DATABASE = await readDatabase();
        }
        DATABASE[mqId] = {...DATABASE[mqId], ...obj}
        await saveDatabase(DATABASE);
        return DATABASE[mqId];
    }
}

module.exports = new Store()