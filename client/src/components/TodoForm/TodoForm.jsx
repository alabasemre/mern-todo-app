import React, { useState } from "react";
import styles from "./TodoForm.module.css";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import { addTodoRequest } from "../../api/request";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoForm = () => {
    const dispatch = useDispatch();

    const notify = () =>
        toast.success("Ekleme Başarılı!", {
            autoClose: 1000,
            pauseOnHover: false,
        });

    const [todo, setTodo] = useState("");
    const [error, setError] = useState(false);

    const handleClick = async () => {
        if (todo.trim().length === 0) {
            setError(true);
            return;
        }

        setError(false);
        const response = await addTodoRequest(
            todo,
            localStorage.getItem("token")
        );

        if (response.status === 200) {
            dispatch(addTodo(response.data));
            setTodo("");
            notify();
        }
    };

    return (
        <>
            <section className={styles["todo-form"]}>
                <label htmlFor="txtTodo">Todo :</label>
                <input
                    type="text"
                    name="txtTodo"
                    id="txtTodo"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button onClick={handleClick}>Ekle</button>
            </section>
            {error ? (
                <p style={{ marginTop: 25, textAlign: "center" }}>
                    Lütfen geçerli bir görev girin
                </p>
            ) : null}
        </>
    );
};

export default TodoForm;
