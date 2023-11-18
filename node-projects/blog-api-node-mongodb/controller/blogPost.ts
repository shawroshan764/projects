import { Request, Response } from "express";
const Post = require("../models/postSchema");
const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');
const { validatePost } = require("../validation");


const createNewPost = async (req: Request, res: Response) => {
    const { postTitle, content } = req.body;
    const { error } = validatePost(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const userId = loggedInUser(String(req.headers.authorization));
    try {
        const newPost = new Post({
            postTitle,
            content,
            author: userId,
        });

        await newPost.save();
        // Update the user's posts array with the new post's ID
        await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } })
        res.status(201).json({
            message: 'Blog post created successfully.', newPost
        });
    } catch (error) {
        console.error("Error creating blog post:", error);
        res.status(500).json({ error: "Blog post creation failed." });
    }
}

const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { postTitle, content } = req.body;
    const userId = loggedInUser(String(req.headers.authorization));

    try {
        // Find the post by postId
        const existingPost = await Post.findById(id);

        if (!existingPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if the authorId of the post matches the current user's ID
        if (existingPost.author.toString() !== userId) {
            return res.status(403).json({ error: "You do not have permission to update this post" });
        }

        // Update the post with new data
        existingPost.postTitle = postTitle;
        existingPost.content = content;

        await existingPost.save();

        res.status(200).json({
            message: 'Blog post updated successfully.',
            updatedPost: existingPost
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Error." });
    }
};

const getAllPosts = async (req: Request, res: Response) => {
    try {
        // Get the user's ID from the token or wherever you store it
        const userId = loggedInUser(String(req.headers.authorization));

        // Find all posts that belong to the current user
        const posts = await Post.find({ author: userId });

        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deletePost = async (req: Request, res: Response) => {
    try {
        // Get the user's ID from the token or wherever you store it
        const userId = loggedInUser(String(req.headers.authorization));

        // Find the post by postId and author (to ensure the user owns the post)
        const { id } = req.params;
        const post = await Post.findOne({ _id: id, author: userId });

        if (!post) {
            return res.status(404).json({ message: 'Post not found or you do not have permission to delete it.' });
        }

        // Delete the post
        await Post.deleteOne({ _id: id });

        // Remove the reference to the deleted post from the user's post array
        await User.findByIdAndUpdate(userId, { $pull: { posts: id } });

        return res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const loggedInUser = (authorization: string) => {
    let token, decode;
    if (authorization) {
        token = authorization.split(" ");
        decode = jwt.verify(token[1], process.env.JWT_SECRET_KEY);
    }
    return decode._id;
};


module.exports = {
    createNewPost,
    updatePost,
    getAllPosts,
    deletePost
};