import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Shop.css';
import { getKnives, addToCart, getCurrentUser } from './../../ducks/reducer.js';


class Shop extends Component {

    componentDidMount() {
        const { getKnives, getCurrentUser } = this.props;
        getKnives()
        getCurrentUser()
    }

    loginToShop(element) {
        if (!this.props.user.id) {
            return (
                <button className="add_button" onClick={() => this.alertToLogin()}>Add To Cart</button>
            )
        } else if (this.props.user.id) {
            return (
                <button className="add_button" onClick={(e) => this.props.addToCart(element)}>Add To Cart</button>
            )
        }
    }

    alertToLogin() {
        alert("please login or create account to continue shopping")
    }


    render() {
        const knives = this.props.knives
        return (
            <div className="root_shop">
                <div className="main_shop_container">
                    <div className="knife_tiles_container">
                        <h1 className="shop_header">Shop</h1><hr /><hr />
                        {knives.map((element, i) => (
                            <div className="knife_tile" key={i}>
                                <p className="knife_tile_img">{element.id ? <img className='knife_img' src={element.img} alt="" /> : null}</p>
                                <div className="knife_description">
                                    <p className="knife_title">{element.id ? element.knife_name : null}</p>
                                    <p>{element.id ? element.description : null}</p>
                                    <p>Handle Material: {element.id ? element.handle_material : null}</p>
                                    <p>Steel: {element.id ? element.steel_type : null}</p>
                                    <p>Blade Length: {element.id ? element.blade_length : null} inches</p>
                                    <p>Overall Length: {element.id ? element.overall_length : null} inches</p>
                                    <p>Blade Width: {element.id ? element.blade_thickness : null} inches</p>
                                    <p>Price: ${element.id ? element.price : null}</p>
                                    {this.loginToShop(element)}
                                </div>

                            </div>
                        )
                        )}
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { knives, user, cart } = state;
    return {
        knives,
        user,
        cart
    }
}
export default connect(mapStateToProps, { getKnives, addToCart, getCurrentUser })(Shop)