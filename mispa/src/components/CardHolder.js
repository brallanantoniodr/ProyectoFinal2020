import React, { Component } from 'react';
import { loadCards } from '../redux/reducers/cards/cardactions';
import { connect } from 'react-redux';

import Card from './Card';
import AddCardForm from './AddCardForm';

const mapearEstadoAPropiedades = (state) => {
    return { cards: state.cards.cards }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadCards: () => {
            loadCards()(dispatch);
        }
    }
}

class CardHolderRaw extends Component {
    constructor(){
      super();
      this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        this.props.loadCards();
    }
    render() {
        let _renderedCards = this.props.cards.map(
            (crd, i) => {
                return ( <Card title={ crd.title }
                    text={ crd.text }
                    color={ crd.color || 0}
                    id={ crd._id }
                    key={ i }
                    />);
                }
            );
            return ( <section >
                <AddCardForm / >
                  <hr / >
                  <section className = "cardholder" >
                  { _renderedCards }
                  </section>
                </section>
            )
        }
    }

    export default connect(mapearEstadoAPropiedades, mapDispatchToProps)(CardHolderRaw);
