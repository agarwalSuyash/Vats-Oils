import React from 'react';
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import logo from "../../images/logo.png";
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import UserOptions from './userOptions';


const Navbar = () => {

    const { cartItems } = useSelector((state) => state.cart);

    return (

        <section className="header">
            <a href="/"><img src={logo} className="logo" alt="logo" /></a>

            <div>
                <ul id="navbar">
                    <li><NavLink to="/" >Home</NavLink></li>
                    <li><NavLink to="/products" >Shop</NavLink></li>
                    <li><NavLink to="/blog" >blog</NavLink></li>
                    <li><NavLink to="/about" >About</NavLink></li>
                    <li><NavLink to="/contact" >Contact</NavLink></li>
                    <li>
                        <NavLink to="/cart" >
                            {cartItems.length > 0 ? <Badge badgeContent={cartItems.length} color="primary" overlap="rectangular">
                                <ShoppingCartOutlined />
                            </Badge> : <ShoppingCartOutlined />}
                        </NavLink>
                    </li>
                    <li>
                        <UserOptions />
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Navbar
