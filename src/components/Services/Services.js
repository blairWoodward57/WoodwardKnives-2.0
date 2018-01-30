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
                        <h6 className="serrated_price">Serrated......................................................$0.85 per inch</h6>
                        <h4>Fixed Blade Hunter..$6.95 - $8.95</h4>
                        <h4>Folding Knives..........................$6.95</h4>
                        <h4>Pocket Knives...........................$4.95</h4>
                        <h4>Scissors..........................$5.99 - $9.99</h4>
                        <h4>Axes...............................................$8.95</h4>
                        <h4>Mower Blades............................$9.99</h4>
                        <h4>Hatchets......................................$7.95</h4>
                        <h4>Food Processer Blades........$15.00</h4>
                        <h4>Meat Slicer Blades................$25.00</h4>
                        <h4>Meat Slicer Blades................$25.00</h4>
                        <h6>For any other items, please contact</h6>
                    </div>
                </div>
                </div>

            </div>
        )
    }
}

export default Services;