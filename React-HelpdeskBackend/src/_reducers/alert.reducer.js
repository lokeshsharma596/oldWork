import { alertConstants } from '../_constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
      case alertConstants.API:
        return {
          type: 'api',
          message: action.message
        };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}