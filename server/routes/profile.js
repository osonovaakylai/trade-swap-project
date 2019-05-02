const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth.isAuthenticated, (req, res) => {
    req.session.user = req.user;
    res.render('profile', { user: true });
});

module.exports = router;