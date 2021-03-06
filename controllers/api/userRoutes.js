const path = require('path');
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const auth = require('../../utils/auth').authTest;

// Login Route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Username not found!' });
      return;
    }

    const validPassword = await userData.checkPass(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json({ user: userData });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//Sign Up route
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect('/').end();
    });
  } else {
    res.status(404).redirect('/').end();
  }
});

// Dashboard route


// Create a post route
router.post('/newpost', async (req, res) => {
  try {
    let newPost = req.body;
    newPost.user_id = req.session.user_id;
    const postData = await Post.create(newPost);
    res.status(200).json(postData);

  } catch (err) {
    res.status(400).json(err);
  }
});

// Add a comment route
router.post('/newcomment', async (req, res) => {
  try {
    let newComment = req.body;
    newComment.user_id = req.session.user_id;
    const commentData = await Comment.create(newComment);
    res.status(200).json(commentData);

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;