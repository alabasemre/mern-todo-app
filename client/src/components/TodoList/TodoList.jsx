import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../api/request";
import { setTodos } from "../../store/todoSlice";
import { useNavigate } from "react-router-dom";

import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const todos = useSelector((state) => state.todo.todoList);

    const getTodosDb = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            const responseTodos = await getTodos(localStorage.getItem("token"));

            if (responseTodos.status === 200) {
                dispatch(setTodos(responseTodos.data));
            }
        } else {
            navigate("/signin");
        }
    };

    if (todos.length === 0) {
        getTodosDb();
    }

    return (
        <section style={{ marginTop: 50 }}>
            {todos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} />
            ))}
        </section>
    );
};

export default TodoList;
