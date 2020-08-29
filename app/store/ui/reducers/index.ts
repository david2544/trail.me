import ActionTypes from '@store/actionTypes';
import { UIActions, UIState } from '@store/ui/actions/types';

const DEFAULT_LOCALE = 'en';

export const initialState: UIState = {
  locale: DEFAULT_LOCALE,
};

export default (state: UIState = initialState, action: UIActions): UIState => {
  switch (action.type) {
    case ActionTypes.CHANGE_LOCALE:
      return {
        locale: action.payload,
      };
    default:
      return state;
  }
};
