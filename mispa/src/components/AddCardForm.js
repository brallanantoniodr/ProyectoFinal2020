import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { addCard } from '../redux/reducers/cards/cardactions';

const AccionesAPropiedades = (dispatch) => {
  return {
    "addCard": (title, text) => addCard(title, text)(dispatch)
  }
}

class AddCardForm extends Component {
  constructor(){
    super();
    this.state = {
      title:"",
      text:""
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
  }
  changeHandler(e){
    this.setState(
      {
        ...this.state,
        [e.target.name]: e.target.value
      }
    );
  }
  addHandler(e){
    this.props.addCard(this.state.title, this.state.text);
  }
  render(){
    return(
      <div style={{padding:"1em 0.5em"}}>
        <TextField fullWidth={true} type="text" name="title" onChange={this.changeHandler} value={this.state.title} label="Título"/>
      <br/>
        <TextField fullWidth={true} type="text" name="text" value={this.state.text} onChange={this.changeHandler} label="Contenido"/>
      <br/>
        <Button fullWidth={true} color="primary" onClick={this.addHandler}>Add Card</Button>
      </div>
    );
  }
}

export default connect(null, AccionesAPropiedades )(AddCardForm);
