const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const Product = conn.define('products', {
    name: Sequelize.STRING,
    price: Sequelize.DECIMAL,
    salePrice: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        get() {
            if (this.getDataValue('discount')) {
                return (1 - this.getDataValue('discount') / 100) * this.getDataValue('price');
            }
        }
    },
    discount: Sequelize.INTEGER,
    availability: Sequelize.STRING
})


const syncAndSeed = () => {
    return conn.sync({force: true})
        .then( () => {
            return Promise.all([
                Product.create({ name: 'foo', price: 3, availability: 'instock' }),
                Product.create({ name: 'bar', price: 3.75, availability: 'instock'}),
                Product.create({ name: 'bazz', price: 12.15, availability: 'backordered'}),
                Product.create({ name: 'fwoop', price: 7.85, discount: 40, availability: 'discontinued'})
            ])
        })
}

module.exports = {
    Product,
    syncAndSeed
}
