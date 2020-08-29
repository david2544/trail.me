import React from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';
import classnames from 'classnames';
import useScroll from '@app/hooks/useScroll';
import DarkModeToggle from 'react-dark-mode-toggle';
import useToggleDarkMode from '@app/hooks/useToggleDarkMode';
import { LINKS } from '@utils/constants';
import Container from '@common/Container';
import Logo from '@images/logo.png';
import { isMenuItemActive } from '../utils';
import styles from './styles.module.scss';

interface HeaderProps {
  history: History;
  toggleMenu: Function;
  menuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({
  history: {
    location: { pathname },
  },
  toggleMenu,
  menuOpen,
}) => {
  const { isDarkMode, toggleDarkMode } = useToggleDarkMode();

  const { scrollPosition } = useScroll();

  return (
    <div
      className={classnames(styles.mainHeaderNav, {
        [styles.menuOpen]: menuOpen,
        [styles.darkModeHeader]: isDarkMode,
      })}
    >
      <div className={styles.logoContainer}>
        <Container>
          <div
            className={classnames(styles.logoWrapper, {
              [styles.minimized]: scrollPosition > 200,
            })}
          >
            <Link to={LINKS.home}>
              <img alt="fairr-logo" className={styles.logo} src={Logo} />
            </Link>
          </div>
          <button
            type="button"
            tabIndex={0}
            onClick={() => toggleMenu(!menuOpen)}
            className={styles.burgerMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </Container>
      </div>

      <nav className={classnames('container', styles.navContainer)}>
        <ul className={styles.menuWrapper}>
          <li
            className={classnames(styles.menuItemWrapper, {
              [styles.active]: isMenuItemActive.isOnTransferPages(pathname),
            })}
          >
            {/* <Link to={LINKS.switch.general} className={styles.menuItem}>
              navi.main.transfer
            </Link>
            <div className={styles.subNav}>
              <ul>
                {subHeaderItems.transfer.map(item => (
                  <SubNav key={item.description} subMenuItem={item} />
                ))}
              </ul>
            </div> */}
          </li>
          <li
            className={classnames(styles.menuItemWrapper, {
              [styles.active]: isMenuItemActive.isOnSecurityPage(pathname),
            })}
          >
            {/* <Link to={LINKS.security} className={styles.menuItem}>
              about
            </Link> */}
          </li>
          <li className={styles.menuItemWrapper}>
            <div className={`${styles.menuItem} ${styles.darkModeToggle}`}>
              <DarkModeToggle onChange={toggleDarkMode} checked={isDarkMode} size={60} />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
