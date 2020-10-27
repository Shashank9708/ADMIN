import { notificationConstants, configConstants } from '../_constants';
/**
 * notificationReducer
 *
 * @package                TruckAdmin
 * @subpackage             notificationReducer
 * @category               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    notificationList     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
};
export function notificationReducer(state = initialState, action) {
    switch (action.type) {

        // Fetch Reducer's
        case notificationConstants.NOTIFICATION_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case notificationConstants.NOTIFICATION_FETCH_SUCCESS:
          return {
            ...state,
            successMessage     : action.success,
            notificationList        : action.result.data,
            errorMsg           : false ,
            pages               : action.result.pages,
            is_loaded         :true
          };
        case notificationConstants.NOTIFICATION_FETCH_FAILURE:
          return {
            ...state,
            errorMsg        : action.error
          };

        case notificationConstants.NOTIFICATION_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        // Add Reducer's
        case notificationConstants.NOTIFICATION_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            submitted        : false

          };
        case notificationConstants.NOTIFICATION_SAVE_SUCCESS:
          return  {
              ...state,
              sendingRequest : true,
              submitted      : true,
              successMessage : action.successMsg.message,
              loader         : false,
              notificationList    : [...state.notificationList],
              errorMsg       : false,
              closeForm      : true
          };
        case notificationConstants.NOTIFICATION_SAVE_FAILURE:
          return {
            ...state,
            submitted      : false,
            errorMsg       : action.error,
            closeForm      : false,
           };

        case notificationConstants.NOTIFICATION_RESET_STATE:
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
