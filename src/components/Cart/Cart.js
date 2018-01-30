import React, { Component } from 'react';
import './Cart.css';
import { calculateCartTotal } from './../../ducks/reducer.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cartTotal: 0.00,
        }
        // this.removeFromCart = this.removeFromCart.bind(this);
    }

    componentDidMount() {
        this.props.calculateCartTotal(this.props.cart)
    }

    // removeFromCart(id, currentCart) {
    //     for (let i = 0; i < currentCart.length; i++) {
    //         if (currentCart[i].id === id) {
    //             currentCart.splice(i, 1)
    //         }
    //     }
    //     return currentCart;
    // }

    

    render() {
        const newCart = this.props.cart
        console.log('this is the redux cart', newCart)
        return (
            <div className="cart_main_container">
                <div className="cart_header_main_container">
                    <div className="cart_header">
                        Cart
                    </div>
                    <div className="checkout_total">
                        <p>
                            Total: ${this.props.cartTotal}
                        </p>
                    </div>
                    <div className="checkout_button_1">
                        <Link to="/checkout"><button>Checkout</button></Link>
                    </div>
                </div>
                <div className="checkout_button_2">
                        <Link to="/checkout"><button>Checkout</button></Link>
                    </div>
                <hr /><hr />
                <div className="cart_tile_container">
                    {this.props.cart.map((element, i) => (
                        <div className="cart_product_tile" key={i}>
                            <p className="knife_tile_img">{element.id ? <img className='knife_img' src={element.img} alt="" /> : null}</p>
                            {/* </Link> */}
                            <div className="knife_description">
                                <p className="knife_title">{element.id ? element.knife_name : null}</p>
                                <p>{element.id ? element.description : null}</p>
                                <p>Price: ${element.id ? element.price : null}</p>
                            </div>
                             <button>Remove</button> 
                               {/* <button onClick={this.props.removeFromCart(newCart)}>Remove</button>      */}
                        </div>
                    )
                    )}
                </div>


            </div>

        )
    }
}

function mapStateToProps(state) {
    const { cart, cartTotal } = state;
    return {
        cart,
        cartTotal
    }
}
export default connect(mapStateToProps, { calculateCartTotal })(Cart);

