const express = require('express');
const router = express.Router();
const db = require('../model/db');


/* GET home page. */
router.get('/', (req, res, next) => {
    let user = req.session.user === undefined ? false : true;
    db.ref('ads').once('value', snapshot => {
        let data = snapshot.val();
        let ads = [];
        Object.keys(data).map(function (key, index) {
            ads.push({
                id: key,
                value: data[key]
            })

        });
        db.ref('/users/categories').once('value').then(function (snapshot) {
            let cat = snapshot.val();
            let category = [];
            Object.keys(cat).map(function (objectKey, index) {
                category.push({
                    id: objectKey,
                    value: cat[objectKey]
                })
            });
            let newAds = ads.map(item => {
                return {
                    id: item.id,
                    value: {
                        ...item.value,
                        timestamp: new Date(item.value.timestamp).toLocaleDateString()
                    }
                }
            });
            res.render('index', {user, ads: newAds, category, cat});
        });
    })
});

router.post('/ad', (req, res, next) => {
    let cat;
    // db.ref('/users/categories/'+req.body.category).once('value').then(function (snapshot) {
    //   cat = snapshot.val();
    //   console.log(cat);

    // });
    const adsRef = db.ref().child("ads");
    adsRef.push({
        ad: req.body.ad_name,
        category: req.body.category,
        ad_body: req.body.ad_body,
        imageURL: 'https://firebasestorage.googleapis.com/v0/b/tradekg-2621a.appspot.com/o/images%2Fotziv1.png?alt=media&token=64f36794-a873-4441-9b7f-c07c0bff8568',
        timestamp: Date.now()
    });
})

router.get('/about', (req, res, next) => {
    let user = req.session.user === undefined ? false : true;
    res.render('aboutus', {user});
});

module.exports = router;
