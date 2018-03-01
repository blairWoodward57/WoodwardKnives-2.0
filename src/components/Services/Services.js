import React, { Component } from 'react';
import './Services.css';

class Services extends Component {
    render() {
        return (
            <div className="main_services_container">
                <div className="services_background_container">
                    
                    <div className="sharpening_info">
                        <div className="sharpening_info_words">
                            Our mobile sharpening service is available Monday 
                            - Friday during regular business hours. We service the
                            Salt Lake, Davis and Utah County areas. For 
                            scheduling, please contact. We require a $30 minimum sharpening total to 
                            come to your location. We are also at the Salt Lake farmers market
                            at Pioneer Park every summer. 
                        </div>
                    </div>
                    <p className="sharpening_title">Sharpening Prices</p>
                    <div className="sharpening_prices">
                        <div className="sharpening_prices_words">
                        <h4>Kitchen Knives........$0.78 per inch</h4>
                        <h4>Fabric Shears...............$7.95 - $9.95</h4>
                        <h4>Lawn Mower Blades...............$8.50</h4>
                        <h4>One Handed Garden Tools....$6.95</h4>
                        <h4>Loppers........................................$7.95</h4>
                        <h4>Hedgers.......................................$9.95</h4>
                        <h4>Paper Cutters...........$1.50 per inch</h4>
                        <h4>Folding Knives..........................$5.00</h4>
                        <h4>Pocket Knives........$1.95 per blade</h4>
                        <h4>3-Blade Pocket Knives...........$5.00</h4>
                        <h4>Fixed Blade Hunter..................$7.50</h4>
                        <h4>Hatchets......................................$7.95</h4>
                        <h4>Axes..............................................$8.95</h4>
                        <h6>For any other items, please contact</h6>
                    </div>
                </div>
                </div>

            </div>
        )
    }
}

export default Services;