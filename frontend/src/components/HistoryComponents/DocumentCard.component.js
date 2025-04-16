import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styles from './History.module.css';

export default function DocumentCard({ 
  name,
  date,
  response,
  description
 }) {
  const formattedDate = format(new Date(date), "PPP 'at' p");

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.date}>{formattedDate}</p>
      </div>
      <div className={styles.description}>
        {description}
      </div>
    </div>
  );
}
