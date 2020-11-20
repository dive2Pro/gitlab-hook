const { app, mock, assert } = require('egg-mock/bootstrap');

describe('cron operation', () => {

    it('trigger event', async () => {
        const ctx = app.mockContext();
        const saved = await ctx.service.cron.trigger('574');
    })


});
