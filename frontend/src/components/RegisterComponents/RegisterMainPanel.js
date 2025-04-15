import React, { useState } from 'react';
import styles from './Register.module.css';
import { createUser } from '../../services/User.services';
import Banner from '../CommomComponents/Banner/Banner.component';

export default function RegisterMainPanel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name,setName] = useState('');
  
  const handleSubmit = () => {
    createUser(username,password,email,name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Banner></Banner>
        <h2 className={styles.title}>Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleSubmit}>
          Sign In
        </button>
      </div>
    </div>
  );
}
