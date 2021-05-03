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

router.get('/delete/:id', auth, async (req, res) => {
  try {

    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletePost) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }
    res.status(200).redirect('/').json(postData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
