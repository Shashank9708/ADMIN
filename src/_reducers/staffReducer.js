import { staffConstants, configConstants } from '../_constants';
/**
 * staffReducer
 *
 * @package                ARKAdmin
 * @subpackage             staffReducer
 * @category               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    staffList     : [],
    managerList     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    success     : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    is_Manager_loaded        : false,
    detail          : {},
};
export function staffReducer(state = initialState, action) {
    switch (action.type) {
        
        // Fetch Reducer's
        case staffConstants.STAFF_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case staffConstants.STAFF_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            staffList        : action.result,
            errorMsg           : false ,
            pages               : action.result.pages,
            is_loaded         :true
          };
        case staffConstants.STAFF_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error
          };

        // Fetch Reducer's
        case staffConstants.MANAGER_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_Manager_loaded:false
          };
        case staffConstants.MANAGER_FETCH_SUCCESS:
          return { 
            ...state,
            managerList        : action.result,
            is_Manager_loaded         :true
          };
        case staffConstants.MANAGER_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error,
            is_Manager_loaded:false
          };

        // Fetch Reducer's
        case staffConstants.MANAGER_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case staffConstants.MANAGER_SAVE_SUCCESS:
          return { 
            ...state,
            success        : action.result,
            is_loaded         :true
          };
        case staffConstants.MANAGER_SAVE_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error
          };


        case staffConstants.STAFF_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        case staffConstants.STAFF_RESET_STATE:
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