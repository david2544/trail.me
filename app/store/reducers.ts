/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { ApplicationRootState } from '@store/IStore';
import history from '@utils/history';
import ui from '@store/ui/reducers';

export const createReducer = () => {
  const rootReducer = combineReducers<ApplicationRootState>({
    ui: ui,
    router: connectRouter(history),
  });

  return rootReducer;
};
