import React, { Component } from 'react';
import './About.css';


class About extends Component{
    render(){
        return(
            <div className="about_main_container">
                
                <div className="about_header">About Woodward Knives</div>
                <div className="about_container">
                  <img src="http://archive.sltrib.com/images/2012/0712/lorenzknifes_071112~1.jpg" alt=""></img>
                  <div className="about_words">
                      Mark has been working with knives and sharpening for the better part of two decades. 
                      With the first ten years being devoted to mastering the art of sharpening knives and tools of
                      all types, he has spent the last several years learning and honing his skills as a custom knife
                      maker. 
                  </div>
                </div>
                
            </div>
            
           
        )
    }
}

export default About;