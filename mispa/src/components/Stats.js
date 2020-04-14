import React, { Component } from 'react';
import { connect } from 'react-redux';

const MapStoreToProps = (state)=>{
  return {
    persona: state.persona,
    personaLength : state.persona.persona.length
  }
}

class Stats extends Component {
  render(){
    return (

      <section className="splash">
        <h1>Conteo de personas en este departamento</h1>
        <b>Total Persona: {this.props.personaLength}</b>
      </section>
    );
  }
}

export default connect( MapStoreToProps ) (Stats);
