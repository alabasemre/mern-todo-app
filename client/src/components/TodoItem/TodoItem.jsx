import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteTodo, checkTodo } from "../../store/todoSlice";
import { deleteTodoRequest, checkTodoRequest } from "../../api/request";

import "react-toastify/dist/ReactToastify.css";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
    const dispatch = useDispatch();
    const { _id, todo, completed } = props.todo;

    const notify = () =>
        toast.success("Görev silindi!", {
            autoClose: 1000,
            pauseOnHover: false,
        });

    const handleDelete = async () => {
        const response = await deleteTodoRequest(
            _id,
            localStorage.getItem("token")
        );

        if (response.status === 200) {
            dispatch(deleteTodo({ _id }));
            notify();
        }
    };

    const handleChecked = async () => {
        const response = await checkTodoRequest(
            _id,
            localStorage.getItem("token")
        );

        if (response.status === 200) {
            dispatch(checkTodo({ _id }));
        }
    };

    return (
        <>
            <div
                className={`${styles["todo-item"]} ${
                    completed ? styles.completed : ""
                }`}
            >
                <input
                    type="checkbox"
                    name="checkTodo"
                    checked={completed}
                    onChange={handleChecked}
                />
                <p>{todo}</p>
                <button onClick={handleDelete}>X</button>
            </div>
        </>
    );
};

export default TodoItem;
