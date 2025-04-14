import React, { useState } from 'react';
import styles from './Login.module.css';

export default function LoginMainPanel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <h1 className={styles.mainTitle}>RedTex</h1>
        <h2 className={styles.title}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleLogin}>
          Login
        </button>
        <p className={styles.register}>
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}
