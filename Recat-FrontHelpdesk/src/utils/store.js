import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./rootReducer"
import rootSaga from "../utils/rootSagas"

const sagaMiddleware = createSagaMiddleware()


const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(logger,sagaMiddleware)))
// const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)))


sagaMiddleware.run(rootSaga)


export default store;