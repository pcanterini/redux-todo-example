import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const counter = (store = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return store + 1
    case 'DECREMENT':
      return store - 1
    default:
      return store
  }
}

const Counter = ({value, onDecrement, onIncrement}) => (
  <div>
    <h2>{value}</h2>
    <button onClick={onDecrement}>-</button>
    <button onClick={onIncrement}>+</button>
  </div>
)

const render = () => {
  ReactDOM.render(
    <Counter
    value={store.getState()}
    onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    onIncrement={() => store.dispatch({type: 'INCREMENT'})}
    />,
    document.getElementById('app')
  )
}

// Store
const store = createStore(counter)
store.subscribe(render)

// init
render()
