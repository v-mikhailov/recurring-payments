import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const RegistrationForm = () => {
  const { register, loading, error } = useAuth();

  const [formState, setFormState] = useState({
    login: '',
    password: '',
    confirmPassword: '',
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validationError) setValidationError(null);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    await register({
      login: formState.login,
      password: formState.password,
    });
  };

  return (
    <form className="flex flex-col gap-y-[24px]" onSubmit={handleSubmit}>
      {(error || validationError) && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
          {validationError || error}
        </div>
      )}

      <div className='flex flex-col justify-start gap-y-[5px] mb-2.5 last:mb-0'>
        <label htmlFor='login'>Username:</label>
        <input 
          className='h-10 border border-slate-200 rounded-sm py-2.5 px-3 disabled:opacity-50'
          id='login' 
          value={formState.login}
          name="login"
          type="text"
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>
      <div className='flex flex-col justify-start gap-y-[5px] mb-2.5 last:mb-0'>
        <label htmlFor='pasword'>Password:</label>
        <input 
          className='h-10 border border-slate-200 rounded-sm py-2.5 px-3 disabled:opacity-50'
          id='password' 
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>
      <div className='flex flex-col justify-start gap-y-[5px] mb-2.5 last:mb-0'>
        <label htmlFor='confirmPassword'>Confirm password:</label>
        <input
          className='h-10 border border-slate-200 rounded-sm py-2.5 px-3 disabled:opacity-50'
          id='confirmPassword'
          name="confirmPassword"
          type="password"
          value={formState.confirmPassword}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>
      <button 
        type="submit"
        className="
        bg-indigo-600
        hover:bg-indigo-700
        focus:outline-2
        focus:outline-indigo-500
        focus:outline-offset
        active:bg-indigo-900
        disabled:bg-gray-400
        disabled:cursor-not-allowed
        text-white
        font-medium
        px-4 py-2
        rounded
       "
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}