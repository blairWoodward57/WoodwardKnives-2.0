import React, { Component } from 'react';
import './Product.css';

class Product extends Component {

    
    render() {
        return (
            <div className="productpage_main">
                <div className="productpage_product_tile">
                    <div className="productpage_tile_image_and_info">
                        <div className="productpage_product_image">
                            <img src="https://scontent.fmkc1-1.fna.fbcdn.net/v/t1.0-9/12987153_1081458968586201_3001825154775039564_n.jpg?oh=4183b3bd419cc785779754bb59888957&oe=5A41D240" alt=""/>
                        </div>
                        <div className="productpage_product_info">
                            <h1>Features</h1>
                            <p>The Blackhawk is a well rounded tactical fixed blade knife that can be used for any situation that calls for a sharp edge and a sturdy blade</p>
                            <p>Blade Length: 4 inches</p>
                            <p>Overall Length: 8 inches</p>
                            <p>Steel: CPM S30V</p>
                            <p>Handle: Textured G10</p>
                            <p>Price: $329</p>
                        </div>
                    </div>
                    <div className="productpage_tile_bottom">
                    <div className="productpage_tile_title">Blackhawk</div>
                    <button className="productpage_add_to_cart_button">Add To Cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;