import { LINKS, FAIRR_PRODUCTS } from '@utils/constants';

export const isMenuItemActive = {
  isOnProductsPages: (pathname: string) =>
    Object.keys(LINKS.products).some((key: string) => LINKS.products[key].plp === pathname),
  isOnTransferPages: (pathname: string) => Object.values(LINKS.switch).includes(pathname),
  isOnSecurityPage: (pathname: string) => LINKS.security === pathname,
};

export const subHeaderItems = {
  products: [
    {
      link: LINKS.products.riester.plp,
      title: FAIRR_PRODUCTS.riester,
      icon: 'TODO',
      description: 'navi.main.products.riester.description',
    },
    {
      link: LINKS.products.ruerup.plp,
      title: FAIRR_PRODUCTS.ruerup,
      icon: 'TODO',
      description: 'navi.main.products.ruerup.description',
    },
    {
      link: LINKS.products.bav.plp,
      title: FAIRR_PRODUCTS.bav,
      icon: 'TODO',
      description: 'navi.main.products.bav.description',
    },
    {
      link: LINKS.products.robo.plp,
      title: FAIRR_PRODUCTS.robo,
      icon: 'TODO',
      description: 'navi.main.products.robo.description',
    },
    {
      link: LINKS.products.raisin.savings,
      title: 'navi.external.savings-account',
      titleSub: 'navi.external.by-weltsparen',
      description: 'navi.external.savings-account.description',
      isExternal: true,
    },
    {
      link: LINKS.products.raisin.term,
      title: 'navi.external.term-deposit',
      titleSub: 'navi.external.by-weltsparen',
      description: 'navi.external.term-deposit.description',
      isExternal: true,
    },
  ],
  transfer: [
    { link: LINKS.switch.riester, description: 'navi.main.transfer.riester' },
    { link: LINKS.switch.ruerup, description: 'navi.main.transfer.ruerup' },
  ],
};
