import React, { Component } from 'react';
import './Logout.css';

class Logout extends Component {
    render() {
        return (
            <div className="logout_main_container">
                <div className="logout_button_container">
                    <div className="button_name">
                        <a href='http://localhost:3002/auth/logout'>LOGOUT</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Logout;