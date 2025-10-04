import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    // { id: 1, todoTitle: "I am Working CAPTAIN" },
],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        todoTitle: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    updateTodo: (state, action) => {
      const { id, todoTitle } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.todoTitle = todoTitle;
      }
    },

    setTodos: (state, action) => {
      state.todos = action.payload;
    },

    toggleTodo: (state, action) =>{
      const todo = state.todos.find(todo=> todo.id === action.payload);
      if (todo){
        todo.completed = !todo.completed
      }
    }
  },
});

export const { addTodo, removeTodo, updateTodo, setTodos, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
