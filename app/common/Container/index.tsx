import React from 'react';
import styles from './styles.module.scss';

interface IContainer {
  className?: string;
}

const Container: React.FC<IContainer> = ({ children, className }) => (
  <div className={`container ${styles.container} ${className}`}>{children}</div>
);

export default Container;
