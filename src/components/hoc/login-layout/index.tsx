import { useSelector } from "react-redux";
import { PropsChild } from "../../../ts/interfaces/app-interfaces";
import { AuthState } from "../../../ts/types/app-state-types";
import Image from "../../common/image";
import Spinner from "../../common/spinner";
import styles from "./layout.module.scss";

const LoginLayout: React.FC<PropsChild> = (props) => {
  const { loading } = useSelector<
    {
      auth: AuthState;
    },
    AuthState
  >((state) => state.auth);

  return (
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
      { loading && <Spinner type="spinner"/> }
    </>
  );
};

export default LoginLayout;
