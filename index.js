const express = require('express');
const db = require('./data/db');

const server = express();

//global middleware section
server.use(express.json());

server.listen(4000, () => {
  console.log('listening on port 4000');
});

server.get('/', (req, res) => {
  res.send('hello world!');
});

server.get('/now', (req, res) => {
  res.send(`response on now path ${new Date().toISOString()}`);
});

//get info from database
server.get('/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});
//get posts by id
// server.get('/posts/:id', (req, res) => {
//   db.findById()
//     .then(posts => {
//       res.status(200).json(posts);
//     })
//     .catch(err => {
//       res.status(500).json({ success: false, err });
//     });
// });
// add to the database
server.post('/posts', (req, res) => {
  const postInfo = req.body;
  db.insert(postInfo)
    .then(post => res.status(201).json({ success: true, post }))
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

//delete posts from database
server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ success: false, message: 'id not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});
//update post by id
server.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const posts = req.body;

  db.update(id, posts)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: false, message: 'id not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});
