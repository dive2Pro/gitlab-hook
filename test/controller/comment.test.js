const { app, mock, assert } = require('egg-mock/bootstrap');
const DATA_MERGE_COMMENT = require('./merge_comment.json');

describe('test/controller/comment.test.js', () => {
    it('mock comment on merge request ', () => {
        app.mockCsrf();

        return app.httpRequest()
            .post('/comment')
            .type('form')
            .send(DATA_MERGE_COMMENT)
            .expect(200)
            .expect('OK')
    })
})