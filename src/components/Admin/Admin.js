import React, { Component } from 'react';
import './Admin.css';
import { addKnifeToShop, getCurrentUser, getKnives, deleteKnife, createCartAndOrder, getOrders } from './../../ducks/reducer.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            knifeName: '',
            knifeDescription: '',
            bladeLength: 0,
            overallLength: 0,
            bladeThickness: 0.00,
            price: 0.00,
            handleMaterial: '',
            steelType: '',
            img: ''
        }
        this.createKnife = this.createKnife.bind(this);
        this.updateKnifeName = this.updateKnifeName.bind(this);
        this.updateKnifeDescription = this.updateKnifeDescription.bind(this);
        this.updateBladeLength = this.updateBladeLength.bind(this);
        this.updateOverallLength = this.updateOverallLength.bind(this);
        this.updateBladeThickness = this.updateBladeThickness.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updateHandleMaterial = this.updateHandleMaterial.bind(this);
        this.updateSteelType = this.updateSteelType.bind(this);
        this.updateKnifeImage = this.updateKnifeImage.bind(this);
        this.displayOpenOrders = this.displayOpenOrders.bind(this);
        this.closeOrder = this.closeOrder.bind(this);
    }

    componentWillMount() {
        const { getCurrentUser } = this.props
        axios.get('/auth/me')
            .then((res) => {
                if (!res.data.isadmin) {
                    this.props.history.push('/');
                }
            })
        getCurrentUser()
    }

    componentDidMount() {
        const { getOrders, getKnives } = this.props
        getKnives()
        getOrders()
    }

    updateKnifeName(value) {
        console.log(value)
        this.setState({
            knifeName: value
        })
    }

    updateKnifeDescription(value) {
        console.log(value)
        this.setState({
            knifeDescription: value
        })
    }

    updateBladeLength(value) {
        console.log(value)
        this.setState({
            bladeLength: value
        })
    }

    updateOverallLength(value) {
        console.log(value)
        this.setState({
            overallLength: value
        })
    }

    updateBladeThickness(value) {
        console.log(value)
        this.setState({
            bladeThickness: value
        })
    }

    updatePrice(value) {
        console.log(value)
        this.setState({
            price: value
        })
    }

    updateHandleMaterial(value) {
        console.log(value)
        this.setState({
            handleMaterial: value
        })
    }

    updateSteelType(value) {
        console.log(value)
        this.setState({
            steelType: value
        })
    }

    updateKnifeImage(value) {
        console.log(value)
        this.setState({
            img: value
        })
    }

    createKnife() {
        const reqBody = {
            knife_name: this.state.knifeName,
            description: this.state.knifeDescription,
            blade_length: this.state.bladeLength,
            overall_length: this.state.overallLength,
            blade_thickness: this.state.bladeThickness,
            price: this.state.price,
            handle_material: this.state.handleMaterial,
            steel_type: this.state.steelType,
            img: this.state.img
        }
        this.props.addKnifeToShop(reqBody);
    }

    closeOrder(orderid) {
        console.log(orderid)
        axios.put('/api/closeorder/' + orderid)
            .then(res => {
                console.log('this is inside the close order function in reducer', res.data)
                return res.data
            })
        this.props.getOrders()
    }

    displayOpenOrders() {
        const orders = this.props.allOrders
        return (
            orders.filter(e => e.open).map((element, i) => (
                <div className="order_tile" key={i}>
                    <img src={element.img} alt="" className="order_tile_image" />
                    <div className="order_info">
                        <p>Ship To:</p>
                        <p>User: {element.firstname + ' '}{element.lastname}</p>
                        <p>Knife Ordered: {element.knife_name}</p>
                        <p>Address: {element.address_1}</p>
                        <p>{element.address_2 + ',' + ' '}{element.address_3 + ' '}{element.address_4}</p>
                        <div className="shipped_button_container">
                            <button className="shipped_button_admin" onClick={() => this.closeOrder(element.id)}>Shipped</button>
                        </div>
                    </div>
                </div>
            )
            )
        )
    }

    render() {
        const knives = this.props.knives
        const orders = this.props.allOrders

        return (
            <div className="admin_main_container">
                <div className="admin_left_column">
                    <div className="admin_loggedin_container">
                        <h2>Administrator</h2>
                        <div className="admin_info_container">

                            <img src={this.props.user.userimg} className="admin_profile_img" alt=""></img>
                            <div className="admin_info">
                                <div className="admin_info_name">{this.props.user.firstname + ' '}{this.props.user.lastname}</div>
                            </div>
                        </div>
                    </div>
                    <div className="knife_updater">
                        <div className="shopkeeper">Shop Keeper</div>
                        <div className="admin_knife_tiles_container">
                            {knives.map((element, i) => (
                                <div className="admin_knife_tile" key={i}>
                                    <p className="admin_knife_tile_img">{element.id ? <img className='admin_knife_img' src={element.img} alt="" /> : null}</p>
                                    <p className="admin_knife_title">{element.id ? element.knife_name : null}</p>
                                    <p>${element.id ? element.price : null}</p>
                                    <div className="shopkeeper_buttons">
                                        <div className="edit_button"><Link to={"/editknife/" + element.id}>edit</Link></div>
                                        <button className="delete_button" onClick={() => this.props.deleteKnife(element.id)}>delete</button>
                                    </div>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                </div>
                <div className="orders_root">
                    <h1>Orders</h1>
                    <div className="orders_container">
                        {this.displayOpenOrders()}
                    </div>
                </div>
                <div className="add_product_container">
                    <h1 className="add_product_header">Add Product To Shop</h1>
                    <div className="add_product_inputs">
                        <div className="name_description">
                            <p>Knife Name</p>
                            <input onChange={(e) => this.updateKnifeName(e.target.value)} className="add_product_name" />
                            <p>Knife Description (limit 200 characters)</p>
                            <textarea className="add_product_description" maxLength="220" type="text" onChange={(e) => this.updateKnifeDescription(e.target.value)}></textarea>
                        </div>
                        <div className="knife_dimentions">
                            <div className="blade_length">
                                <p>Blade Length</p>
                                <input onChange={(e) => this.updateBladeLength(e.target.value)} className="add_product_blade_length" />
                            </div>
                            <div className="overall_length">
                                <p>Overall Length</p>
                                <input onChange={(e) => this.updateOverallLength(e.target.value)} className="add_product_overall_length" />
                            </div>
                            <div className="blade_thickness">
                                <p>Blade Thickness</p>
                                <input onChange={(e) => this.updateBladeThickness(e.target.value)} className="add_product_blade_thickness" />
                            </div>
                        </div>
                        <div className="price_handle">
                            <div className="price">
                                <p>Price</p>
                                <input onChange={(e) => this.updatePrice(e.target.value)} className="add_product_price" />
                            </div>
                            <div className="handle_material">
                                <p>Handle Material</p>
                                <input onChange={(e) => this.updateHandleMaterial(e.target.value)} className="add_product_handle_material" />
                            </div>
                        </div>
                        <div className="steel_image">
                            <p>Steel Type</p>
                            <input onChange={(e) => this.updateSteelType(e.target.value)} className="add_product_steel_type" />
                            <p>Image URL</p>
                            <input onChange={(e) => this.updateKnifeImage(e.target.value)} className="add_product_img" />
                        </div>
                    </div>
                    <button onClick={this.createKnife} className="add_product_button">Add Product</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user, knives, knife, userOrder, allOrders } = state;
    return {
        user,
        knives,
        knife,
        userOrder,
        allOrders
    }
}
export default connect(mapStateToProps, { addKnifeToShop, getCurrentUser, getKnives, deleteKnife, createCartAndOrder, getOrders })(Admin);