
const Post = require('../posts/posts-model');
const User = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date()
  const method = req.method
  const url = req.url
  console.log(`${timestamp}, ${method}, ${url}`)
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params;
  User.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ 
          message: 'user not found'
        });
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field'});
  } else {
    next();
  }
}


function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text) {
    res.status(400).json({
      message: 'missing required text field'
      });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validatePost, validateUser, validateUserId }