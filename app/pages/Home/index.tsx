import React, { useState } from 'react';
import useToggleLocale from '@app/hooks/useToggleLocale';
import styles from './styles.module.scss';

const Home: React.FC = () => {
  const [hovered, setHovered] = useState('');
  const { locale, toggleLocale } = useToggleLocale();

  return (
    <div className={styles.home}>
      <div data-language={locale} data-lang-hover={hovered}>
        <div className={styles.langSelection} />
        <a
          role="button"
          tabIndex={0}
          onClick={() => toggleLocale('de')}
          onMouseEnter={() => setHovered('de')}
          onMouseLeave={() => setHovered(locale)}
          data-lang="de"
          data-active={locale === 'de'}
        >
          de
        </a>
        <a
          role="button"
          tabIndex={0}
          onClick={() => toggleLocale('en')}
          onMouseEnter={() => setHovered('en')}
          onMouseLeave={() => setHovered(locale)}
          data-lang="en"
          data-active={locale === 'en'}
        >
          en
        </a>
      </div>
    </div>
  );
};

export default Home;
