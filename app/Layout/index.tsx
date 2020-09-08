import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import useOnClickOutside from '@app/hooks/useClickOutside';
import useToggleDarkMode from '@app/hooks/useToggleDarkMode';
import Header from './Header';
import styles from './styles.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const history = useHistory();
  const { isDarkMode } = useToggleDarkMode();
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef<HTMLInputElement>(null);
  // State for our modal
  const [menuOpen, toggleMenu] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => toggleMenu(false));

  history.listen(() => {
    if (menuOpen) {
      toggleMenu(false);
    }
  });

  return (
    <div className={styles.appContainer}>
      <div className={classnames({ [styles.menuOpen]: menuOpen })}>
        <div className={classnames({ [styles.headerWrapper]: isDarkMode })} ref={ref}>
          <Header history={history} toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>
        {menuOpen && <div className={styles.menuSidebarActive} />}
      </div>
      <div className={classnames(styles.bodyContainer, { [styles.bodyDarkMode]: isDarkMode })}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
