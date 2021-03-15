import { productConstants, configConstants } from '../_constants';
/**
 * productReducer
 *
 * @package                ARKAdmin
 * @subpackage             productReducer
 * @category               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    productList     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
    status            : false,
};
export function productReducer(state = initialState, action) {
    switch (action.type) {

        // Fetch Reducer's
        case productConstants.PRODUCT_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case productConstants.PRODUCT_FETCH_SUCCESS:
          return {
            ...state,
            successMessage     : action.success,
            productList        : action.result,
            errorMsg           : false ,
            pages               : action.result.pages,
            is_loaded         :true
          };
        case productConstants.PRODUCT_FETCH_FAILURE:
          return {
            ...state,
            errorMsg        : action.error
          };

        case productConstants.PRODUCT_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        // Add Reducer's
        case productConstants.PRODUCT_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            submitted        : false

          };
        case productConstants.PRODUCT_SAVE_SUCCESS:
          return  {
              ...state,
              sendingRequest : true,
              submitted      : true,
              // successMessage : action.successMsg.message,
              loader         : false,
              // productList    : [...state.productList],
              // productList    : state.productList,
              errorMsg       : false,
              closeForm      : true
          };
        case productConstants.PRODUCT_SAVE_FAILURE:
          return {
            ...state,
            submitted      : false,
            errorMsg       : action.error,
            closeForm      : false,
           };

        // Fetch Reducer's
        case productConstants.STATUS_CHANGE_REQUEST:
          return {
            ...state,
            status            : false,
            errorMsg         : false,
            is_loaded:false
          };
        case productConstants.STATUS_CHANGE_SUCCESS:
          return {
            ...state,
            status            : true,
            successMessage     : action.success,
            errorMsg           : false,
            is_loaded          : true
          };
        case productConstants.STATUS_CHANGE_FAILURE:
          return {
            ...state,
            status            : false,
            errorMsg        : action.error
          };

        // Fetch Reducer's
        case productConstants.PRODUCT_DELETE_REQUEST:
          return {
            ...state,
            status            : false,
            errorMsg         : false,
            is_loaded:false
          };
        case productConstants.PRODUCT_DELETE_SUCCESS:
          return {
            ...state,
            status            : true,
            successMessage     : action.success,
            errorMsg           : false,
            is_loaded          : true
          };
        case productConstants.PRODUCT_DELETE_FAILURE:
          return {
            ...state,
            status            : false,
            errorMsg        : action.error
          };

        case productConstants.PRODUCT_RESET_STATE:
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
