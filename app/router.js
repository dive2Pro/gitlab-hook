module.exports = app => {
    const { router, controller } = app;

    router.get('/', controller.home.index)
    router.post('/comment', controller.comment.index)
    router.post('/mergerequest', controller.mergeRequest.index)
}