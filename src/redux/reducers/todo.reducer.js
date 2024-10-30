import { createSlice } from "@reduxjs/toolkit";

const todos = [
  { userId: 1, id: 1, title: "delectus aut autem", completed: true },

  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },

  { userId: 1, id: 3, title: "fugiat veniam minus", completed: false },

  { userId: 1, id: 4, title: "et porro tempora", completed: true },
];

const initialState = { todos };

export const todoSlice = createSlice({
  name: "todos",
  initialState,

  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },

    addTodo: (state, action) => {
      console.log(action.payload);
      state.todos = state.todos.push({ ...action.payload });
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload.todoId
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteTodo, setTodos, addTodo } = todoSlice.actions;

export default todoSlice.reducer;
