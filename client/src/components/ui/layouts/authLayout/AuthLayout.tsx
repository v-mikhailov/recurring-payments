import type { ReactNode } from 'react';
import styles from './authLayout.module.css';

interface AuthLayout {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayout) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
};