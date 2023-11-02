const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRouter = require('./routes/user.route');
const commentRouter = require('./routes/comment.route');
const postRouter = require('./routes/post.route');
require('dotenv').config();
const port = 3000;
const mongoDB = 'mongodb://mongo:27017/my_database';
// config env
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));

const basicPath = '/api/v1';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${basicPath}/users`, userRouter);
app.use(`${basicPath}/comments`, commentRouter)
app.use(`${basicPath}/posts`, postRouter);


app.get('/', (req, res) => {
    res.send('Hello adawdadads!');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);