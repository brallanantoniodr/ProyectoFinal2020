import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import { addpersona } from '../redux/reducers/cards/personaactions';

const AccionesAPropiedades = (dispatch) => {
  return {
    "addpersona": (Codigopersona,FechaNacimiento,Tipogenero,Numerocedula,Codigoarea,estadocivil,Pesopersona,departamento) => addpersona(Codigopersona,FechaNacimiento,Tipogenero,Numerocedula,Codigoarea,estadocivil,Pesopersona,departamento)(dispatch)
  }
}

class AddpersonaForm extends Component {
  constructor(){
    super();
    this.state = {
      Nombrepersona:"",
      FechaNacimiento:"12/12/2020",
      Tipogenero:"",
      Numerocedula:0,
      Codigoarea:"",
      estadocivil:"",
      Pesopersona:0,
      departamento:""
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
    this.props.addpersona(this.state.Nombrepersona, this.state.FechaNacimiento,this.state.Tipogenero,this.state.Numerocedula,this.state.Codigoarea,this.state.estadocivil,this.state.Pesopersona,this.state.departamento);
  }
  render(){
    return(
      <div className="F1" style={{padding:"1em 1em"}}>
        <TextField fullWidth={true} type="text" name="Nombrepersona" onChange={this.changeHandler} value={this.state.Nombrepersona} label="Nombre de persona"/>
      <br/>
        <TextField fullWidth={true} type="date" name="FechaNacimiento" value={this.state.FechaNacimiento} onChange={this.changeHandler} label="Fecha Nacimiento"/>
      <br/>
      <FormControl  style={{width:"100%"}}  >
      <InputLabel id="demo-simple-select">Genero</InputLabel>
      <Select
          name="Tipogenero"
          value={this.state.Tipogenero}
          onChange={this.changeHandler}
          style={{width:"100%", textAlign:"left"}} 
        >
          <MenuItem value={"Masculino"}>Masculino</MenuItem>
          <MenuItem value={"Femenino"}>Femenino</MenuItem>
        </Select>
      </FormControl>
      <br/>
        <TextField fullWidth={true} type="text" name="Numerocedula" value={this.state.Numerocedula} onChange={this.changeHandler} label="Numero cedula"/>
      <br/>
        <TextField fullWidth={true} type="text" name="Codigoarea" value={this.state.Codigoarea} onChange={this.changeHandler} label="Codigo area"/>
      <br/>
      <FormControl  style={{width:"100%"}}  >
      <InputLabel id="demo-simple-select">Estado civil</InputLabel>
      <Select
          name="estadocivil"
          value={this.state.estadocivil}
          onChange={this.changeHandler}
          style={{width:"100%", textAlign:"left"}} 
        >
          <MenuItem value={"Soltero"}>Soltero</MenuItem>
          <MenuItem value={"Casado"}>Casado</MenuItem>
          <MenuItem value={"Viudo"}>Viudo</MenuItem>
        </Select>
      </FormControl>
      <br/>
        <TextField fullWidth={true} type="text" name="Pesopersona" value={this.state.Pesopersona} onChange={this.changeHandler} label="Peso persona"/>
      <br/>
      <FormControl  style={{width:"100%"}}  >
      <InputLabel id="demo-simple-select">Departamento</InputLabel>
      <Select
          name="departamento"
          value={this.state.departamento}
          onChange={this.changeHandler}
          style={{width:"100%", textAlign:"left"}} 
        >
          <MenuItem value={"franciscomorazan"}>Francisco Morazan</MenuItem>
          <MenuItem value={"cortes"}>Cortes</MenuItem>
          <MenuItem value={"olancho"}>Olancho</MenuItem>
        </Select>
      </FormControl>

        
        <Button fullWidth={true} style={{backgroundColor:"rgb(7, 13, 193)", color:"white", marginTop:10}} onClick={this.addHandler}>Agregar persona</Button>
      </div>

    );
  }
}

export default connect(null, AccionesAPropiedades )(AddpersonaForm);

