import mongoose, { mongo, trusted } from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require: true,
        },
        location: {
            type: String,
            require: true
        },
        upvotes: {
            type: Map,
            of: Boolean
        },
        picturePath: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        comments: {
            type: Array,
            default: []
        },
        name: String,
        isSaved: Boolean,
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model("Post", postSchema);
export default Post;