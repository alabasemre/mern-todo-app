import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoList: [],
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
        },
        setTodos: (state, action) => {
            state.todoList = action.payload;
        },
        deleteTodo: (state, action) => {
            state.todoList = state.todoList.filter(
                (item) => item._id !== action.payload._id
            );
        },
        checkTodo: (state, action) => {
            state.todoList = state.todoList.map((item) => {
                if (item._id !== action.payload._id) {
                    return item;
                }

                item.completed = !item.completed;
                return item;
            });
        },
    },
});

export const { addTodo, deleteTodo, checkTodo, cleanTodos, setTodos } =
    todoSlice.actions;
export default todoSlice.reducer;
