const { app, mock, assert } = require('egg-mock/bootstrap');
const DATA_MERGE_COMMENT = require('./merge_comment.json');

describe('test/controller/comment.test.js', () => {
    let app;
    before(() => {
        app = mock.app();
        return app.ready();
    })

    // it('should mock ctx.body.merge_request', () => {
    //     const ctx = app.mockContext({

    //     })
    //     assert(ctx)
    // })
    it('mock comment on merge request ', () => {
        app.mockCsrf();

        return app.httpRequest()
            .post('/comment')
            .type('form')
            .send(DATA_MERGE_COMMENT)
            .expect(200)
            .expect('merge_request')
    })
})