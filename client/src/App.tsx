import { Routes, Route, Outlet } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { Layout } from './components/layout/layout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { PaymentProvider } from './providers/payment/PaymentsProvider';
import { AuthProvider } from './providers/auth/AuthProvider';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}></Route>

        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={
            <DashboardLayout>
                <PaymentProvider>
                  <Outlet /> 
                </PaymentProvider>
            </DashboardLayout>
          }>
            <Route path="/dashboard" element={<DashboardPage />}/>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
