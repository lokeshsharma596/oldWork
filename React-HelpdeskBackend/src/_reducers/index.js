import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { toogle } from './toogle.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  toogle
});

export default rootReducer;