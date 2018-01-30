import React from 'react';
import Shop from './components/Shop/Shop.js';
import Landing from './components/Landing/Landing.js';
import About from './components/About/About.js';
import Services from './components/Services/Services.js';
import Cart from './components/Cart/Cart.js';
import Checkout from './components/Checkout/Checkout.js';
import Admin from './components/Admin/Admin.js';
import Product from './components/Product/Product.js';
import Contact from './components/Contact/Contact.js';
import EditKnife from './components/EditKnife/EditKnife.js';
import Dropdown from './components/Dropdown/Dropdown.js';

import { HashRouter as Router, Route } from 'react-router-dom';

export default function router(showSlideMenu, closeMenu){
    console.log('closeMenu', closeMenu, 'showSlideMenu', showSlideMenu)
    return (
        <Router>
               <div>
                   <Route component={Landing} exact path='/'/>
                   <Route component={Shop} path='/shop'/>
                   <Route component={About} path='/about'/>
                   <Route component={Services} path='/services'/>
                   <Route component={Cart} path='/cart'/>
                   <Route component={Checkout} path='/checkout'/>
                   <Route component={Admin} path='/admin'/>
                   <Route component={Product} path='/product/:knife_id'/>
                   <Route component={Contact} path='/contact'/>
                   <Route component={EditKnife} path='/editknife/:id'/>
                   <Route render={() => <Dropdown showSlideMenu={showSlideMenu} closeMenu={closeMenu}/>} path='/'/>
               </div>
           </Router>
    )
}

           
