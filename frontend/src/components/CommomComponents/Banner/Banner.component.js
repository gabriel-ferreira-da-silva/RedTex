import React from "react";
import styles from "./Banner.module.css";
import logo from "../../../assets/logo.svg"
export default function Banner() {
  return (
    <div className={styles.banner}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <h1 className={styles.title}>RedTex</h1>
    </div>
  );
}
