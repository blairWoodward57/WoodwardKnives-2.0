import React, { Component } from 'react';
import './CartBubble.css';
import { Link } from 'react-router-dom';
import ShoppingCart from './shopping-cart.svg';

class CartBubble extends Component {
    render() {
        return (
            <div className="cartbubble_main">
                <Link to="/cart"><div className="bubble">
                  <img src={ShoppingCart} alt=""></img>
                </div>
                </Link>
            </div>
        )
    }
}

export default CartBubble;