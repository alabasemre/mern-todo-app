import React from "react";
import { SocialIcon } from "react-social-icons";
import styles from "./Socials.module.css";
import leetcode from "../../static/leetcode.png";

const Socials = () => {
    return (
        <div className={styles.container}>
            <SocialIcon
                className={styles.icon}
                url="https://github.com/alabasemre"
                target={"_blank"}
                rel="noopener noreferrer"
            />
            <a
                href="https://leetcode.com/alabasemre/"
                className={styles.leetcode}
                rel="noopener noreferrer"
                target={"_blank"}
            >
                <img src={leetcode} alt="leetcode profile" />
            </a>
            <SocialIcon
                className={styles.icon}
                url="https://www.linkedin.com/in/emre-alaba%C5%9F-2a3440183/"
                target={"_blank"}
                rel="noopener noreferrer"
            />
        </div>
    );
};

export default Socials;
