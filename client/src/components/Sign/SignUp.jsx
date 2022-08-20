import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUpRequest } from "../../api/request";

import styles from "./Sign.module.css";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [userNameInvalid, setUserNameInvalid] = useState(false);
    const [email, setEmail] = useState("");
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [wrongUser, setWrongUser] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (userName.trim().length < 4) {
            setUserNameInvalid(true);
            return;
        }
        setUserNameInvalid(false);

        if (!email.includes("@")) {
            setEmailInvalid(true);
            return;
        }
        setEmailInvalid(false);

        if (password.length < 4) {
            setPasswordInvalid(true);
            return;
        }
        setPasswordInvalid(false);

        const response = await signUpRequest({
            name: userName,
            email,
            password,
        });

        if (response.status !== 201) {
            setWrongUser(true);
            return;
        }

        setWrongUser(false);
    };

    return (
        <div className={styles["sign-form"]}>
            <h1 className={styles.title}>Kayıt Ol</h1>
            <form onSubmit={handleSignup}>
                <div className={styles["input-group"]}>
                    <label htmlFor="txtUserName">Kullanıcı Adı</label>
                    <input
                        type="text"
                        name="txtUserName"
                        id="txtUserName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    {userNameInvalid && (
                        <p className={styles["p-invalid"]}>
                            Kullanıcı Adı en az 4 karakterden oluşmalıdır.
                        </p>
                    )}
                </div>
                <div className={styles["input-group"]}>
                    <label htmlFor="txtEmail">E-Posta Adresi</label>
                    <input
                        type="email"
                        name="txtEmail"
                        id="txtEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailInvalid && (
                        <p className={styles["p-invalid"]}>
                            Lütfen geçerli bir E-posta adresi girin.
                        </p>
                    )}
                </div>
                <div className={styles["input-group"]}>
                    <label htmlFor="txtPassword">Şifre</label>
                    <input
                        type="password"
                        name="txtPassword"
                        id="txtPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordInvalid && (
                        <p className={styles["p-invalid"]}>
                            Şifre en az 4 karakterden oluşmalıdır.
                        </p>
                    )}
                </div>
                {wrongUser && (
                    <p style={{ color: "red", marginTop: 12 }}>
                        Kullanıcı Adı veya E-posta Adresiyle daha önce kayıt
                        olunmuş!
                    </p>
                )}
                <button className={styles["btn-signin"]}>Kayıt Ol</button>
                <p className={styles["p-signup"]}>
                    Zaten bir hesabınız var mı?
                    <br />
                    Hemen{" "}
                    <span>
                        <Link to="/signin">Giriş </Link>
                    </span>
                    yapın.
                </p>
            </form>
        </div>
    );
};

export default SignUp;
