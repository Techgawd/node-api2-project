const express = require('express');
const postsRouter = require("./api/posts/posts-router");

const server = express();


server.use(express.json())
server.use(postsRouter)


server.get('/', (req, res) => {

    res.send('Hello World');
});

server.listen(8000, () => console.log('API running on port 8000'));
