import type { ReactNode } from 'react';
import styles from './authLayout.module.css'

interface AuthLayout {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayout) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
};