/* libs */
import React from 'react'
import ReactDom from 'react-dom'
import { Provider, useDispatch } from 'react-redux'
/* styles */
import '../node_modules/normalize.css/normalize.css'
import commonStyles from './scss/main.module.scss'
/* components */
import App from './js/app'
/* other */
import store from './js/Redux/store'
import { initialState } from './js/Redux/reducers/cartReducer'

/* service imports */
//temporary import for adding items to database
// import './js/temporaryToAddData/addDataToFirebase'

//temporary import for testing authentication
// import './js/temporaryToAddData/auth_test'
/* ==== service imports ===== */

Object.keys(window.localStorage).forEach(id => {
  id !== 'loglevel:webpack-dev-server' ?
    initialState.products[id] = { amount: parseInt(window.localStorage.getItem(id)) } :
    false
})

ReactDom.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#app')
)