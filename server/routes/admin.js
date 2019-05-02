const express = require('express');
const router = express.Router();

const db = require('../model/db');
const ref = db.ref("users");
const auth = require('../middlewares/auth');


router.get('/', auth.isAdmin, (req, res, next) =>{
    db.ref('/users/categories').once('value').then(function (snapshot) {
        let cat = snapshot.val();
        let category=[];
        console.log(cat);
        Object.keys(cat).map(function (objectKey, index) {
            category.push({
                id: objectKey,
                value: cat[objectKey]
            })
        });
        res.render('admin', { title: 'admin', category: category});
    });
});

router.delete('/:name', (req,res,next)=>{
    
    // category.splice(ind('Красота'), 1)
    console.log(req.params.name);
    res.sendStatus(200);
});

router.post('/',(req,res,next)=>{
    console.log("post colled")
    var usersRef = ref.child("categories");
    usersRef.push({        
        name: "Спорт",
        style: 'zmdi zmdi-run zmdi-hc-2x'     
    });
    res.redirect('/admin')
});

router.put('/:name', (req,res,next)=>{
    var usersRef = ref.child("categories/" + req.params.name);
    usersRef.update({
        "name": "новое имя"
    });
    console.log(req.params.name);
    res.sendStatus(200);
});

module.exports = router;
