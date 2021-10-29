import { createSlice } from "@reduxjs/toolkit";
import {
  getTodosAsync,
  deleteTodoAsync,
  addTodoAsync,
  toggleTodoAsync,
} from "./todosServices";

const initialState = {
  items: [],
  isLoading: false,
  addTodoLoading: false,
  error: null,
  activeFilter: localStorage.getItem("activeFilter"),
};
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((todo) => !todo.completed);
    },
  },
  extraReducers: {
    // getTodos
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    // addTodo
    [addTodoAsync.pending]: (state, action) => {
      state.addTodoLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addTodoLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.addTodoLoading = false;
    },
    // toggleTodo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
    },
    // deleteTodo
    [deleteTodoAsync.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((todo) => todo.id !== id);
    },
  },
});

export const selectTodos = (state) => state.todos.items;
export const activeFilter = (state) => state.todos.activeFilter;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};
export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
