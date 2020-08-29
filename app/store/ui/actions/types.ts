import { ActionType } from 'typesafe-actions';
import * as actions from '@store/ui/actions';

/* --- STATE --- */
interface UIState {
  readonly locale: string;
}

/* --- ACTIONS --- */
type UIActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
export { UIActions, UIState };
