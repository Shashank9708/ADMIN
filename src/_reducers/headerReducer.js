import { headerConstants } from '../_constants';
/**
* headerReducer
*
* @package                ARKAdmin
* @subpackage             headerReducer
* @category               Reducers
* @DateOfCreation         22 May 2018
* @ShortDescription       This is responsible for all state related to Header actions
*/
export function headerReducer(state = {is_logout_done: false}, action) {
switch (action.type) {
  case headerConstants.LOGOUT_SUCCESS:
	return { 
		is_logout_done : true, 
		success_message : action.success 
	};
  case headerConstants.LOGOUT_FAILURE:
	return { 
		is_logout_done : false, 
		error_message : action.error 
	};  
  default:
	return state
	}
}
