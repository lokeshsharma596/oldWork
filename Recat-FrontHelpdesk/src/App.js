import React from 'react';
import { Provider } from 'react-redux'
import store from "./utils/store"
import Routes from "./utils/routes";


export default function App() {
    
    return (
        <Provider store={store} >
        <Routes /> 
         </Provider>
    );
}