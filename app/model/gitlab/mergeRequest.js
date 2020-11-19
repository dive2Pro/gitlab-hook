
const CommonSchema = require("../../../common.schema").mq;

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const schema = new Schema(CommonSchema);

  return mongoose.model("MergeRequest", schema);
};
