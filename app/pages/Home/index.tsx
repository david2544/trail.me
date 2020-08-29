import React from 'react';
import HeaderBackground from '@images/HeaderBackground.jpg';
import HikeCard from '@common/HikeCard';
import styles from './styles.module.scss';

const Home: React.FC = () => (
  <div className={styles.home}>
    <img className={styles.image} alt="header background" src={HeaderBackground} />
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
  </div>
);

export default Home;
