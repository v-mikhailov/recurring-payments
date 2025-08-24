import { Routes, Route } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { Layout } from './components/ui/layouts/layout';
import { AuthLayout } from './components/ui/layouts/authLayout/AuthLayout';
import { DashboardLayout } from './components/ui/layouts/dashboardLayout/DashboardLayout';

function App() {
  return (
    <Routes>
      <Route path="/auth/register" element={
        <Layout>
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        </Layout>
      } />
      <Route path="/" element={
        <Layout>
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        </Layout>
      } />
      <Route path="/dashboard" element={
        <Layout> 
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        </Layout>
      } />
    </Routes>
  )
}

export default App
