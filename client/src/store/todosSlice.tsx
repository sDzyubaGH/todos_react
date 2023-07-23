import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import Todos from '../../../types/Todos'

// Define a type for the slice state
type TodosState = Todos

// Define the initial state using that type
const initialState: TodosState = {
  todos: []
}

export const todosSlice = createSlice({
  name: 'todos',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTodo: (state, action) => {

    }
  },
})

export const { } = todosSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTodos = (state: RootState) => state.todos.todos

export default todosSlice.reducer