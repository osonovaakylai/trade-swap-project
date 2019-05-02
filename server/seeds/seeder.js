const db = require('../model/db');
const faker = require('faker');


faker.locale = "ru";

for(let i = 0; i < 10; i++){
    db.ref('ads').push().set({ 
        ad: faker.commerce.productAdjective(),
        date: faker.date.recent(),
        category: faker.commerce.productName()
    })
}
