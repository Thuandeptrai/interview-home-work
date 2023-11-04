const postModel = require('../models/post.model');
const commentModel = require('../models/comment.model');
const userModel = require('../models/user.model');
const convertStringToRegexp = require('../utils/convertStringToRegexp');

const createPost = async (req, res) => {
    const { title, content, tags } = req.body;
    const { id } = req.user;
    try {
        const post = await postModel.create({ title, content,tags, owner: id });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const findPostByKeyWord = async (req, res) => {
    const { keyword, pageSize, pageIndex } = req.query;
    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(pageIndex) - 1) * limit || 0;
    try {
        const count = await postModel.countDocuments({ title: convertStringToRegexp(keyword) });
        const posts = await postModel.find({ title: convertStringToRegexp(keyword) }).populate('owner', 'name').limit(limit).skip(skip);
        res.status(200).json({ count, posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deletePost = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
        // find if user is owner of post
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.owner.toString() !== user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await postModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Delete post successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getPostPaging = async (req, res) => {
    const { pageSize, pageIndex } = req.query;
    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(pageIndex) - 1) * limit || 0;
    try {
        const count = await postModel.countDocuments();
        // populate owner and remove password
        const posts = await postModel.find().populate('owner', 'name').limit(limit).skip(skip);
        res.status(200).json({ count, posts });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createPost,
    findPostByKeyWord,
    deletePost,
    getPostPaging,
};