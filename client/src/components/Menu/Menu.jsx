import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

import styles from "./Menu.module.css";

const Menu = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <div className={styles["container-header"]}>
                <div className={styles["header-logo"]}>
                    <Link to="/">
                        <h1>Todo App</h1>
                    </Link>
                </div>
                <div className={styles["header-btns"]}>
                    {user ? (
                        <button onClick={logoutHandler}>Çıkış Yap</button>
                    ) : (
                        <>
                            <Link to="signup">
                                <button>Kayıt Ol</button>
                            </Link>
                            <Link to="signin">
                                <button>Giriş Yap</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Menu;
