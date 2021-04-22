const express = require('express');
const ProductItem = require('./models/productItem')
const mongoose = require('mongoose');
const DbUri = "mongodb+srv://supercode:supercode@cluster0.yo1kf.mongodb.net/eshop?retryWrites=true&w=majority"
const app = express()
// console.log(data);

mongoose.connect(DbUri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Database connected')
})
app.listen(7000, () => {
    console.log('listening at http:localhost:7000');
})
app.use(express.static('public'))
app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())
app.get('/', (req, res) => {
    ProductItem.find()
        .then(result => {
            console.log(result)
            res.render('pages/index', { result })
        })
        .catch(err => console.log(err))
})
app.get('/addNew', (req, res) => {
    res.render('pages/newProduct')
})
app.post('/new', (req, res) => {
    console.log(req.body)
    console.log(typeof req.body.rating)
    const newProductItem = new ProductItem({
        ProductLink: req.body.Link,
        Price: req.body.Price,
        Company: req.body.Company,
        LinkShop: req.body.url,
        ProductName: req.body.name,
    })
    newProductItem.save()
        .then(result => res.redirect('/'))
        .catch(err => console.log(err))

})
app.get('/product/:id', (req, res) => {
    ProductItem.findById(req.params.id)
        .then(result => {
            console.log(result)
            res.render('pages/showProduct', { result })
        })
        .catch(err => console.log(err))
})

app.get('/update/:id', (req, res) => {
    ProductItem.findById(req.params.id)
        .then(result => {
            console.log(result)
            res.render('pages/updateProduct', { result })
        })
        .catch(err => console.log(err))
})

app.post('/update', (req, res) => {
    ProductItem.findByIdAndUpdate(req.body.id, {
        ProductLink: req.body.Link,
        Price: req.body.Price,
        Company: req.body.Company,
        LinkShop: req.body.url,
        ProductName: req.body.name,
    })
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

app.get('/delete/:id', (req, res) => {

    ProductItem.findByIdAndDelete(req.params.id)
        .then(result => {
            res.redirect('/')
        }).catch(err => console.log(err))
})
