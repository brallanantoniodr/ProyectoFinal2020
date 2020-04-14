import React, { Component } from 'react';
import { connect } from  'react-redux';
import  { changeColor } from '../redux/reducers/cards/personaactions.js';
const colors = ["#D5D5D6","#FBD0C7","#F8F99D","#C8E2FC"];


class Persona extends Component {
  constructor(){
    super();
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler(e){
    let _current = this.props.Estadopersona;
    if(_current=== 3){
      _current=0;
    }else{
      _current ++;
    }
    console.log("click",_current);
    this.props.changeColor(this.props._id, _current);
  }

  render() {
    console.log(this.props);
    return (
      <div className="persona" style={{backgroundColor:"rgb(55, 214, 16)"}}>
        <h3>{this.props._id || 'Titulo'}</h3> <br/>
        <span>
          {this.props.Nombrepersona || 'Nombre de persona' }<br/>
        </span>
        <span>
        {this.props.FechaNacimiento || 'AAAA/MM/DD' }<br/>
        </span>
        <span>
          {this.props.Tipogenero || 'Genero' }<br/>
        </span>
        <span>
          {this.props.Numerocedula || 'Cedula' }<br/>
        </span>
        <span>
          {this.props.Codigoarea || 'Codigo de area' }<br/>
        </span>
        <span>
          {this.props.estadocivil || 'Estado civil' }<br/>
        </span>
        <span>
          {this.props.Pesopersona || 'Peso de persona' }<br/>
        </span>
        <span>
          {this.props.departamento || 'Departamento' }<br/>
        </span>
      </div>
    );
  }
}

export default connect(null)(Persona);
