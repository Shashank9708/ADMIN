import { healthTipsConstants, configConstants } from '../_constants';
/**
 * healthTipsReducer
 *
 * @package                TruckAdmin
 * @subpackage             healthTipsReducer
 * @category               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    healthTipsList     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
    status            : false,
};
export function healthTipsReducer(state = initialState, action) {
    switch (action.type) {

        // Fetch Reducer's
        case healthTipsConstants.HEALTH_TIPS_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case healthTipsConstants.HEALTH_TIPS_FETCH_SUCCESS:
          return {
            ...state,
            successMessage     : action.success,
            healthTipsList        : action.result,
            errorMsg           : false ,
            pages               : action.result.pages,
            is_loaded         :true
          };
        case healthTipsConstants.HEALTH_TIPS_FETCH_FAILURE:
          return {
            ...state,
            errorMsg        : action.error
          };

        case healthTipsConstants.HEALTH_TIPS_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        // Add Reducer's
        case healthTipsConstants.HEALTH_TIPS_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            submitted        : false

          };
        case healthTipsConstants.HEALTH_TIPS_SAVE_SUCCESS:
          return  {
              ...state,
              sendingRequest : true,
              submitted      : true,
              // successMessage : action.successMsg.message,
              loader         : false,
              // healthTipsList    : [...state.healthTipsList],
              // healthTipsList    : state.healthTipsList,
              errorMsg       : false,
              closeForm      : true
          };
        case healthTipsConstants.HEALTH_TIPS_SAVE_FAILURE:
          return {
            ...state,
            submitted      : false,
            errorMsg       : action.error,
            closeForm      : false,
           };

        // Fetch Reducer's
        case healthTipsConstants.STATUS_CHANGE_REQUEST:
          return {
            ...state,
            status            : false,
            errorMsg         : false,
            is_loaded:false
          };
        case healthTipsConstants.STATUS_CHANGE_SUCCESS:
          return {
            ...state,
            status            : true,
            successMessage     : action.success,
            errorMsg           : false,
            is_loaded          : true
          };
        case healthTipsConstants.STATUS_CHANGE_FAILURE:
          return {
            ...state,
            status            : false,
            errorMsg        : action.error
          };

        // Fetch Reducer's
        case healthTipsConstants.HEALTH_TIPS_DELETE_REQUEST:
          return {
            ...state,
            status            : false,
            errorMsg         : false,
            is_loaded:false
          };
        case healthTipsConstants.HEALTH_TIPS_DELETE_SUCCESS:
          return {
            ...state,
            status            : true,
            successMessage     : action.success,
            errorMsg           : false,
            is_loaded          : true
          };
        case healthTipsConstants.HEALTH_TIPS_DELETE_FAILURE:
          return {
            ...state,
            status            : false,
            errorMsg        : action.error
          };

        case healthTipsConstants.HEALTH_TIPS_RESET_STATE:
          return {
              ...state,
              sendingRequest  : false,
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              closeForm       : false,
              status            : false,
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
