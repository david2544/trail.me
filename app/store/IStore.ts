import { RouterState } from 'connected-react-router';
import { UIState } from '@store/ui/actions/types';

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly router: RouterState;
  readonly ui: UIState;
}
