import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <div>
      <h1>Create Account</h1>
      <p>Sign up to start tracking your payments. This allows you to save, view, and manage all your subscriptions and bills in one place.</p>
      Страница регистрации
      <p> 
        Alrady have an account?{' '}
        <Link to="/">
          Sign in
        </Link>
      </p>
    </div>
  )
}