import React, { Component } from 'react';
import './Checkout.css';
import { calculateCartTotal, updateShippingAddress, getCurrentUser, createCartAndOrder, clearCart } from './../../ducks/reducer.js';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import axios from 'axios';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            state: '',
            zip: '',
        }
        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.updateStreet = this.updateStreet.bind(this);
        this.updateCity = this.updateCity.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateZip = this.updateZip.bind(this);

    }


    onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/payment`, { token, amount: 100 }).then(response => {
            this.props.createCartAndOrder(this.props.cart)
            this.props.clearCart()
            alert("Thank you for your purchase! Your order is on it's way! Please allow up to 10 business days for your order to arrive.")
        });
    }
    0

    componentWillMount() {
        if (this.props.cart.length === 0) {
            this.props.history.push('/shop');
        }
    }

    componentDidMount() {
        this.props.calculateCartTotal(this.props.cart)
    }

    updateFirstName(value) {
        console.log(value)
        this.setState({
            firstName: value
        })
    }

    updateLastName(value) {
        console.log(value)
        this.setState({
            lastName: value
        })
    }

    updateStreet(value) {
        console.log(value)
        this.setState({
            street: value
        })
    }

    updateCity(value) {
        console.log(value)
        this.setState({
            city: value
        })
    }

    updateState(value) {
        console.log(value)
        this.setState({
            state: value
        })
    }

    updateZip(value) {
        console.log(value)
        this.setState({
            zip: value
        })
    }


    render() {
        console.log(this.props.user)
        return (
            <div className="checkout_main_container">
                <div className="shipping_info_container">
                    <div className="name_container">
                        <h1 className="shipping_header">Ship to:</h1>
                        <p>First Name</p>
                        <input className="shipping_firstname" defaultValue={this.props.user.firstname} onChange={(e) => this.updateFirstName(e.target.value)} />
                        <p>Last Name</p>
                        <input className="shipping_lastname" defaultValue={this.props.user.lastname} onChange={(e) => this.updateLastName(e.target.value)} />
                    </div>
                    <div className="address_container">
                        <div className="street_address">
                            <p>Street Address</p>
                            <input className="shipping_addressOne" defaultValue={this.props.user.address_1} onChange={(e) => this.updateStreet(e.target.value)} />
                        </div>
                        <div className="city_box">
                            <p>City</p>
                            <input className="shipping_addressTwo" defaultValue={this.props.user.address_2} onChange={(e) => this.updateCity(e.target.value)} />
                        </div>
                        <div className="state_box">
                            <p>State</p>
                            <input className="shipping_addressThree" defaultValue={this.props.user.address_3} onChange={(e) => this.updateState(e.target.value)} />
                        </div>
                        <div className="zip_box">
                            <p>Zip</p>
                            <input className="shipping_addressFour" defaultValue={this.props.user.address_4} onChange={(e) => this.updateZip(e.target.value)} />
                        </div>
                    </div>

                    <div className="stripe_checkout_button_container">
                        {console.log(this.state)}

                        <div className="stripe_button" onClick={() => this.props.updateShippingAddress(this.props.match.params.id, this.state.street, this.state.city, this.state.state, this.state.zip)}>
                            <StripeCheckout
                                token={this.onToken}
                                stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
                                amount={Number(this.props.cartTotal) * 100}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { cart, cartTotal, address_1, address_2, address_3, address_4, user, userOrder } = state;
    return {
        cart,
        cartTotal,
        address_1,
        address_2,
        address_3,
        address_4,
        user,
        userOrder
    }
}
export default connect(mapStateToProps, { calculateCartTotal, updateShippingAddress, getCurrentUser, createCartAndOrder, clearCart })(Checkout);