import { useState, useEffect } from 'react';
import { LoginForm } from '../components/forms/loginForm/LoginForm';
import { Link } from 'react-router-dom';

export const LoginPage = () => {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('api/v1/ping')
    .then((res) => res.json())
    .then((data) => setMessage(data.message))
    .catch((error) => console.error('Error fetching message:', error));
  }) 

  return (
    <main>
      <h1>PayTrack</h1>
      <p>
        Log in to manage your recurring payments effortlessly.
      </p>
      <LoginForm />
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
    </main>
  )
}