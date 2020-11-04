
const InfoSchema = require("../../../info.schema");

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MergeRequestSchema = new Schema(InfoSchema.merge_request);

  return mongoose.model("Merge", MergeRequestSchema);
};