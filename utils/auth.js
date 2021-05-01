module.exports = {
    ​
      auth: (req, res, cb) => {
    ​
        if (!req.session.logged_in) {
          res.redirect('/login');
        } else {
          cb();
        }
      }
    ​
    };