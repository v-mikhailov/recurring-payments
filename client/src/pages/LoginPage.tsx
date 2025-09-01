import { useState, useEffect } from 'react';
import { LoginForm } from '../components/forms/loginForm/LoginForm';
import { Link } from 'react-router-dom';

import styles from './loginPage.module.css';

export const LoginPage = () => {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('api/v1/ping')
    .then((res) => res.json())
    .then((data) => setMessage(data.message))
    .catch((error) => console.error('Error fetching message:', error));
  }, []) 

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>PayTrack</h1>
        <p className={styles.subtitle}>
          Log in to manage your recurring payments effortlessly. This section provides access to your personalized payment dashboard.
        </p>
      </header>
      <div className={styles.form}> 
        <LoginForm />
      </div>
      <footer className={styles.links}>
        <p>Don't have an account? {' '}
          <Link to="/auth/register">
            Sign Up
          </Link>
        </p>
        <p> Temporary access without registration {' '}
          <Link to="/dashboard">
            Go to Dashboard
          </Link>
        </p>
        <p>Message from the backend: {message}</p>
      </footer>
    </section>
  )
}