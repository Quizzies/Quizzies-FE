import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p> Trilce</p>
      <p>© 2020 Trilce, todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;
