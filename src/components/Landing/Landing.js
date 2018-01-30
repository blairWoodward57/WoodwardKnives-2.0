import React, { Component } from 'react';
import { getKnives } from './../../ducks/reducer.js';
import './Landing.css';
import { connect } from 'react-redux';
// import Dropdown from './../Dropdown/Dropdown.js';


class Landing extends Component {
    
    componentWillMount(){
        const { getKnives } = this.props
        getKnives()
        // console.log(this.props.knives)
    }
    
    render() {
       const randomKnife = this.props.knives[Math.floor(Math.random() * this.props.knives.length)]
       console.log('this is random knife', randomKnife)
        return (
            <div className="main_landing_container">
                
                <h1 className="featured_knife_heading">Featured Knife</h1>
                     
                <div className="featured_knife_container">
                    <div className="featured_knife_img_container">
                        {console.log('this is random knife', randomKnife)}
                       {randomKnife && <img src={randomKnife.img} className="featured_knife" alt=""></img>}
                    </div>
                    <div className="featured_knife_desc_container">
                        <div className="featured_knife_name">
                        <div className="knifeName">Name</div> 
                        {randomKnife && <p>{randomKnife.knife_name}</p>}
                        </div>
                        <div className="featured_knife_handle">
                        <div className="handleMaterial">Handle</div>
                        {randomKnife && <p>{randomKnife.handle_material}</p>}
                        </div>
                        <div className="featured_knife_steel">
                        <div className="steelType">Steel</div>
                        {randomKnife && <p>{randomKnife.steel_type}</p>}
                        </div>
                        <div className="featured_knife_price">
                        <div className="knifePrice">Price</div> 
                        {randomKnife && <p>${randomKnife.price}</p>}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { knives } = state;
    return {
        knives
    }
}
export default connect(mapStateToProps, { getKnives })(Landing)