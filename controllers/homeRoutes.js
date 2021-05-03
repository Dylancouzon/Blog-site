const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/auth').authTest;

router.get('/', async (req, res) => {
  
  let authResult = req.url.substring(2);
  let redirect = false;
  if(authResult == "err=1"){
    redirect = true;
  }
  
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));


    res.render('homepage', {
      posts,
      redirect,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/comment/:id', auth, async (req, res) => {
  try {

    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    const commentData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));
    const commentCount = comments.length;
    res.render('comment', {
      post,
      comments,
      commentCount,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
