import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import axios from 'axios'

import { Provider } from 'react-redux'

import storeFactory from './redux/store'

//set Base urls for axios here....

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem('token') as string
  console.log(
    '-----------**********  am i executed ??  *********-------------------------------'
  )
  const requestHeader = {
    Authorization: `Bearer ${token}`,
  }
  request.headers = requestHeader
  return request
})
const reduxStore = storeFactory()
ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
