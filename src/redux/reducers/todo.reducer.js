import { createSlice } from "@reduxjs/toolkit";

const todos = [
  {
    title: "Wash",
    description: "Wash Clothes",
    date: "2024-10-11",
    time: "11:57",
    notes: "",
    id: 1,
    userId: 1,
    completed: false,
  },

  {
    title: "Cook",
    description: "Cook a meal",
    date: "2024-10-11",
    time: "13:57",
    notes: "",
    id: 2,
    userId: 1,
    completed: true,
  },

  {
    title: "Play Tennis",
    description: "Play Table Tennis",
    date: "2024-11-12",
    time: "10:22",
    notes: "",
    id: 3,
    userId: 1,
    completed: false,
  },
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
      state.todos.push({ ...action.payload });
    },

    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id == action.payload.id) {
          const completedTodo = { ...todo, ...action.payload };
          todo = completedTodo;
          return todo;
        }
        return todo;
      });
    },

    markAsCompleted: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          const completedTodo = { ...todo, completed: !todo.completed };
          todo = completedTodo;
          return todo;
        }
        return todo;
      });
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload.todoId
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteTodo, setTodos, addTodo, markAsCompleted, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
