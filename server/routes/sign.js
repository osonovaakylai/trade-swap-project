const admin = require('../config/admin');
const express = require('express');
const router = express.Router();


router.post('/', (req, res, next) => {
    admin.auth().getUser(req.body.userId)
      .then(userRecord => {
        req.session.user = true;
        req.session.adminUID = userRecord.uid;
        res.redirect('/');
      })
      .catch(error => {
        if(req.session.user){
          req.session.destroy();
          res.redirect('/');
        }
      });
});

router.post('/out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
})



module.exports = router;