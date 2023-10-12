const express = require('express');
const app = express();
const errormiddleware = require('./middleware/errormiddleware');
const userRouter = require('./Routes/userRoute');
const postRouter = require('./Routes/postRoute');
const commentRouter = require('./Routes/commentRoute');
const chatRouter = require('./Routes/chatRoute');
const messageRouter = require('./Routes/messageRoute');
const notificationRouter = require('./Routes/notificationRoute');
const connectDB = require('./config/connectDB');
const cookieparser = require('cookie-parser');
const cloudinary = require('cloudinary');
const compression = require('compression');
const dotenv = require('dotenv');
const path = require('path')

dotenv.config({ path: path.resolve(__dirname + '/config/.env') })
connectDB();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


app.use(compression())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieparser())

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);
app.use('/notification', notificationRouter);

app.use(errormiddleware);

const port = process.env.SERVER_PORT || 5000;

const server = app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})


io.on('connection', (socket) => {
    console.log('connected to socket.io');

    socket.on('setup', (userData) => {
        socket.join(userData?._id);
        socket.emit('connected');
    })

    socket.on('join room', (room) => {
        socket.join(room);
        console.log('user joined room :' + room);
    })

    socket.on('typing', (room) => {
        socket.in(room).emit('typing')
    });

    socket.on('stop typing', (room) => {
        socket.in(room).emit('stop typing')
    });


    socket.on('new message', (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        if (!chat.users) return console.log('chat.users not defined !');
        chat.users.forEach((user) => {
            if (user._id == newMessageReceived.sender._id) return;
            socket.in(user._id).emit("message received", newMessageReceived);
        })
    })

    socket.on('new like', (likedata) => {
        socket.to(likedata.receiverId).emit('post like', likedata);
    })

    socket.on('new comment', (commentData) => {
        socket.to(commentData.receiverId).emit('post comment', commentData);
    })

    socket.on('new follow', (followData) => {
        socket.to(followData.receiverId).emit('follow user', followData);
    })

    socket.on('new save', (saveData) => {
        socket.to(saveData.receiverId).emit('save post', saveData);
    })

    socket.on('new replay', (replayData) => {
        socket.to(replayData.receiverId).emit('replay comment', replayData);
    })
    socket.on('new commentLike', (commentlikeData) => {
        socket.to(commentlikeData.receiverId).emit('like comment', commentlikeData);
    })


    socket.off('setup', () => {
        console.log("user disconnectd !");
        socket.leave(userData._id);
    })
})
