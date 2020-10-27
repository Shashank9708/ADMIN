import { forgotConstants } from '../_constants';
/**
 * forgotPass
 *
 * @package                TruckAdmin
 * @subpackage             forgotPass
 * @category               Reducers
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for all state related to User Forgot Password
 */
export function forgotPass(state = {}, action) {
  switch (action.type) {
    case forgotConstants.FORGOT_REQUEST:
      return state;
    case forgotConstants.FORGOT_SUCCESS:
      return { 
        success_message : action.success 
      };
    case forgotConstants.FORGOT_FAILURE:
      return { 
        error_message : action.error
      };
    default:
      return state
  }
}
