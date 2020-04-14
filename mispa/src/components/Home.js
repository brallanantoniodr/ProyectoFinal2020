import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';



class Home extends Component {
  render(){
    return (
      <section className="Splash">
      <nav className="menu">
        <ul>
        <li><NavLink to="/franciscomorazan">Francisco Morazán</NavLink></li>
        <li><NavLink to="/cortes">Cortes</NavLink></li>
        <li><NavLink to="/olancho">Olancho</NavLink></li>
        </ul>
        </nav>
        
      </section>
    );
  }
}

export default Home;
