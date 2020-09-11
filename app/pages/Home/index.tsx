import React from 'react';
import classnames from 'classnames';
import Skeleton from '@material-ui/lab/Skeleton';
import HikeCard from '@common/HikeCard';
import Container from '@common/Container';
import useToggleDarkMode from '@hooks/useToggleDarkMode';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import styles from './styles.module.scss';

const Home: React.FC = () => {
  const { isDarkMode } = useToggleDarkMode();
  const { hikesData, allHikesLoaded } = useInfiniteScroll();

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
        {allHikesLoaded ? (
          <div className={styles.listBottomText}>
            That&apos;s it, you&apos;ve reached the bottom
          </div>
        ) : (
          <div className={styles.skeletonWrapper}>
            <div className={styles.skeletonHeadingWrapper}>
              <div className={styles.skeletonTitle}>
                <Skeleton animation="wave" height={30} width="40%" />
              </div>
              <div className={styles.skeletonIcon}>
                <Skeleton animation="wave" variant="circle" height={25} width={25} />
              </div>
            </div>
            <div className={styles.skeletonMap}>
              <Skeleton animation="wave" width="100%" />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
