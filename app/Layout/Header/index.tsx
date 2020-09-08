import React from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';
import classnames from 'classnames';
import useScroll from '@app/hooks/useScroll';
import DarkModeToggle from 'react-dark-mode-toggle';
import useToggleDarkMode from '@app/hooks/useToggleDarkMode';
import { LINKS } from '@utils/constants';
import Container from '@common/Container';
import LogoWhite from '@images/logo-white.png';
import LogoBlack from '@images/logo-black.png';
import SubNav from './SubNav';
import styles from './styles.module.scss';

interface HeaderProps {
  history: History;
  toggleMenu: Function;
  menuOpen: boolean;
}

const subMenuItem = {
  transfer: [
    { link: LINKS.contact, description: 'Contact' },
    { link: LINKS.imprint, description: 'Impressum' },
  ],
};

const Header: React.FC<HeaderProps> = ({ toggleMenu, menuOpen }) => {
  const { isDarkMode, toggleDarkMode } = useToggleDarkMode();

  const { scrollPosition } = useScroll();

  return (
    <div
      className={classnames(styles.mainHeaderNav, {
        [styles.menuOpen]: menuOpen,
        [styles.darkModeHeader]: isDarkMode,
      })}
    >
      <div
        className={classnames(styles.logoContainer, {
          [styles.minimizedLogoContainer]: scrollPosition > 100,
        })}
      >
        <Container>
          <div
            className={classnames(styles.logoBox, {
              [styles.minimized]: scrollPosition > 100,
            })}
          >
            <Link to={LINKS.home}>
              <div className={styles.logoWrapper}>
                <img
                  alt="fairr-logo"
                  className={styles.logo}
                  src={isDarkMode ? LogoWhite : LogoBlack}
                />
              </div>
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
          <li className={styles.menuItemWrapper}>
            <Link to={LINKS.uploadHike} className={styles.menuItem}>
              Upload new hike
            </Link>
          </li>
          <li className={styles.menuItemWrapper}>
            <Link to={LINKS.uploadHike} className={styles.menuItem}>
              About
            </Link>
          </li>
          <li
            className={classnames(styles.menuItemWrapper, {
              [styles.active]: true,
            })}
          >
            <span className={styles.menuItem}>More</span>
            <div className={styles.subNav}>
              <ul>
                {subMenuItem.transfer.map(item => (
                  <SubNav key={item.description} subMenuItem={item} />
                ))}
              </ul>
            </div>
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
