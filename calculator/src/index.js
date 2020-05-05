import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import Calculator from './main/Calculator'
import CalculatorFunctional from './main/CalculatorFunctional'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <div>
    <h1>Calculator</h1>
    <CalculatorFunctional />
  </div>
,
  document.getElementById('root')
)
serviceWorker.unregister()
