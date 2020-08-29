import ActionTypes from '@store/actionTypes';
import { action } from 'typesafe-actions';

const changeTheme = (darkMode: boolean) => action(ActionTypes.CHANGE_DARK_MODE, darkMode);

// eslint-disable-next-line import/prefer-default-export
export { changeTheme };
