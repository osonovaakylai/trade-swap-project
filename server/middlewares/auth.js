const admin = require('../config/admin');

module.exports = {
    isAuthenticated: (req, res, next) => {
        let user = admin.auth().currentUser;
        if (user !== null) {
            req.user = user;
            next();
        } else {
            res.redirect('/');
        }
    },
    isAdmin: (req, res, next) => {
        if(req.session.adminUID !== undefined){
            if(req.session.adminUID === 'SjvJKHuegnZbzTMg2vOwTDEwwyl1' || req.session.adminUID === 'HzqQ491fa4ceqEKEUgaxRgqeOof2'){
                next();
            }
            else {
                res.redirect('/');
            }
        } else {
            res.redirect('/')
        }
    }
}