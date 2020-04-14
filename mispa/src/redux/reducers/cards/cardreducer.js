const cardsInitState = {
    cards_isLoading: false,
    cards: []
};

const CardReducer = (state = cardsInitState, action) => {
    switch (action.type) {
        case "ADD_CARD":
            let title = action.payload.title;
            let text = action.payload.text;
            let _card = { "title": title, "text": text };
            return {...state, cards: [...state.cards, _card] }
        case "CARDS_LOADING":
            return {...state, cards_isLoading: true };
        case "CARDS_LOAD_ERROR":
            return {...state, cards_isLoading: false };
        case "CARDS_LOAD_SUCCES":
            return {...state, cards: action.payload.cards, cards_isLoading: false };
        case "NEW_CARD_ADDED":
            return {...state, cards: [...state.cards, action.payload.data], cards_isLoading: false  };
        case "CARD_CHANGE_COLOR":
            let _nCards = state.cards.map(
              (_card, i ) => {
                if(_card._id === action.payload.cardId) {
                  _card.color = action.payload.colorIndex;
                  return _card;
                }
                return _card;
              }
            );
            console.log(action);
            return { ...state, cards : _nCards};
        default:
            return state;
    }
}

export default CardReducer;
