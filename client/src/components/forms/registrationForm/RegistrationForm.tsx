import { useId, useState} from 'react';
import styles from './RegistrationForm.module.css';

export const RegistrationForm = () => {
  const formId = useId();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };

  return (
    <form className={styles.base} onSubmit={handleSubmit}>
      <div className={styles['form-group']}>
        <label htmlFor={`${formId}-email`}>Username:</label>
        <input 
          className={styles.input} 
          id={`${formId}-login`} 
          value={formValues.email}
          name="email"
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor={`${formId}-pasword`}>Password:</label>
        <input 
          className={styles.input} 
          id={`${formId}-password`} 
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
        />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor={`${formId}-pasword`}>Confirm password:</label>
        <input 
          className={styles.input} 
          id={`${formId}-confirm-password`} 
          name="confirm password"
          type="password"
          value={formValues.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <button 
        className={styles['submit-button']} 
        type="submit"
      >
        Register
      </button>
    </form>
  )
}