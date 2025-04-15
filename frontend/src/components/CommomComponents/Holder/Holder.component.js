import React from "react";
import Banner from "../Banner/Banner.component";
import styles from "./Holder.module.css"

export default function Holder() {
  return (
    <div className={styles.container}>
        <Banner/>
        <div className={styles.usernameHolder}>
            @username
        </div>
    </div>
  );
}
