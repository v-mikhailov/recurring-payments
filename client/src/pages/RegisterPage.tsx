import { Link } from 'react-router-dom';
import { RegistrationForm } from '../components/forms/registrationForm/RegistrationForm';
import styles from './registerPage.module.css';

export const RegisterPage = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>Create Account</h1>
        <p className={styles.subtitle}>Sign up to start tracking your payments. This allows you to save, view, and manage all your subscriptions and bills in one place.</p>
      </header>
        <RegistrationForm/>
        <footer>
          Alrady have an account?{' '}
          <Link to="/">
            Sign in
          </Link>
      </footer>
    </section>
  )
}