import { Request, Response } from "express";
const Post = require("../models/postSchema");


const postFeeds = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find({},)
            .populate({
                path: 'author',
                select: 'name',
            })
            .select('createdAt postTitle content');
        return res.status(201).json(posts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });


    }
}

const viewSingleFeed = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found." });

        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    postFeeds,
    viewSingleFeed
};