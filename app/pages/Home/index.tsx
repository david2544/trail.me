import React from 'react';
import classnames from 'classnames';
import HikeCard from '@common/HikeCard';
import Container from '@app/common/Container';
import useToggleDarkMode from '@app/hooks/useToggleDarkMode';
import styles from './styles.module.scss';

const Home: React.FC = () => {
  const { isDarkMode } = useToggleDarkMode();

  return (
    <div className={classnames(styles.home, { [styles.darkModeHome]: isDarkMode })}>
      <div className={styles.image} />
      <Container>
        <h1 className={styles.heading}>An archive of past hikes</h1>
        <HikeCard />
        <HikeCard />
        <HikeCard />
        <HikeCard />
        <HikeCard />
        <HikeCard />
        <HikeCard />
        <HikeCard />
        <HikeCard />
        <HikeCard />
        <HikeCard />
      </Container>
    </div>
  );
};

export default Home;
