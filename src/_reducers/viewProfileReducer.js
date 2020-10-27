import { ViewProfileConstants, configConstants } from '../_constants';
/**
 * viewProfileReducer
 *
 * @package                TruckAdmin
 * @subpackage             viewProfileReducer
 * @category               Reducers
 * @DateOfCreation         19 Mar 2019
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
};
export function viewProfileReducer(state = initialState, action) {
    switch (action.type) {
        
        // Fetch Reducer's
        case ViewProfileConstants.VIEWPROFILE_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case ViewProfileConstants.VIEWPROFILE_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            polyline        : action.result,
            errorMsg           : false ,
            is_loaded         :true
          };
        case ViewProfileConstants.VIEWPROFILE_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error
          };
        case ViewProfileConstants.VIEWPROFILE_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        case ViewProfileConstants.VIEWPROFILE_RESET_STATE:
          return {
              ...state,
              sendingRequest  : false, 
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              closeForm       : false              
           };
        case configConstants.UNAUTHENTICATE:
          return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
          } 
        default:
            return state
    }
}