import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	todos: [
		{ id: 1, todo: "belajar react" },
		{ id: 2, todo: "belajar redux" },
	],
};

export const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.todos.push(action.payload);
		},
		deleteTodo: (state, action) => {
			state.todos = state.todos.filter((item) => item.id !== action.payload);
		},
		updateTodo: (state, action) => {
			state.todos.splice(action.payload.id - 1, 1, action.payload);
		},
	},
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
