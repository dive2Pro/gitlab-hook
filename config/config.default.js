exports.keys = "HYC";

exports.mongoose = {
    client: {
        url:  "mongodb+srv://hyc:qwe123qwe@cluster0.qjjny.azure.mongodb.net/gitlab?retryWrites=true&amp;w=majority",
        options: {},
        // mongoose global plugins, expected a function or an array of function and options
        plugins: [],
      },
}

exports.security = {
    csrf: {
        // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
        ignore: ctx => {
            console.log(ctx)
            // TODO: 做权限
            return true;
        }
    },
}