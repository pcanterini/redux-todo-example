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
          completed: !todo.completed
        }
      })
    default:
      return state
  }
}

const FilterLink = ({filter, children}) => {
  return (
    <a href=''
      onClick={ (e) => {
        e.preventDefault()
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }}>{children}</a>
  )
}

let nextTodoId = 0

class TodoApp extends React.Component {

  render () {
    let todoInput
    const visibleTodos = getVisibleTodos(this.props.todos, this.props.visiblilityFilter)

    return (
      <div>
        <input ref={ (input) => {
          todoInput = input
        }}/>
        <button
          onClick={ () => {
            if (todoInput.value === '') {
              return
            }
            store.dispatch({
              id: nextTodoId++,
              text: todoInput.value,
              type: 'ADD_TODO'
            })
            todoInput.value = ''
          }}>Add</button>
        <ul>
          {visibleTodos.map((todo) =>
            <li key={todo.id}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={ () => {
                store.dispatch({
                  id: todo.id,
                  type: 'TOGGLE_TODO'
                })
              }}>
              {todo.text}
            </li>
          )}
        </ul>
        <p>
          Show:&nbsp;
          <FilterLink filter='SHOW_ALL'>All</FilterLink>&nbsp;
          <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>&nbsp;
          <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
        </p>
      </div>
    )
  }
}

TodoApp.propTypes = {
  todos: React.PropTypes.array.isRequired,
  visiblilityFilter: React.PropTypes.string.isRequired
}

const visiblilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed)
    case 'SHOW_COMPLETED':
      return todos.filter((t) => t.completed)
    default:
      return todos
  }
}

const todoApp = combineReducers({
  todos,
  visiblilityFilter
})

const store = createStore(todoApp)

const render = () => {
  ReactDOM.render(<TodoApp {...store.getState()} />, document.getElementById('app'))
  console.log('state:', store.getState())
}

store.subscribe(render)
render()
