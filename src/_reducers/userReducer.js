import { userConstants, configConstants } from '../_constants';
/**
 * userReducer
 *
 * @package                ARKAdmin
 * @subpackage             userReducer
 * @category               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    userList     : [],
    doctorList : [],
    blankChatList : false,
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
};
export function userReducer(state = initialState, action) {
    switch (action.type) {
        
        // Fetch Reducer's
        case userConstants.USER_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case userConstants.USER_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            userList        : action.result,
            errorMsg           : false ,
            pages               : action.result.pages,
            is_loaded         :true
          };
        case userConstants.USER_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error
          };

        // Fetch Reducer's
        case userConstants.DOCTOR_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false,
          };
        case userConstants.DOCTOR_FETCH_SUCCESS:
          return { 
            ...state,
            doctorList        : action.result,
            blankChatList        : true,
            errorMsg           : false ,
            is_loaded         :false
          };
        case userConstants.DOCTOR_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error,
            is_loaded:false,
          };

        case userConstants.USER_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        case userConstants.USER_RESET_STATE:
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