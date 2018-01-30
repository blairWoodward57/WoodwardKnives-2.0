import React, { Component } from 'react';
import './Header.css';
import Login from './../Login/Login.js';
import Logout from './../Logout/Logout.js';
// import Dropdown from './../Dropdown/Dropdown.js';
import { Link } from 'react-router-dom';
import { getCurrentUser } from './../../ducks/reducer.js';
import { connect } from 'react-redux';


class Header extends Component {

    componentDidMount() {
        const { getCurrentUser } = this.props;
        getCurrentUser()
        this.checkForAdmin()
    }

    checkForAdmin() {
        if (!this.props.user.id) {
            return (
                <nav className="nav_container">
                    <p><Link to="/shop">SHOP</Link></p>
                    <p><Link to="/services">SHARPENING</Link></p>
                    <p><Link to="/about">ABOUT</Link></p>
                    <p><Link to="/contact">CONTACT</Link></p>
                    <Login />
                </nav>
            )
        } else if (this.props.user) {
            if (this.props.user.isadmin === true) {
                return (
                    <nav className="admin_nav_container">
                        <p><Link to="/admin">DASHBOARD</Link></p>
                        <p><Link to="/shop">SHOP</Link></p>
                        <p><Link to="/services">SHARPENING</Link></p>
                        <p><Link to="/about">ABOUT</Link></p>
                        <p><Link to="/contact">CONTACT</Link></p>
                        <Logout />
                    </nav>
                )
            } else {
                return (
                    <nav className="nav_container">
                        <p><Link to="/shop">SHOP</Link></p>
                        <p><Link to="/services">SHARPENING</Link></p>
                        <p><Link to="/about">ABOUT</Link></p>
                        <p><Link to="/contact">CONTACT</Link></p>
                        <Logout />
                    </nav>
                )
            }
        }
    }

    // showDropDown(){
    //     return (
    //         <Dropdown/>
    //     )
    // }

    render() {
        return (
            <div className="root_header_wrapper">
                <div className="header_main_wrapper">
                    <div className="header_left">
                        <img src={this.props.user.userimg} alt="" className="profile-image-header" />
                        <Link to='/'>
                            <div className="logo_wrapper">
                                WOODWARD KNIVES
                </div>
                        </Link>
                    </div>

                    {this.checkForAdmin()}

                    {/* <nav className="nav_container">
                        <p><Link to="/shop">SHOP</Link></p>
                        <p><Link to="/services">SHARPENING</Link></p>
                        <p><Link to="/about">ABOUT</Link></p>
                        <p><Link to="/contact">CONTACT</Link></p>

                        <Login />
                    </nav>   */}

                    <div className="hamburger_container" onClick={this.props.showSlideMenu}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Menu%2C_Web_Fundamentals_%28White%29.svg/2000px-Menu%2C_Web_Fundamentals_%28White%29.svg.png" alt=""></img>
                    </div>
                </div>
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
export default connect(mapStateToProps, { getCurrentUser })(Header)