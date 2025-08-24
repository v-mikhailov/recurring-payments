import styles from './header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <span>Header </span>
      <span> add new payment</span>
      <span> Logout</span>
    </header>
  );
}