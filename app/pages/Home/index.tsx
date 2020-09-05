import React from 'react';
import classnames from 'classnames';
import HikeCard from '@common/HikeCard';
import Container from '@common/Container';
import useToggleDarkMode from '@hooks/useToggleDarkMode';
import useFetchHikesData from '@hooks/useFetchHikesData';
import styles from './styles.module.scss';

const Home: React.FC = () => {
  const { isDarkMode } = useToggleDarkMode();
  const { hikesData } = useFetchHikesData();

  return (
    <div className={classnames(styles.home, { [styles.darkModeHome]: isDarkMode })}>
      <div className={styles.image} />
      <Container>
        <h1 className={styles.heading}>My past, on the trail.</h1>
        {Object.keys(hikesData).map(hikeData => (
          <HikeCard hikeData={hikesData[hikeData]} />
        ))}
      </Container>
    </div>
  );
};

export default Home;
