import type { ReactNode } from 'react';
import styles from './layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className={styles.container}>
      {children}
    </main>
  );
};