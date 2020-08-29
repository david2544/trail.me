export const PRODUCTS = {
  riester: 'riester',
  ruerup: 'ruerup',
  bav: 'bav',
  robo: 'robo',
  general: 'general',
};

export const FAIRR_PRODUCTS = {
  riester: 'fairriester',
  ruerup: 'fairruerup',
  bav: 'fairrbav',
  robo: 'fairrobo',
};

// WIP here. Links will probably be handled differently
export const LINKS = {
  home: '',
  cockpit: '/cockpit',
  security: '/security',
  switch: {
    general: '/change',
    riester: '/change/riester',
    ruerup: '/change/ruerup',
  },
  products: {
    riester: {
      plp: '/products/fairriester',
      calculator: '/products/fairriester/calculator',
    },
    ruerup: {
      plp: '/products/fairruerup',
      calculator: '/products/fairruerup/calculator',
    },
    bav: {
      plp: '/products/fairrbav',
    },
    robo: {
      plp: '/products/fairrobo',
    },
    raisin: {
      savings: 'https://www.weltsparen.de/tagesgeld/',
      term: 'https://www.weltsparen.de/tagesgeld/',
    },
  },
};

export const LOCALES = {
  de: 'de',
  en: 'en',
};

export const ALL = 'all';
