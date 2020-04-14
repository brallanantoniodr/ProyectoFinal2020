import React, { Component } from 'react';
import { connect } from  'react-redux';
import  { changeColor } from '../redux/reducers/cards/cardactions.js';
const colors = ["#FFF","#F00","#0F0"];

const mapDispatchToProps = ( dispatch ) => {
  return {
    changeColor: (id, color) => {changeColor(id, color)(dispatch);}
  }
}

class Card extends Component {
  constructor(){
    super();
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler(e){
    let _current = this.props.color;
    if(_current=== 3){
      _current=0;
    }else{
      _current ++;
    }
    console.log("click");
    this.props.changeColor(this.props.id, 1);
  }

  render() {
    console.log(this.props);
    return (
      <div className="card" style={{backgroundColor:colors[this.props.color]}}>
        <h3>{this.props.title || 'Títutlo'}</h3>
        <span>
          {this.props.text || 'Algún Texto' }
        </span>
        <button onClick={this.onClickHandler}>
            Cambiar Color
        </button>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Card);
