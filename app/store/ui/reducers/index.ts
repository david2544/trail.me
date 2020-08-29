import ActionTypes from '@store/actionTypes';
import { UIActions, UIState } from '@store/ui/actions/types';

export const initialState: UIState = {
  darkMode: true,
};

export default (state: UIState = initialState, action: UIActions): UIState => {
  switch (action.type) {
    case ActionTypes.CHANGE_DARK_MODE:
      return {
        darkMode: action.payload,
      };
    default:
      return state;
  }
};
