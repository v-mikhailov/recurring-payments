import { useState, useEffect } from 'react';
import { LoginForm } from '../components/forms/LoginForm';
import { Link } from 'react-router-dom';

export const LoginPage = () => {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('api/v1/ping')
    .then((res) => res.json())
    .then((data) => setMessage(data.message))
    .catch((error) => console.error('Error fetching message:', error));
  }, []) 

  return (
    <section className='flex flex-col gap gap-y-[30px]'>
      <header className='flex flex-col items-center gap-y-[8px]'>
        <h1 className='text-4xl'>PayTrack</h1>
        <p className='text-center'>
          Log in to manage your recurring payments effortlessly. This section provides access to your personalized payment dashboard.
        </p>
      </header>
      <div> 
        <LoginForm />
      </div>
      <footer className='flex flex-col items-center gap-y-[8px]'>
        <p>Don't have an account? {' '}
          <Link to="/auth/register" className='text-indigo-500 hover:text-indigo-700'>
            Sign Up
          </Link>
        </p>
        <p> Temporary access without registration {' '}
          <Link to="/dashboard" className='text-indigo-500 hover:text-indigo-700'>
            Go to Dashboard
          </Link>
        </p>
        <p>Message from the backend: {message}</p>
      </footer>
    </section>
  )
}