import React, { Component } from 'react';
import './Cart.css';
import { calculateCartTotal, removeFromCart } from './../../ducks/reducer.js';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';

class Cart extends Component {

    componentDidMount() {
        this.props.calculateCartTotal(this.props.cart)
    }
    

    render() {
        const {cart, cartTotal} = this.props
        console.log('this is the redux cart', cart)
        return (
            <div className="cart_main_container">
                <div className="cart_header_main_container">
                    <div className="cart_header">
                        Cart
                    </div>
                    <div className="checkout_total">
                        <p>
                            Total: ${cartTotal}
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
                    {cart.map((element, i) => (
                        <div className="cart_product_tile" key={i}>
                            <p className="knife_tile_img">{element.id ? <img className='knife_img' src={element.img} alt="" /> : null}</p>
                            <div className="knife_description">
                                <p className="knife_title">{element.id ? element.knife_name : null}</p>
                                <p>{element.id ? element.description : null}</p>
                                <p>Price: ${element.id ? element.price : null}</p>
                            </div>
                              {/* <button>Remove</button>   */}
                                 <button onClick={() => this.props.removeFromCart(element.id)}>Remove</button>       
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
export default connect(mapStateToProps, { calculateCartTotal, removeFromCart })(Cart); 

