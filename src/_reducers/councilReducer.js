import { councilConstants, configConstants } from '../_constants';
/**
 * councilReducer
 *
 * @package                ARKAdmin
 * @subpackage             councilReducer
 * @council               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    councilList     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    status          : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
};
export function councilReducer(state = initialState, action) {
    switch (action.type) {

        // Fetch Reducer's
        case councilConstants.COUNCIL_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case councilConstants.COUNCIL_FETCH_SUCCESS:
          return {
            ...state,
            successMessage     : action.success,
            councilList        : action.result,
            errorMsg           : false ,
            // pages               : action.result.pages,
            is_loaded         :true
          };
        case councilConstants.COUNCIL_FETCH_FAILURE:
          return {
            ...state,
            errorMsg        : action.error
          };

        case councilConstants.COUNCIL_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        // Add Reducer's
        case councilConstants.COUNCIL_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            submitted        : false

          };
        case councilConstants.COUNCIL_SAVE_SUCCESS:
          return  {
              ...state,
              sendingRequest : true,
              submitted      : true,
              // successMessage : action.successMsg.message,
              loader         : false,
              // councilList    : [...state.councilList],
              // councilList    : state.councilList,
              errorMsg       : false,
              closeForm      : true
          };
        case councilConstants.COUNCIL_SAVE_FAILURE:
          return {
            ...state,
            submitted      : false,
            errorMsg       : action.error,
            closeForm      : false,
           };

        // Fetch Reducer's
        case councilConstants.STATUS_CHANGE_REQUEST:
          return {
            ...state,
            status            : false,
            errorMsg         : false,
            is_loaded:false
          };
        case councilConstants.STATUS_CHANGE_SUCCESS:
          return {
            ...state,
            status            : true,
            successMessage     : action.success,
            errorMsg           : false,
            is_loaded          : true
          };
        case councilConstants.STATUS_CHANGE_FAILURE:
          return {
            ...state,
            status            : false,
            errorMsg        : action.error
          };

        case councilConstants.COUNCIL_RESET_STATE:
          return {
              ...state,
              sendingRequest  : false,
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              closeForm       : false,
              status          : false,
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
