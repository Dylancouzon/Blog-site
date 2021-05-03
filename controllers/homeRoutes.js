const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/auth').authTest;

//Index route
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

// View a Post and its comments route
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
        where: {
          post_id: post.id
        },
        include: [{
          model: User,
          attributes: ['username'],

        }],
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

//Delete a post route
router.get('/delete/:id', auth, async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        post_id: req.params.id,
      },
    });
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).redirect('/api/user').json(deleteComment + deletePost);

  } catch (err) {
    res.status(500).json(err);
  }
});

//Edit a post route
router.put('/edit', auth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(postData);

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
