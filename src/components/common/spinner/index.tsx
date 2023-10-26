import React from "react";
import styles from "./spinner.module.scss";
import { ISpinner } from "../../../ts/interfaces/spinner-interfaces";

const Spinner: React.FC<ISpinner> = (props) => (
  <>
    <div
      className={
        props.type === "spinner-replace"
          ? styles.spinnerReplace
          : styles.spinner
      }
    />
    <div className={styles.backdrop}></div>
  </>
);

export default Spinner;
