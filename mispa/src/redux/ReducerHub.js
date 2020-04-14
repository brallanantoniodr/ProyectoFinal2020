import { combineReducers } from 'redux';

import personaReducer from './reducers/cards/personareducer';
// export UserReducer from './reducers/user/userreducer';

export default combineReducers(
  { persona: personaReducer }
);
