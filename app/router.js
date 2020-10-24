module.exports = app => {
    const { router, controller } = app;

    router.get('/', controller.home.index)
    router.post('/comment', controller.comment.index)
    router.post('/merge_request', controller.mergeRequest.index)
}