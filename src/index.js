import { createStore, combineReducers } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map((todo) => {
        if (todo.id !== action.id) {
          return todo
        }

        return {
          ...todo,
          completed: true
        }
      })
    default:
      return state
  }
}

// class TodoApp extends React.Component {
//   render () {
//     return (
//       <ul>
//           {this.props.todos.map((todo) => {
//             return <li key={todo.id}>{todo.text}</li>
//           })}
//       </ul>
//     )
//   }
// }

let nextTodoId = 0

const TodoApp = ({todos}) => {
  let todoInput

  return (
    <div>
      <input ref={ (input) => {
        todoInput = input
      }}/>
      <button
        onClick={ () => {
          store.dispatch({
            id: nextTodoId++,
            text: todoInput.value,
            type: 'ADD_TODO'
          })
          todoInput.value = ''
        }}>Add</button>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>{todo.text}</li>
        })}
      </ul>
    </div>
  )
}

const visiblilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const todoApp = combineReducers({
  todos,
  visiblilityFilter
})

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(
//       state.todos,
//       action
//     ),
//     visiblilityFilter: visiblilityFilter(
//       state.visiblilityFilter,
//       action
//     )
//   }
// }

const store = createStore(todoApp)

// store.dispatch({
//   id: 0,
//   text: 'My todo',
//   type: 'ADD_TODO'
// })
// store.dispatch({
//   id: 1,
//   text: 'My todo 2',
//   type: 'ADD_TODO'
// })
// store.dispatch({
//   id: 0,
//   type: 'TOGGLE_TODO'
// })
// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED'
// })


const render = () => {
  ReactDOM.render(<TodoApp todos={store.getState().todos} />, document.getElementById('app'))
}

store.subscribe(render)
render();
