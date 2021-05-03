// Test if the user is authentificated
module.exports = {
    authTest: (req, res, cb) => {

        if (!req.session.logged_in) {
            res.redirect('/?err=1');
            return
        } else {
            cb();
        }
    }
};