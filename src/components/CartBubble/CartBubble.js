import React, { Component } from 'react';
import './CartBubble.css';
import { addToCart } from './../../ducks/reducer.js';
import { Link } from 'react-router-dom';
import ShoppingCart from './shopping-cart.svg';
import { connect } from 'react-redux';

class CartBubble extends Component {
    render() {
        return (
            <div>
                <div className="cartbubble_main">
                    <Link to="/cart"><div className="bubble">
                        <img src={ShoppingCart} alt=""></img>
                    </div>
                    </Link>
                </div>
                <div className="little_red_bubble">{this.props.itemsInCart}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { cart, itemsInCart } = state;
    return {
        cart,
        itemsInCart
    }
}
export default connect(mapStateToProps, { addToCart })(CartBubble);

