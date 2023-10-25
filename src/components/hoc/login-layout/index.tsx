import { PropsChild } from "../../../ts/interfaces/app-interfaces";
import Image from "../../common/image";
import styles from "./layout.module.scss";

const LoginLayout: React.FC<PropsChild> = (props) => (
  <>
    <div className={styles["heading-section"]}>
      <h1>Quizzies</h1>
      <p>Quizzes made easy</p>
    </div>
    <br />
    <Image
      style="centered-img"
      src="/img/logo.png"
      alt="Logo"
      additionalStyles="my-0"
      goToOnClick="/"
    />
    
    <main>{props.children}</main>
  </>
);

export default LoginLayout;
