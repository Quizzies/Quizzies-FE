import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../../store";
import { logout } from "../../../store/features/auth/authSlice";
import OutlineButton from "../../common/buttons/outline-button";
import classes from "./navbar.module.scss";

export const Navbar: React.FC = () => {
  const [bannerTitle, setBannerTitle] = useState("");
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    switch (location.pathname) {
      default:
        setBannerTitle("Dashboard");
    }
  }, [location]);

  return (
    <>
      <header>
        <div className={classes.header}>
          <div className={classes.menuWrap}>
            <h1>Quizzies</h1>
            <div className={classes.menuWrapRight}>
              {userInfo && <p>Hey {userInfo.firstName}</p>}
              <OutlineButton
                value="logout"
                additionalStyles="small"
                onClick={() => dispatch(logout())}
              />
            </div>
          </div>
        </div>
      </header>
      <section id={classes.ProfileBanner}>
        <div className={classes.flexBanner}>
          <h1>{bannerTitle}</h1>
        </div>
      </section>
    </>
  );
};
