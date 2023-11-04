    // {
    //   "id": 1,
    //   "owner": 1,
    //   "post": 1,
    //   "content": "Boring!!!",
    //   "created_at": 1576506719083
    // }
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    content: String,
}, {
    timestamps: true,
});
    module.exports = mongoose.model('Comment', commentSchema);