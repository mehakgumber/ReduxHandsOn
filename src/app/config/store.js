import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))

store.subscribe(() => console.log('redux store', store.getState()))

export default store
