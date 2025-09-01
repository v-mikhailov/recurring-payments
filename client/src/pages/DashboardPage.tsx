import { Header } from '../components/header/Header';
import { PaymentsTable } from '../components/paymentsTable/PaymentsTable';

import styles from './dashboardPage.module.css';

export const DashboardPage = () => {
  return (
    <section className={styles.container}>
      <Header/>
      <div className={styles.table}>
        <div className={styles.title}>
          <h2>Your Recurring Payments</h2>
          <span>This dashboard displays all your saved recurring payments. You can add new payments, edit existing ones, or delete them as needed. The summary chart provides a visual breakdown of your payments by frequency.</span>
        </div>
        <PaymentsTable/>
      </div>
    </section>
  );
};