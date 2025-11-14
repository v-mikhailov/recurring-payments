import { useId, useState} from 'react';

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
    <form className="flex flex-col gap-y-[24px]" onSubmit={handleSubmit}>
      <div className='flex flex-col justify-start gap-y-[5px] mb-2.5 last:mb-0'>
        <label htmlFor={`${formId}-email`}>Username:</label>
        <input 
          className='h-10 border border-slate-200 rounded-sm py-2.5 px-3'
          id={`${formId}-login`} 
          value={formValues.email}
          name="email"
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className='flex flex-col justify-start gap-y-[5px] mb-2.5 last:mb-0'>
        <label htmlFor={`${formId}-pasword`}>Password:</label>
        <input 
          className='h-10 border border-slate-200 rounded-sm py-2.5 px-3'
          id={`${formId}-password`} 
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
        />
      </div>
      <div className='flex flex-col justify-start gap-y-[5px] mb-2.5 last:mb-0'>
        <label htmlFor={`${formId}-pasword`}>Confirm password:</label>
        <input
          className='h-10 border border-slate-200 rounded-sm py-2.5 px-3'
          id={`${formId}-confirm-password`} 
          name="confirm password"
          type="password"
          value={formValues.confirmPassword}
          onChange={handleChange}
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
        Register
      </button>
    </form>
  )
}