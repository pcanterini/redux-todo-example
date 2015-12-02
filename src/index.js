import { createStore } from 'redux'

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

const render = () => {
  console.log('my todos:', store.getState())
}

const store = createStore(todos)
store.subscribe(render)

store.dispatch({
  id: 0,
  text: 'My todo',
  type: 'ADD_TODO'
})

store.dispatch({
  id: 0,
  type: 'TOGGLE_TODO'
})
