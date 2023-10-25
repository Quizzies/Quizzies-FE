import { useState } from 'react'
import classes from './navbar.module.scss'
import Image from '../../common/image';

export const Navbar: React.FC = () => {
  const [data, setData] = useState<any>();

  function renderNavContent() {
    if (data?.profile) {
      return (
        <>
          {/* <Link to='/notifications'>
            <img src="/img/bell.png" alt="notificaciones" />
          </Link>
          <Link to='/messages'>
            <img src="/img/message.png" alt="messages" />
          </Link> */}

          <img src="/img/3.png" alt="notificaciones" />
        </>
      )
    }
  }

  return (
    <header>
    <div className={classes.header}>
      <div data-testid="header-container">
        <div className={classes.menuWrap}>
          <Image
            style="centered-img"
            src="/img/trilce.jpg"
            alt="Logo"
            size={60}
            additionalStyles="my-0"
            goToOnClick="/"
          />
        </div>

        <nav className={classes.nav}>
          <ul className={classes.menu}>{renderNavContent()}</ul>
        </nav>
      </div>
    </div>
  </header>
  )
}
