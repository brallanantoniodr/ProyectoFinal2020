import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './ReducerHub';

const Almacen = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default Almacen;