import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import HikeCard from '@common/HikeCard';
import Container from '@app/common/Container';
import Firebase from 'firebase';
import useToggleDarkMode from '@app/hooks/useToggleDarkMode';
import styles from './styles.module.scss';

const Home: React.FC = () => {
  const { isDarkMode } = useToggleDarkMode();
  const [hikesData, setHikesData] = useState({});

  useEffect(() => {
    const ref = Firebase.database().ref();

    ref.on('value', snapshot => {
      setHikesData(snapshot.val().hikeEntries);
    });
  }, []);

  return (
    <div className={classnames(styles.home, { [styles.darkModeHome]: isDarkMode })}>
      <div className={styles.image} />
      <Container>
        <h1 className={styles.heading}>An archive of past hikes</h1>
        {Object.keys(hikesData).map(hikeData => (
          <HikeCard hikeData={hikesData[hikeData]} />
        ))}
      </Container>
    </div>
  );
};

export default Home;
