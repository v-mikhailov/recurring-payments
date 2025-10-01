import { Routes, Route } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { Layout } from './components/layout/layout';
import { DashboardLayout } from './components/layout/dashboardLayout/DashboardLayout';
import { AuthLayout } from './components/layout/authLayout/AuthLayout';
import { PaymentProvider } from './providers/PaymentsProvider';

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
            <PaymentProvider>
              <DashboardPage />
            </PaymentProvider>
          </DashboardLayout>
        </Layout>
      } />
    </Routes>
  )
}

export default App
