import { ApplicationRootState } from '@store/IStore';
import { initialState } from '../reducers';

/**
 * Direct selector to the languageToggle state domain
 */
const uiState = (state: ApplicationRootState) => state.ui || initialState;

export { uiState };
