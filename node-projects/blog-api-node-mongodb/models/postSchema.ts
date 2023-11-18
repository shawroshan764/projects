import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model("Post", postSchema);

// Define a function to remove posts when a user is deleted
postSchema.methods.removeUserPosts = async function () {
    try {
        await Post.deleteMany({ author: this._id });
    } catch (err) {
        throw err;
    }
};


module.exports = Post;
