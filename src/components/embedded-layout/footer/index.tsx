import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Quizzies</p>
      <p>© 2023 Quizzies, all rights reserved</p>
    </footer>
  );
};

export default Footer;
