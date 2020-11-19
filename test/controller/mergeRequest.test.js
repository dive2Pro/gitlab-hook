const {app} = require("egg-mock/bootstrap");
const DATA_MERGE_CREATE = require("./merge_create.json");

describe("test/controller/mergeRequest.test.js", () => {
    it("create a log", () => {
        app.mockCsrf();

        return app
            .httpRequest()
            .post("/merge_request")
            .type("form")
            .send(DATA_MERGE_CREATE)
            .expect(200)
    });

    it("update a log", () => {
        app.mockCsrf();

        return app
            .httpRequest()
            .post("/merge_request")
            .type("form")
            .send({...DATA_MERGE_CREATE, object_attributes: {...DATA_MERGE_CREATE.object_attributes, action: 'update'}})
            .expect(200)
    });

    it("update a log with review users", () => {
        app.mockCsrf();

        return app
            .httpRequest()
            .post("/merge_request")
            .type("form")
            .send({
                ...DATA_MERGE_CREATE, object_attributes: {
                    ...DATA_MERGE_CREATE.object_attributes,
                    description: `closes #13
                    @jie @chenyiqiu 看看这个
                    @chenhui
                    `,
                    action: 'update',
                    merge_status: 'can_be_merged'
                }
            })
            .expect(200)
    });

});
