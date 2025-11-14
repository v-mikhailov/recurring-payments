import { useId, useState} from 'react';

export const LoginForm = () => {
  const formId = useId();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
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
    <form  onSubmit={handleSubmit} className='flex flex-col gap-y-[24px]'>
      <div data-tid="form-group" className='flex flex-col justify-start gap-y-[5px] mb-[10px] last:mb-0'>
        <label htmlFor={`${formId}-login`}>Username:</label>
        <input 
          id={`${formId}-login`} 
          value={formValues.email}
          name="email"
          type="text"
          onChange={handleChange}
          data-tid="input"
          className='h-10 border border-slate-200 rounded-sm py-2.5 px-3'
        />
      </div>
      <div data-tid="form-group" className='flex flex-col justify-start gap-y-[5px] mb-[10px] last:mb-0'>
        <label htmlFor={`${formId}-password`}>Password:</label>
        <input 
          id={`${formId}-password`} 
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          data-tid="input"
          className='h-10 border border-slate-200 rounded-sm py-2.5 px-3'
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
      >
        Login
      </button>
    </form>
  )
}