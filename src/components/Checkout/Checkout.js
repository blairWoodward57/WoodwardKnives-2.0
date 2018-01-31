import React, { Component } from 'react';
import './Checkout.css';
import { calculateCartTotal, updateShippingAddress }from './../../ducks/reducer.js';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import axios from 'axios';

class Checkout extends Component {
    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            state: '',
            zip: '',
        }
        // this.calculateCartTotal = this.calculateCartTotal.bind(this)
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
        axios.post('http://localhost:3002/api/payment', { token, amount: 100 }).then(response => {
            alert('Thank you for your purchase!')
        });
    }
    0

    componentDidMount(){
        this.props.calculateCartTotal(this.props.cart)
    }

    updateFirstName(value){
        console.log(value)
        this.setState({
            firstName: value
        })
    }
    
    updateLastName(value){
        console.log(value)
        this.setState({
            lastName: value
        })
    }
    
    updateStreet(value){
        console.log(value)
        this.setState({
            street: value
        })
    }
    
    updateCity(value){
        console.log(value)
        this.setState({
            city: value
        })
    }
    
    updateState(value){
        console.log(value)
        this.setState({
            state: value
        })
    }
    
    updateZip(value){
        console.log(value)
        this.setState({
            zip: value
        })
    }


    render() {
        const user = this.state;
        return (
            <div className="checkout_main_container">
                <div className="shipping_info_container">
                    <div className="name_container">
                        <h1 className="shipping_header">Ship to:</h1>
                        <p>First Name</p>
                        <input className="shipping_firstname" onChange={(e) => this.updateFirstName(e.target.value)}/>
                        <p>Last Name</p>
                        <input className="shipping_lastname" onChange={(e) => this.updateLastName(e.target.value)}/>
                    </div>
                    {/* <h1 className="shipping_header">Shipping Info:</h1> */}
                    <div className="address_container">
                        <div className="street_address">
                            <p>Street Address</p>
                            <input className="shipping_addressOne" onChange={(e) => this.updateStreet(e.target.value)}/>
                        </div>
                        <div className="city_box">
                            <p>City</p>
                            <input className="shipping_addressTwo" onChange={(e) => this.updateCity(e.target.value)}/>
                        </div>
                        <div className="state_box">
                            <p>State</p>
                            <input className="shipping_addressThree" onChange={(e) => this.updateState(e.target.value)}/>
                        </div>
                        <div className="zip_box">
                            <p>Zip</p>
                            <input className="shipping_addressFour" onChange={(e) => this.updateZip(e.target.value)}/>
                        </div>
                    </div>

                <div className="stripe_checkout_button_container">
                    {console.log(user)}
                    
                        <div className="save_button_checkout" onClick={() => this.props.updateShippingAddress( this.props.match.params.id, user.street, user.city, user.state, user.zip )}>Save</div> 
                    <div className="stripe_button">
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
    const { cart, cartTotal, address_1, address_2, address_3, address_4 } = state;
    return {
        cart,
        cartTotal,
        address_1, 
        address_2, 
        address_3, 
        address_4
    }
}
export default connect(mapStateToProps, { calculateCartTotal, updateShippingAddress })(Checkout);