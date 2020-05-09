import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './Reducers/mainReducer.js'


const store = createStore(reducer, applyMiddleware(thunk));

// store.subscribe(()=>{
//   console.log(store.getState());
// });

export default store;
