import React from "react";
import styles from "./Navbar.module.css";
import Banner from "../Banner/Banner.component";
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Banner/>
      </div>
      <ul className={styles.navLinks}>
        <li><a href="/home">Read PDF</a></li>
        <li><a href="/ocr">Read Image</a></li>
        <li><a href="/history">History</a></li>
      </ul>
    </nav>
  );
}
