import React from 'react';
import styles from './Home.module.css';
import ai from '../../assets/ai.svg';
import ReactMarkdown from 'react-markdown';

export default function ResponsePanel({
  isLoading,
  analysisResult,
  handleAnalysisRequest,
}) {
  return (
    <div className={styles.textAndButtonContainer}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Analyzing document...</p>
        </div>
      )}

      <div className={styles.markdownContainer}>
        <ReactMarkdown>
          {analysisResult || "Click to get AI analysis"}
        </ReactMarkdown>
      </div>

      <div className={styles.uploadButton} onClick={handleAnalysisRequest}>
        <div className={styles.textButton}>AI analysis</div>
        <img src={ai} alt="ai" className={styles.imageButton} />
      </div>
    </div>
  );
}
