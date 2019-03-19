import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location, counts }) => {
    const links = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'Products',
            path: '/products'
        },
        {
            title: 'Sales',
            path: '/products/sales'
        },
        {
            title: 'Create',
            path: '/products/create'
        }
    ]
    return (
        <ul className="nav nav-tabs">
            {
                links.map( (link) => {
                    return (
                        <li className="nav-item" key={link.path}>
                            <Link to={link.path} className={`nav-link ${link.path === location.pathname ? 'active' : '' }`}>
                                {link.title}   <span className="badge badge-primary">{counts[`${link.path}`]}</span>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Nav;
