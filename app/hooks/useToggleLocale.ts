import { useSelector, useDispatch } from 'react-redux';
import { uiState } from '@store/ui/selectors';
import { changeLocale } from '@store/ui/actions';

const useToggleLocale = () => {
  const dispatch = useDispatch();
  const { locale } = useSelector(uiState);

  const toggleLocale = (newLocale: string) => dispatch(changeLocale(newLocale));

  return { locale, toggleLocale };
};

export default useToggleLocale;
