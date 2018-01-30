import React, { Component } from 'react';
import './Contact.css';


class Contact extends Component{
    render(){
        return(
            <div className="contact_main_container">
                <div className="contact_heading">Contact</div>
                <div className="contact_info_container">
                     <div className="contact_header">Hours</div>
                     <br></br>
                     <div className="contact">Monday - 9:00 AM - 5:00 PM</div>
                     <div className="contact">Tuesday - 9:00 AM - 5:00 PM</div>
                     <div className="contact">Wednesday - 9:00 AM - 5:00 PM</div>
                     <div className="contact">Thursday - 9:00 AM - 5:00 PM</div>
                     <div className="contact">Friday - 9:00 AM - 5:00 PM</div>
                     <div className="contact">Saturday - 10:00 AM - 2:00 PM</div>
                     <div className="contact">Sunday - CLOSED</div>
                     <br></br>
                     <br></br>
                     <div className="contact_header">Phone</div>
                     <br></br>
                     <div className="contact">801.800.7218</div>
                     <br></br>
                     <br></br>
                     <div className="contact_header">Email</div>
                     <br></br>
                     <div className="contact">mark@woodwardknives.com</div>
                </div>
            </div>
        )
    }
}

export default Contact;
