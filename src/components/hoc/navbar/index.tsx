import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { User } from "../../../domain/models";
import classes from "./navbar.module.scss";
import { useEffect, useState } from "react";

export const Navbar: React.FC = () => {
  const [bannerTitle, setBannerTitle] = useState('')
  const { userInfo } = useSelector<
    {
      auth: User;
    },
    User
  >((state) => state.auth);

  const location = useLocation();

  useEffect(() => {
    switch(location.pathname) {
      default: setBannerTitle('Dashboard');
    }
  }, [location])


  return (
    <>
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
      <section id={classes.ProfileBanner}>
        <div className={classes.flexBanner}>
          <h1>{bannerTitle}</h1>
        </div>
      </section>
    </>
  );
};
