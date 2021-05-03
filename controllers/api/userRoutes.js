const router = require('express').Router();
const { User, Post } = require('../../models');
const auth = require('../../utils/auth').authTest;

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

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect('/').end();
    });
  } else {
    res.status(404).redirect('/').end();
  }
});

router.get('/', auth, async (req, res) => {

  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      }
    },
      {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });

    const posts = postData.map((post) => post.get({ plain: true }));

    console.log(posts);
    res.render('post', {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/newpost', async (req, res) => {
  try {
    let newPost = req.body;
    newPost.user_id = req.session.user_id;
    console.log(newPost);
    const postData = await Post.create(req.body);
    res.status(200).json(postData);

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;