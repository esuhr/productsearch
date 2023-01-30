const express = require('express');
const router = express.Router();
const Product = require('../models/product');

//home
router.get('/', (req, res) => {
    res.render('index.ejs')
})

//Post Method
router.post('/post', (req, res) => {
    res.send('Post API')
});

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
});

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
});

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
});

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
});

// default response for other requests
router.use((req, res) => {
    res.status(404);
})


module.exports = router;