import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./todo.reducer";

export const rootReducer = combineReducers({
  todos: todoReducer,
});
