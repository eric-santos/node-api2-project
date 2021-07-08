const express = require('express');
const postsRouter = require('./posts/postsRouter');

const server = express();

//global middleware section
server.use(express.json());
server.use('/posts', postsRouter);

server.get('/', (req, res) => {
  res.send('hello world!');
});

// server.get('/now', (req, res) => {
//   res.send(`response on now path ${new Date().toISOString()}`);
// });

module.exports = server;
