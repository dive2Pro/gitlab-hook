const InfoSchema = require("../../../info.schema");

module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema(InfoSchema.commit);

    return mongoose.model("Commit", schema);
};
