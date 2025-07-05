import { Routes, Route } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/auth/register" element={
        <Layout>
          <RegisterPage />
        </Layout>
      } />
      <Route path="/" element={
        <Layout>
          <LoginPage />
        </Layout>
      } />
    </Routes>
  )
}

export default App
