const express = require('express');
const db = require('../data/db');
const router = express.Router();

//get info from database
//google.com/search?query string follows question mark
router.get('/', (req, res) => {
  console.log(req.query);
  db.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});
//get posts by id
router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

//delete posts from database
router.delete('/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
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

//get post commnets by id
router.get('/:id/comments', (req, res) => {
  db.findPostComments(req.params.id)
    .then(comments => {
      if (comments.length > 0) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ messages: 'No Comments For That Post' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'error', err });
    });
});

// add to the database
router.post('/', (req, res) => {
  db.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error adding the post'
      });
    });
});
//needs correct ID
router.post('/:id/comments', (req, res) => {
  const commentInfo = { ...req.body, post_id: req.params.id };
  db.insertComment(commentInfo)
    .then(comment => {
      res.status(201).json(comment);
    })
    .catch(err => res.status(500).json(err));
});

//posts router is not defined error
module.exports = router;
