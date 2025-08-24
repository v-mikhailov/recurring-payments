import React from 'react';
import { Header } from '../components/header/Header';
import { PaymentsTable } from '../components/paymentsTable/PaymentsTable';

export const DashboardPage = () => {
  return (
    <div>
      <Header/>
      <PaymentsTable/>
    </div>
  );
};