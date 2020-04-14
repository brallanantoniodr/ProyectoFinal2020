import axios from 'axios';

export const addNewCard = (newCard) => {
  return {
    type: "NEW_CARD_ADDED",
    payload: { data: newCard }
  }
}

export const isLoadingCards = () => {
    return {
        type: "CARDS_LOADING",
        payload: { "isLoading": true }
    }
}

export const loadingError = () => {
    return {
        type: "CARDS_LOAD_ERROR",
        payload: { "isLoading": false }
    }
}

export const cardsLoaded = (cards) => {
    return {
        type: "CARDS_LOAD_SUCCES",
        payload: { "isLoading": false, "cards": cards || [] }
    }
}

export const cardChangeColor = (_id, colorIndex) => {
  return {
    type:"CARD_CHANGE_COLOR",
    payload: {
      colorIndex: colorIndex,
      cardId : _id
    }
  }
}

export const loadCards = () => {
    return (dispatch) => {
        dispatch(isLoadingCards());
        axios.get('http://localhost:3000/api/cards/all')
            .then(
                (response) => {
                    dispatch(cardsLoaded(response.data));
                }
            )
            .catch(
                (response) => {
                    console.log(response);
                    dispatch(loadingError);
                }
            );
    }
}

export const addCard = (title, text) => {
  return (dispatch) => {
    dispatch(isLoadingCards());
    axios.post('http://localhost:3000/api/cards/add', {title:title, text:text})
      .then(
        (response) => {
          dispatch(addNewCard(response.data));
        }
      )
      .catch(
        (response) => {
          console.log(response);
          dispatch(loadingError);
        }
      );
  }
}

export const changeColor = ( cardid, colorIndex ) => {
  return (dispatch) => {
    dispatch(isLoadingCards());
    axios.put("http://localhost:3000/api/cards/setcolor", {id: cardid, color: colorIndex})
    .then( (response) => {
      console.log(response);
        dispatch(cardChangeColor(cardid, colorIndex));
    } )
    .catch( (response) => {
      console.log(response);
      dispatch(loadingError);
    } )
  }
}
