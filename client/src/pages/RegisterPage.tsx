import { Link } from 'react-router-dom';
import { RegistrationForm } from '../components/forms/RegistrationForm';


export const RegisterPage = () => {
  return (
    <section className='flex flex-col gap-y-[30px]'>
      <header className='flex flex-col items-center gap-y-[8px]'>
        <h1 className='text-2xl'>Create Account</h1>
        <p className='text-center'>Sign up to start tracking your payments. This allows you to save, view, and manage all your subscriptions and bills in one place.</p>
      </header>
        <RegistrationForm/>
        <footer className='flex flex-col items-center gap-y-[8px]'>
          <p>
            Alrady have an account?{' '}
            <Link to="/" className='text-indigo-500 hover:text-indigo-700'>
              Sign in
            </Link>
          </p>
      </footer>
    </section>
  )
}