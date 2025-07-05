import { useState, useEffect } from 'react';
import { LoginForm } from '../features/auth/LoginForm';
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
    <div>
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
      <p>Message from the backend: {message}</p>
    </div>
  )
}