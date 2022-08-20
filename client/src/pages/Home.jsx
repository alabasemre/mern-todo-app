import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import TodoForm from "../components/TodoForm/TodoForm";
import TodoList from "../components/TodoList/TodoList";
import Welcome from "../components/Welcome/Welcome";
import Container from "../UI/Container";

const Home = () => {
    const user = useSelector((state) => state.user.user);
    return (
        <>
            {user ? (
                <Container>
                    <TodoForm />
                    <TodoList />
                    <ToastContainer pauseOnFocusLoss={false} />
                </Container>
            ) : (
                <Welcome />
            )}
        </>
    );
};

export default Home;
