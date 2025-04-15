import React from "react";
import styles from './Home.module.css'


export default function FileView({uploadedFile}) {
  return (
    <div className={styles.previewSection}>
          <h3>Uploaded File: {uploadedFile.name}</h3>
          {uploadedFile.extension === 'pdf' ? (
            <iframe
              src={uploadedFile.url}
              title="Uploaded PDF"
              className={styles.previewFrame}
            />
          ) : (
            <a href={uploadedFile.url} download={uploadedFile.name}>
              Download {uploadedFile.name}
            </a>
          )}
        </div>
  );
}

