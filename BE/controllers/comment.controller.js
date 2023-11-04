const commentModel = require('../models/comment.model');
const postModel = require('../models/post.model');
const userModel = require('../models/user.model');

const createComment = async (req, res) => {
    const { content } = req.body;
    const { id } = req.user;
    const { postId } = req.params;
    try {
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // update
        post.commentCount = post.commentCount + 1;
        await post.save();
        const comment = await commentModel.create({ content, owner: id, post: postId })
        await comment.populate('owner', 'name')
        return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const getCommentByPostId = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const comments = await commentModel.find({ post: postId }).populate('owner', 'name');
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const deleteComment = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
        // find if user is owner of comment
        const comment = await commentModel.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.owner.toString() !== user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await commentModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Delete comment successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const user = req.user;
    try {
        // find if user is owner of comment
        const comment = await commentModel.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.owner.toString() !== user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await commentModel.findByIdAndUpdate(id, { content });
        return res.status(200).json({ message: 'Update comment successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    createComment,
    getCommentByPostId,
    deleteComment,
    updateComment,
};