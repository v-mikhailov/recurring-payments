import type { ReactNode } from 'react';
import styles from './dashboardLayout.module.css';

interface DashboardLayout {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayout) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};