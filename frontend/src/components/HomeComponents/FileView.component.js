import React from "react";
import styles from './Home.module.css'


export default function FileView({uploadedFile}) {
  return (
    <div className={styles.previewSection}>
          <h3>{uploadedFile.name}</h3>
          {uploadedFile.extension === 'pdf' ? (
            <iframe
              src={uploadedFile.url}
              title="Uploaded PDF"
              className={styles.previewFrame}
            />
          ) : (
            <img
              src={uploadedFile.url}
              alt={uploadedFile.name}
              className={styles.previewImage} // you can define this in CSS
            />
          )}
        </div>
  );
}