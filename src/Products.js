import React from 'react';

const Products = ({ products, destroyProduct }) => {
    return (
        <ul className="list-group">
            {
                products.map( (product) => {
                    return (
                        <ul className="list-group-item" key={product.id}>
                            {
                                product.salePrice ? <li className="list-group"><strike>{product.name}</strike></li> : <li className="list-group">{product.name}</li>
                            }
                            
                            <li className="list-group">${product.price}</li>
                            
                            {
                                product.salePrice ? <li className="mb-1 badge badge-success">${product.salePrice}</li> : null
                            }
                            <div>
                                <li className= {product.availability !== 'instock' ? 'badge badge-warning' : 'badge badge-success'}>{product.availability}</li>
                            </div>
                            <div>
                                <button className="mt-1 btn btn-danger btn-sm" onClick={() => destroyProduct(product.id)}>Delete</button>
                            </div>
                            
                        </ul>
                    )
                })
            }
        </ul>
    )
}

export default Products;
