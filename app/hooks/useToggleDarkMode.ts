import { useSelector, useDispatch } from 'react-redux';
import { uiState } from '@store/ui/selectors';
import { changeTheme } from '@store/ui/actions';

const useToggleDarkMode = () => {
  const dispatch = useDispatch();
  const { darkMode: isDarkMode } = useSelector(uiState);

  const toggleDarkMode = (themeStatus: boolean) => dispatch(changeTheme(themeStatus));

  return { isDarkMode, toggleDarkMode };
};

export default useToggleDarkMode;
