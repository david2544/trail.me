import ActionTypes from '@store/actionTypes';
import themeProviderReducer from '.';

describe('themeProviderReducer', () => {
  it('returns the initial state', () => {
    expect(themeProviderReducer(undefined, {} as any)).toEqual({
      darkMode: false,
    });
  });

  it('changes the locale', () => {
    expect(
      themeProviderReducer(undefined, {
        type: ActionTypes.CHANGE_DARK_MODE,
        payload: true,
      }),
    ).toEqual({
      darkMode: true,
    });
  });
});
