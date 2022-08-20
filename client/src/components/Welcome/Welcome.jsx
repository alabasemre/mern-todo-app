import React from "react";
import styles from "./Welcome.module.css";

const Welcome = () => {
    return (
        <div className={styles.welcome}>
            <h1 className={styles.info}>Welcome to Todo APP</h1>
            <h1 className={styles.name}>Developed By Emre ALABAŞ</h1>
        </div>
    );
};

export default Welcome;
