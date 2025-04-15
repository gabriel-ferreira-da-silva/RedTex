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
        <li><a href="/home">Home</a></li>
        <li><a href="/history">History</a></li>
        <li><a href="/account">Account</a></li>
        <li><a href="/about">About</a></li>

      </ul>
    </nav>
  );
}
