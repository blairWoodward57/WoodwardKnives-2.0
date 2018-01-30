import React, { Component } from 'react';
import './Subheader.css';
import CartBubble from './../CartBubble/CartBubble.js';


class Subheader extends Component {
    render() {
        return (
            <div className="subheader_container">
                <CartBubble />
            </div>
        )
    }
}

export default Subheader;