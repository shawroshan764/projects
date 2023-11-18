const express = require("express");
const router = express.Router();
const { signup, login, getAllUsers, logout, deleteUser, googleLoginCallback } = require("../controller/userAuthentication");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const { createNewPost, updatePost, getAllPosts, deletePost } = require("../controller/blogPost");
const { postFeeds, viewSingleFeed } = require("../controller/postFeeds");


// Authentication & Authorization Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", [verifyToken], [verifyAdmin], getAllUsers);
router.post("/logout", logout);
router.delete("/deleteUser/:id", [verifyToken], [verifyAdmin], deleteUser);


// User's Post
router.post("/createNewPost", [verifyToken], createNewPost);
router.post("/updatePost/:id", [verifyToken], updatePost);
router.get("/getAllPosts", [verifyToken], getAllPosts);
router.delete("/deletePost/:id", [verifyToken], deletePost);


// Post feeds
router.get("/feeds", postFeeds);
router.get("/viewPost/:id", viewSingleFeed)



module.exports = router;