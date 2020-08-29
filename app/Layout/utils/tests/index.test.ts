import { LINKS } from '@app/utils/constants';
import { isMenuItemActive } from '../index';

describe('LayoutUtils', () => {
  it('should return true only when on products pages', () => {
    expect(isMenuItemActive.isOnProductsPages(LINKS.products.riester.plp)).toBeTruthy();
    expect(isMenuItemActive.isOnProductsPages(LINKS.products.ruerup.plp)).toBeTruthy();
    expect(isMenuItemActive.isOnProductsPages(LINKS.products.bav.plp)).toBeTruthy();
    expect(isMenuItemActive.isOnProductsPages(LINKS.products.robo.plp)).toBeTruthy();
  });

  it('should return false on other pages', () => {
    expect(isMenuItemActive.isOnProductsPages(LINKS.home)).toBeFalsy();
  });

  it('should return true only when on transfer pages', () => {
    expect(isMenuItemActive.isOnTransferPages(LINKS.switch.general)).toBeTruthy();
    expect(isMenuItemActive.isOnTransferPages(LINKS.switch.riester)).toBeTruthy();
    expect(isMenuItemActive.isOnTransferPages(LINKS.switch.ruerup)).toBeTruthy();
  });

  it('should return false on other pages', () => {
    expect(isMenuItemActive.isOnTransferPages(LINKS.home)).toBeFalsy();
  });

  it('should return true only when on products pages', () => {
    expect(isMenuItemActive.isOnSecurityPage(LINKS.security)).toBeTruthy();
  });

  it('should return false on other pages', () => {
    expect(isMenuItemActive.isOnSecurityPage(LINKS.home)).toBeFalsy();
  });
});
