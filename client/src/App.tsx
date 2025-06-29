import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('api/v1/ping')
    .then((res) => res.json())
    .then((data) => setMessage(data.message))
    .catch((error) => console.error('Error fetching message:', error));
  }) 


  return (
    <div>
      <h1>Recurring Payments Tracker</h1>
      <p>My frontend works</p>
      <p>Message from the backend: {message}</p>
  
    </div>
  )
}

export default App
