const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { Product, syncAndSeed } = require('./db');

const port = process.env.PORT || 3000;
syncAndSeed();

app.use(bodyParser.json())
app.get('/app.js', (req, res, next) => res.sendFile(path.join(__dirname, 'dist', 'main.js')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));


app.get('/api/products', (req, res, next) => {
    Product.findAll()
        .then(products => res.json(products))
        .catch(next);
})

app.post('/api/products', (req, res, next) => {
    console.log('request received')
    Product.create(req.body)
        .then(product => res.json(product))
        .catch(next);
})

app.delete('/api/products/:id', (req, res, next) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => res.sendStatus(204))
    .catch(next);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({ error });
});




app.listen(port, () => console.log(`listening on port ${port}`))
