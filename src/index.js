import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Create from './Create'
import Nav from './Nav'
import Products from './Products'

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            sales: []
        }
        this.destroyProduct = this.destroyProduct.bind(this)
        this.onSave = this.onSave.bind(this)
    }
    componentDidMount() {
        this.loadProducts()
    }
    loadProducts() {
        axios.get('/api/products')
            .then(response => response.data)
            .then(products => {
                let sales = products.filter(saleProduct => saleProduct.discount !== null)
                this.setState({ products, sales })
            })
            .catch(er => console.log(er));
    }
    destroyProduct(id) {
        axios.delete(`/api/products/${id}`)
            .then( () => this.loadProducts())
            .catch(er => console.log(er));
    }
    onSave(product) {
        return axios.post('/api/products', product)
            .then(() => this.loadProducts())
            .catch(er => console.log(er))
    }
    render() {
        const { products, sales } = this.state;
        const { loadProducts, destroyProduct, onSave } = this;
        const counts = {
            '/products': products.length,
            '/products/sales': sales.length
        }
        return (
            <Router>
                <div>
                <h1>Acme Products/Sales <i>by Dan</i></h1>
                    <Route render={({ location }) => <Nav location={location} counts={counts} /> } />
                    <Route exact path="/" render={() => <h2>Welcome!!</h2>} />
                    <Route exact path="/products" render={() => <Products products={products} destroyProduct={destroyProduct} /> } />
                    <Route exact path="/products/sales" render={() => <Products products={sales} destroyProduct={destroyProduct} /> } />
                    <Route exact path="/products/create" render={({ history }) => <Create history={history} onSave={onSave} /> } />
                </div>
            </Router>
        )
    }
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
