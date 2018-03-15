import React, { Component } from 'react';
import './App.css';
import router from './router.js';
import Header from './components/Header/Header.js';
import Subheader from './components/Subheader/Subheader.js'
import Footer from './components/Footer/Footer.js';
import Dropdown from './components/Dropdown/Dropdown.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSlideMenu: false
    }
    this.showMenu = this.showMenu.bind(this);
  }

  showMenu() {
    this.setState({
      showSlideMenu: !this.state.showSlideMenu
    })
  }

  whichMenu() {
    if (this.state.showSlideMenu === false) {
      return (
        <div className="header">
          <Header showSlideMenu={this.showMenu} />
          <Subheader />
        </div>
      )
    } else if (this.state.showSlideMenu === true) {
      return (
        <div className="header">
          <Header showSlideMenu={this.showMenu} />
          <Dropdown showMenu={this.showMenu} />
        </div>
      )
    }
  }


  render() {
    return (
      <div className="App">
        {this.whichMenu()}
        {router(this.state.showSlideMenu, this.showMenu)}
        <div className="footer">
          <Footer className="main_footer" />
        </div>
      </div>
    );
  }
}

export default App;