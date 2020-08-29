import { uiState } from '@store/ui/selectors';
import { initialState } from '../reducers';

describe('uiState', () => {
  it('should select the language state', () => {
    const languageState = {};
    const mockedState: any = {
      ui: languageState,
    };

    expect(uiState(mockedState)).toEqual(languageState);
  });

  it('should select the initial state when state is missing', () => {
    const mockedState: any = {};

    expect(uiState(mockedState)).toEqual(initialState);
  });
});
