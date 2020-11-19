const {app, mock, assert} = require('egg-mock/bootstrap');
const DATA_MERGE_COMMENT = require('./merge_comment.json');

describe('test/controller/comment.test.js', () => {
    it('mock comment on merge request ', () => {
        app.mockCsrf();

        return app.httpRequest()
            .post('/comment')
            .type('form')
            .send({
                ...DATA_MERGE_COMMENT,
                object_attributes: {
                    ...DATA_MERGE_COMMENT.object_attributes,
                    id: Date.now(),
                    note: Date.now()  + 'kjlkajsldkjalsd'
                }
            })
            .expect(200)
            .expect('OK')
    })

    it('mock comment on merge request / LGTM', () => {
        app.mockCsrf();

        return app.httpRequest()
            .post('/comment')
            .type('form')
            .send({
                ...DATA_MERGE_COMMENT,
                object_attributes: {
                    ...DATA_MERGE_COMMENT.object_attributes,
                    "note": "fasdfasdf LGTM",
                }

            })
            .expect(200)
            .expect('OK')
    })
})
