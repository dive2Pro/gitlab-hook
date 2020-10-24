
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('gitlab operation', () => {

    it('save comment to db', async () => {
        const ctx = app.mockContext();
        const DATA = require('../controller/merge_comment.json');
        const saved = await ctx.service.gitlab.saveComment(DATA);

        assert(saved);
        assert(saved.id = DATA.object_attributes.id);
    })


});