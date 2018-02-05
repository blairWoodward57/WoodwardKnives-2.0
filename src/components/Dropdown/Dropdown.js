import React, { Component } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';
import Login from './../Login/Login.js';
import Logout from './../Logout/Logout.js';
import { getCurrentUser } from './../../ducks/reducer.js';
import { connect } from 'react-redux';

class Dropdown extends Component {

    componentDidMount() {
        const { getCurrentUser } = this.props;
        getCurrentUser()
        this.checkForAdmin()
    }

    checkForAdmin() {
        if (!this.props.user.id) {
            return (
                <nav className="nav_container_dropdown">
                    <div onClick={this.props.closeMenu}><Link to="/shop">SHOP</Link></div>
                    <div onClick={this.props.closeMenu}><Link to="/services">SHARPENING</Link></div>
                    <div onClick={this.props.closeMenu}><Link to="/about">ABOUT</Link></div>
                    <div onClick={this.props.closeMenu}><Link to="/contact">CONTACT</Link></div>
                    <div onClick={this.props.closeMenu}><Link to="/cart">CART</Link></div>
                    <Login />
                    <a href="https://www.facebook.com/Mark-Woodward-Custom-Knives-105385596193548/" target="_blank" rel="noopener noreferrer"><img src="https://image.flaticon.com/icons/svg/174/174848.svg" alt="" className="facebook_logo_dropdown"></img></a>
                </nav>
            )
        } else if (this.props.user) {
            if (this.props.user.isadmin === true) {
                return (
                    <nav className="admin_nav_container_dropdown">
                        <div onClick={this.props.closeMenu}><Link to="/admin">DASHBOARD</Link></div>
                        <div onClick={this.props.closeMenu}><Link to="/shop">SHOP</Link></div>
                        <div onClick={this.props.closeMenu}><Link to="/services">SHARPENING</Link></div>
                        <div onClick={this.props.closeMenu}><Link to="/about">ABOUT</Link></div>
                        <div onClick={this.props.closeMenu}><Link to="/contact">CONTACT</Link></div>
                        <div onClick={this.props.closeMenu}><Link to="/cart">CART</Link></div>
                        <Logout />
                        <a href="https://www.facebook.com/Mark-Woodward-Custom-Knives-105385596193548/" target="_blank" rel="noopener noreferrer"><img src="https://image.flaticon.com/icons/svg/174/174848.svg" alt="" className="facebook_logo_dropdown"></img></a>
                    </nav>
                )
            } else {
                return (
                    <nav className="nav_container_dropdown">
                        <div onClick={this.props.closeMenu}><Link to="/shop">SHOP</Link></div>
                        <div onClick={this.props.closeMenu}><Link to="/services">SHARPENING</Link></div>
                        <div onClick={this.props.closeMenu}><Link to="/about">ABOUT</Link></div>
                        <div onClick={this.props.closeMenu}><Link to="/contact">CONTACT</Link></div>
                        <div onClick={this.props.closeMenu}><Link to="/cart">CART</Link></div>
                        <Logout />
                        <a href="https://www.facebook.com/Mark-Woodward-Custom-Knives-105385596193548/" target="_blank" rel="noopener noreferrer"><img src="https://image.flaticon.com/icons/svg/174/174848.svg" alt="" className="facebook_logo_dropdown"></img></a>
                    </nav>
                )
            }
        }
    }

    render() {
        // console.log(this.props)
        return (
            <div className={this.props.showSlideMenu ? "main_dropdown_container slidedown" : "main_dropdown_container"}>
                <div className="slidedown_header">
                    
                    <img src={this.props.user.userimg} alt="" className="profile-image-header" />
                    <Link to='/'>
                        <div className="slidedown_logo_wrapper">
                            WOODWARD KNIVES
                        </div>
                    </Link>
                    
                    <div className="close_x" onClick={this.props.closeMenu}>X</div>
                </div>
                {this.checkForAdmin()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    }
}
export default connect(mapStateToProps, { getCurrentUser })(Dropdown)