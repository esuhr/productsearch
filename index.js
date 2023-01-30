require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env['DATABASE_URI']
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 3000;
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server, {});
const ejs = require('ejs');


// set view engine and routes
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index')
})

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// server start function
const Products = require('./models/product')
const Ingredients = require('./models/ingredient');
const product = require('./models/product');
let products;
let ingredients;

const start = async () => {
    try {
        // connect database
        await mongoose.connect(mongoString);
        products = await Products.find()
        ingredients = await Ingredients.find()
        console.log('Database connected')
        server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
// start server
start();

// define socket events

var socketList = {};
io.on('connection', (socket) => {
    socket.id = Math.random();
    socketList[socket.id] = socket;
    console.log(socket.id + ' connected');

    socket.emit('init', products);



    socket.on('search', (data) => {
        var product = products.find(item => item.name.toLowerCase() === data.toLowerCase());
        var condition = checkLactose(product, ingredients);
        socket.emit('searchResult', { product, condition});
    });

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected')
        delete socketList[socket.id];
    });
});

function getNames (obj) {
    var productNamesArr = [];
    for(let i in obj) {
        productNamesArr.push(obj[i]['name']);
    };
    return productNamesArr;
};

function getIngredients (obj) {
    var ingredientStringArr = [];
    for(let i in obj) {
        let ingredientString = '';
        let ingredientList = obj[i]['ingredients'];
        for(let j in ingredientList) {
            ingredientString += ingredientList[j] + ', ';
        };
        ingredientStringArr.push(ingredientString);
    }
    return ingredientStringArr;
};

function checkLactose (product, ingr) {
    var conditionName = 'lactose';
    var conditionArr = [];
    var lactose = ingr.find(elem => elem.condition === conditionName);
    for(var i = 0; i < product.ingredients.length; i++) {

        if(lactose.ingredients.includes(product.ingredients[i])) {
            conditionArr.push('x');
        } else {
            conditionArr.push('o');
        };
    };
    return conditionArr;
};