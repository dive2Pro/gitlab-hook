const CommonSchema = require("../../../common.schema").common;

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new Schema(CommonSchema);

  return mongoose.model("Comment", CommentSchema);
};
