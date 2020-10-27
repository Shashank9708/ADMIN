import { loginConstants } from '../_constants';
/**
 * userLogin
 *
 * @package                TruckAdmin
 * @subpackage             userLogin
 * @category               Reducers
 * @DateOfCreation         10 May 2018
 * @ShortDescription       This is responsible for all state related to User login
 */
export function userLogin(state = {submitted: false}, action) {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return { 
        submitted: true 
      };
    case loginConstants.LOGIN_SUCCESS:
      return { 
        submitted: false, 
        is_login_done : true
      };
    case loginConstants.LOGIN_FAILURE:
      return { 
        submitted: false,
        error_message : action.error
      };
    case loginConstants.LOGOUT_SUCCESS:
      return { 
        submitted: false, 
        is_logout_done : true, 
        success_message : action.success 
      };
    case loginConstants.LOGOUT_FAILURE:
      return { 
        submitted: false, 
        is_logout_done : false, 
        error_message : action.error 
      };
    case loginConstants.LOGIN_UPDATE_STATE:
      return {
        ...state,
        error_message      : false,
        submitted     : false,
      }
    default:
      return state
  }
}
