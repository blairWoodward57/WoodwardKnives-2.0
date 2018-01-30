import React, { Component } from 'react';
import './EditKnife.css';
import { Link } from 'react-router-dom';
import { getKnifeEditPage, updateKnife, getCurrentUser } from './../../ducks/reducer.js';
import { connect } from 'react-redux';
import axios from 'axios';

class EditKnife extends Component {
    constructor(props) {
        super(props)

        this.state = {
            knifeName: '',
            description: '',
            blade_length: 0.00,
            overall_length: 0.00,
            blade_thickness: 0.00,
            price: 0.00,
            handle_material: '',
            steel_type: '',
            img: ''
        }
        this.updateKnifeName = this.updateKnifeName.bind(this);
        this.updateKnifeDescription = this.updateKnifeDescription.bind(this);
        this.updateBladeLength = this.updateBladeLength.bind(this);
        this.updateoverallLength = this.updateoverallLength.bind(this);
        this.updateBladeThickness = this.updateBladeThickness.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updateHandleMaterial = this.updateHandleMaterial.bind(this);
        this.updateSteelType = this.updateSteelType.bind(this);
        this.updateKnifeImage = this.updateKnifeImage.bind(this);
        // this.updateKnife = this.updateKnife.bind(this);
        
    }

    componentWillMount(){
        this.props.getKnifeEditPage(this.props.match.params.id)
        axios.get('/auth/me')
            .then((res) => {
                // console.log('this is the response', res)
                if (!res.data.isadmin) {
                    this.props.history.push('/');
                }
            })
        this.props.getCurrentUser()
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);

        this.setState(
            nextProps.knife
        )
    }

    updateKnifeName(value) {
        console.log(value)
        this.setState({
            knife_name: value
        })
    }

    updateKnifeDescription(value) {
        console.log(value)
        this.setState({
            description: value
        })
    }

    updateBladeLength(value) {
        console.log(value)
        this.setState({
            blade_length: value
        })
    }

    updateoverallLength(value) {
        console.log(value)
        this.setState({
            overall_length: value
        })
    }

    updateBladeThickness(value) {
        console.log(value)
        this.setState({
            blade_thickness: value
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
            handle_material: value
        })
    }

    updateSteelType(value) {
        console.log(value)
        this.setState({
            steel_type: value
        })
    }

    updateKnifeImage(value) {
        console.log(value)
        this.setState({
            img: value
        })
    }


    render() {
        const knife = this.state
        return (
            <div className="edit_root">
                <img src={knife.img} alt="" className="edit_knife_image"/>
                <div className="edit_inputs">
                    <p>Knife Name</p>
                    <input className="edit_knife_name" value={knife.knife_name} onChange={(e) => this.updateKnifeName(e.target.value)} />
                    <p className="knife_description_limit">Knife Description (limit 200 characters)</p>
                    <textarea className="edit_knife_description" value={knife.description} maxLength="220" type="text" onChange={(e) => this.updateKnifeDescription(e.target.value)}></textarea>
                    <div className="edit_knife_dimensions">
                        <div className="edit_blade_length_container">
                        <p>Blade Length</p>
                        <input className="edit_knife_blade_length" value={knife.blade_length} onChange={(e) => this.updateBladeLength(e.target.value)} />
                        </div>
                        <div className="edit_overall_length_container">
                        <p>Overall Length</p>
                        <input className="edit_knife_overall_length" value={knife.overall_length} onChange={(e) => this.updateoverallLength(e.target.value)} />
                        </div>
                        <div className="edit_blade_width_container">
                        <p>Blade Width</p>
                        <input className="edit_knife_blade_thickness" value={knife.blade_thickness} onChange={(e) => this.updateBladeThickness(e.target.value)} />
                        </div>
                    </div>
                    <p>Price</p>
                    <input className="edit_knife_price" value={knife.price} onChange={(e) => this.updatePrice(e.target.value)} />
                    <p>Handle Material</p>
                    <input className="edit_knife_handle_material" value={knife.handle_material} onChange={(e) => this.updateHandleMaterial(e.target.value)} />
                    <p>Steel Type</p>
                    <input className="edit_knife_steel_type" value={knife.steel_type} onChange={(e) => this.updateSteelType(e.target.value)} />
                    <p>Image URL</p>
                    <input className="edit_knife_image_url" value={knife.img} onChange={(e) => this.updateKnifeImage(e.target.value)} />
                </div>
                <div className="edit_page_buttons">
                 <div className="save_button_edit" onClick={() => this.props.updateKnife(this.props.match.params.id, knife.knife_name, knife.description, knife.blade_length, knife.overall_length, knife.blade_thickness, knife.price, knife.handle_material, knife.steel_type, knife.img)}><Link to="/admin">Save</Link></div> 
                 <div className="cancel_button_edit"><Link to="/admin">Cancel</Link></div> 
                 </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { knife, user } = state;
    return {
        knife,
        user
    }
}

export default connect(mapStateToProps, { getKnifeEditPage, updateKnife, getCurrentUser })(EditKnife);