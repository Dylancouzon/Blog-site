const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/auth').authTest;

router.get('/', async (req, res) => {

  let authResult = req.url.substring(2);
  let redirect = false;
  if (authResult == "err=1") {
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
    console.log(posts);
    console.log(posts);
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

    const commentData = await Comment.findAll(
      {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      },
      {
      where: {
        post_id: post.id
      }
    }
    );

    const comments = commentData.map((comment) => comment.get({ plain: true }));
    const commentCount = comments.length;
    console.log(comments);
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
