import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import HikeCard from '@common/HikeCard';
import Container from '@common/Container';
import useToggleDarkMode from '@hooks/useToggleDarkMode';
import useFetchHikesData from '@hooks/useFetchHikesData';
import useScroll from '@hooks/useScroll';
import styles from './styles.module.scss';

const loadMoreData = ({
  hikesData,
  setHikesData,
  listPos,
  fetchNewData,
  setListPos,
  setIsFetching,
}) => {
  setTimeout(() => {
    const listPosition = (Number(Object.keys(hikesData).sort()[0]) - 1).toString();
    fetchNewData(hikesData, setHikesData, listPosition);
    setListPos(listPos);
    setIsFetching(false);
  }, 1000);
};

const Home: React.FC = () => {
  const { isDarkMode } = useToggleDarkMode();
  const [listPos, setListPos] = useState('9999999999999');
  const { hikesData, setHikesData, fetchNewData } = useFetchHikesData();
  const [isFetching, setIsFetching] = useState(false);
  const { scrollPosition } = useScroll();

  if (
    window.innerHeight + scrollPosition >= document.body.scrollHeight &&
    !isEmpty(hikesData) &&
    scrollPosition !== 0 &&
    !isFetching
  ) {
    setIsFetching(true);
  }

  useEffect(() => {
    if (!isFetching) return;
    loadMoreData({ hikesData, setHikesData, listPos, fetchNewData, setListPos, setIsFetching });
  }, [isFetching]);

  return (
    <div className={classnames(styles.home, { [styles.darkModeHome]: isDarkMode })}>
      <div className={styles.image} />
      <Container>
        <h1 className={styles.heading}>My past, on the trail.</h1>
        {Object.keys(hikesData)
          .sort()
          .reverse()
          .map(hikeKey => (
            <HikeCard key={hikeKey} hikeData={hikesData[hikeKey]} />
          ))}
        <div className={styles.loadMoreButton}></div>
      </Container>
    </div>
  );
};

export default Home;
