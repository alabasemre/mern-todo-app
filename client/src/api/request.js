import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_PROD_URL;

export const signUpRequest = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/signup`, user);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const signInRequest = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/signin`, user);

        return response;
    } catch (error) {
        return error.response;
    }
};

export const addTodoRequest = async (text, token) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/todos`,
            {
                todo: text,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deleteTodoRequest = async (id, token) => {
    try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const checkTodoRequest = async (id, token) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/todos/${id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getTodos = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/todos`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        return error.response;
    }
};
