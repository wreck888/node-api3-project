const express = require('express');

const Post = require('../posts/posts-model');
const User = require('../users/users-model');

const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  User.get()
    .then(users => {
      res.json(users)

    }).catch(next)
});

router.get('/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
  .then(newUser => {
    res.status(200).json(newUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'error adding the user'});
  });
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'error updating the user'});
  });
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
 User.remove(req.params.id)
  .then(user => {
    res.json(req.user)
  })
  .catch(error => {
    res.status(500).json({
    message: 'Error removing the user',
  });
  })
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
  .then(post => {
    res.json(post)
  })
  .catch(error => {
    res.status(500).json({
    message: 'Error getting the post',
  });
  })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  req.body.user_id = req.params.id 
  Post.insert(req.body)
  .then(newPost => {
    res.status(200).json(newPost)
  })
  .catch(error => {
    res.status(500).json({
    message: 'Error adding the post',
  });
  })
});

// do not forget to export the router
module.exports = router;