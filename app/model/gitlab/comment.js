module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CommentSchema = new Schema(
        {
            username: String
        }

    );

    return mongoose.model('Comment', CommentSchema);
}