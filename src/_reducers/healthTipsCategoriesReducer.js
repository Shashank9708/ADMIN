import { healthTipsCategoriesConstants, configConstants } from '../_constants';
/**
 * healthTipsCategoriesReducer
 *
 * @package                TruckAdmin
 * @subpackage             healthTipsCategoriesReducer
 * @healthTipsCategories               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    healthTipsCategoriesList     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    status          : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
};
export function healthTipsCategoriesReducer(state = initialState, action) {
    switch (action.type) {

        // Fetch Reducer's
        case healthTipsCategoriesConstants.HEALTH_TIPS_CAT_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case healthTipsCategoriesConstants.HEALTH_TIPS_CAT_FETCH_SUCCESS:
          return {
            ...state,
            successMessage     : action.success,
            healthTipsCategoriesList        : action.result,
            errorMsg           : false ,
            // pages               : action.result.pages,
            is_loaded         :true
          };
        case healthTipsCategoriesConstants.HEALTH_TIPS_CAT_FETCH_FAILURE:
          return {
            ...state,
            errorMsg        : action.error
          };

        case healthTipsCategoriesConstants.HEALTH_TIPS_CAT_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        // Add Reducer's
        case healthTipsCategoriesConstants.HEALTH_TIPS_CAT_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            submitted        : false

          };
        case healthTipsCategoriesConstants.HEALTH_TIPS_CAT_SAVE_SUCCESS:
          return  {
              ...state,
              sendingRequest : true,
              submitted      : true,
              // successMessage : action.successMsg.message,
              loader         : false,
              // healthTipsCategoriesList    : [...state.healthTipsCategoriesList],
              // healthTipsCategoriesList    : state.healthTipsCategoriesList,
              errorMsg       : false,
              closeForm      : true
          };
        case healthTipsCategoriesConstants.HEALTH_TIPS_CAT_SAVE_FAILURE:
          return {
            ...state,
            submitted      : false,
            errorMsg       : action.error,
            closeForm      : false,
           };

        // Fetch Reducer's
        case healthTipsCategoriesConstants.STATUS_CHANGE_REQUEST:
          return {
            ...state,
            status            : false,
            errorMsg         : false,
            is_loaded:false
          };
        case healthTipsCategoriesConstants.STATUS_CHANGE_SUCCESS:
          return {
            ...state,
            status            : true,
            successMessage     : action.success,
            errorMsg           : false,
            is_loaded          : true
          };
        case healthTipsCategoriesConstants.STATUS_CHANGE_FAILURE:
          return {
            ...state,
            status            : false,
            errorMsg        : action.error
          };

        case healthTipsCategoriesConstants.HEALTH_TIPS_CAT_RESET_STATE:
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
