import React, { Component } from 'react';
import { loadpersonacortes } from '../redux/reducers/cards/personaactions';
import { connect } from 'react-redux';

import Persona from './Persona';
import AddpersonaForm from './AddPersonaForm';
import Stats from './Stats';

const mapearEstadoAPropiedades = (state) => {
    return { persona: state.persona.persona }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadpersonacortes: () => {
            loadpersonacortes()(dispatch);
          /*loadpersonaPadron: () => {
                loadpersonaPadron()(dispatch),
                loadpersonaParendera: () => {
                    loadpersonaParendera()(dispatch);*/

        }
    }
}

class personaHolderRaw extends Component {
    constructor(){
      super();
      this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        this.props.loadpersonacortes();
    }
    render() {
        let _renderedpersona = this.props.persona.map(
            (crd, i) => {
                return ( <Persona Nombrepersona={ crd.Nombrepersona }
                    FechaNacimiento={ crd.FechaNacimiento}
                    Tipogenero={ crd.Tipogenero}
                    Numerocedula={ crd.Numerocedula}
                    Codigoarea={ crd.Codigoarea}
                    estadocivil={ crd.estadocivil}
                    Pesopersona={ crd.Pesopersona}
                    departamento={ crd.departamento}
  
                      Estadopersona={ crd.Estadopersona || 0}
                      _id={ crd._id }
                      key={ i }
                      />);
                }
            );
            return ( <section >
                <h1 style={{marginTop:70, textAlign:"center", fontSize:40, marginBottom:-40}}>Departamento de Cortés</h1>
                <AddpersonaForm / >
                <Stats/>
                  <hr / >
                  <section className = "personaholder" >
                  { _renderedpersona }
                  </section>
                </section>
            )
        }
    }

    export default connect(mapearEstadoAPropiedades,mapDispatchToProps)(personaHolderRaw);
