import { action } from 'typesafe-actions';
import ActionTypes from '@store/actionTypes';
import { changeLocale } from '.';

describe('LanguageProvider actions', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = action(ActionTypes.CHANGE_LOCALE, 'de');

      expect(changeLocale('de')).toEqual(expected);
    });
  });
});
