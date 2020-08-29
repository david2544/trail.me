import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface SubNavProps {
  subMenuItem: {
    link: string;
    title?: string;
    titleSub?: string;
    icon?: string;
    description: string;
    isExternal?: boolean;
  };
}

const SubNav: React.FC<SubNavProps> = ({ subMenuItem }) =>
  subMenuItem.isExternal ? (
    <li className={styles.subNavExternal}>
      <div className={styles.subNavItem}>
        <a
          href={subMenuItem.link}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.menuTitle}>
            <div className={styles.menuTitleMain}>{subMenuItem.title}</div>
            <div className={styles.menuTitleSub}>{subMenuItem.titleSub}</div>
          </div>
          <div className={styles.menuDescription}>{subMenuItem.description}</div>
        </a>
      </div>
    </li>
  ) : (
    <li className={styles.subNavItem}>
      <Link to={subMenuItem.link} className={styles.link}>
        <div className={styles.menuTitle}>{subMenuItem.title}</div>
        <div
          className={classnames(styles.menuDescription, {
            [styles.menuDescriptionSpacing]: !!subMenuItem.title,
          })}
        >
          {subMenuItem.description}
        </div>
      </Link>
    </li>
  );

export default SubNav;
