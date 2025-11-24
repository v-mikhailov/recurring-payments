import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [formState, setFormState] = useState({
    login: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formState);
  };

  return (
    <form  onSubmit={handleSubmit} className='flex flex-col gap-y-[24px]'>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}
      <div data-tid="form-group" className='flex flex-col justify-start gap-y-[5px] mb-[10px] last:mb-0'>
        <label htmlFor='login'>Username:</label>
        <input 
          id='login'
          value={formState.login}
          name="login"
          type="text"
          onChange={handleChange}
          disabled={loading}
          data-tid="input"
          className='h-10 border border-slate-200 rounded-sm py-2.5 px-3 disabled:opacity-50'
          required
        />
      </div>
      <div data-tid="form-group" className='flex flex-col justify-start gap-y-[5px] mb-[10px] last:mb-0'>
        <label htmlFor='passwor'>Password:</label>
        <input 
          id='password'
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          data-tid="input"
          className='h-10 border border-slate-200 rounded-sm py-2.5 px-3 disabled:opacity-50'
          required
        />
      </div>
      <button 
        data-tid="submit-button"
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
        type="submit"
        disabled={loading}
      >
       {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}