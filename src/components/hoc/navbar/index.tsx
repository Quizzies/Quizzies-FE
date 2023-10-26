import { useSelector } from "react-redux";
import { User } from "../../../domain/models";
import classes from "./navbar.module.scss";

export const Navbar: React.FC = () => {
  const { userInfo } = useSelector<
    {
      auth: User;
    },
    User
  >((state) => state.auth);

  return (
    <header>
      <div className={classes.header}>
        <div className={classes.menuWrap}>
          <h1>Quizzies</h1>
          <div className={classes.menuWrapRight}>
            <p>Hey {userInfo?.firstName}</p>
            <img src="/img/3.png" width={35} height={35} alt="me" />
          </div>
        </div>
      </div>
    </header>
  );
};
