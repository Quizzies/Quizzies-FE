import React from "react";
import { PropsChild } from "../../../ts/interfaces/app-interfaces";
import Footer from "../../embedded-layout/footer";
import { Navbar } from "../navbar";
import styles from './layout.module.scss';

export const MainLayout: React.FC<PropsChild> = (props) => {
  return (
    <>
      <Navbar />
      <main className={styles.content}>{props.children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
