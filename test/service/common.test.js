const { app, mock, assert } = require('egg-mock/bootstrap');

describe('common operation', () => {

    it('extractMergeRequestFrom', async () => {
        const ctx = app.mockContext();
        const saved = await ctx.service.common.extractMergeRequestFrom('!31 asdf');

        assert(saved)
    })


});
