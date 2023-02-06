const express = require('express')
const bodyParser = require('body-parser')
const connectDb = require('./config/connexion')
const userRoutes = require('./routes/userRoute')
const commentRoutes = require('./routes/commentRoute')
const likeCommentRoutes = require('./routes/likeCommentRoute')
const dislikeCommentRoutes = require('./routes/dislikeCommentRoute')

const app = express()
connectDb()
const port = process.env.PORT || 9000

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use('/comments', commentRoutes)  
app.use('/like', likeCommentRoutes)
app.use('/dislike', dislikeCommentRoutes)
app.use('/users', userRoutes)



app.listen(port, ()=>{
    console.log(`server running`);
})

module.exports = app;