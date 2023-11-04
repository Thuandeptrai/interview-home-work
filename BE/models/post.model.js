const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: String,
    content: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    commentCount: {
        type: Number,
        default: 0,
    },
    tags: [String],
}, {
    timestamps: true,
});
module.exports = mongoose.model('Post', postSchema);
