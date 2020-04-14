import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Almacen from './redux/Almacen';
import personaHolder from './components/PersonaHolder';
import PersonaHolderCortes from './components/PersonaHolderCortes';
import PersonaHolderOlancho from './components/PersonaHolderOlancho';
import Home from './components/Home';
import Stats from './components/Stats';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store = {Almacen}>
      <body>
        <Router>
          <section>
              <Home />
              <Route path="/olancho" component={PersonaHolderOlancho} />
              <Route path="/cortes" component={PersonaHolderCortes} />
              <Route path="/franciscomorazan" component={personaHolder} />
          </section>
        </Router>
        </body>
      </Provider>
    );
  }
}

export default App;
