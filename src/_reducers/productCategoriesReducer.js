import { productCategoriesConstants, configConstants } from '../_constants';
/**
 * productCategoriesReducer
 *
 * @package                ARKAdmin
 * @subpackage             productCategoriesReducer
 * @productCategories               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    productCategoriesList     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    status          : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
};
export function productCategoriesReducer(state = initialState, action) {
    switch (action.type) {

        // Fetch Reducer's
        case productCategoriesConstants.PRODUCT_CAT_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case productCategoriesConstants.PRODUCT_CAT_FETCH_SUCCESS:
          return {
            ...state,
            successMessage     : action.success,
            productCategoriesList        : action.result,
            errorMsg           : false ,
            // pages               : action.result.pages,
            is_loaded         :true
          };
        case productCategoriesConstants.PRODUCT_CAT_FETCH_FAILURE:
          return {
            ...state,
            errorMsg        : action.error
          };

        case productCategoriesConstants.PRODUCT_CAT_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        // Add Reducer's
        case productCategoriesConstants.PRODUCT_CAT_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            submitted        : false

          };
        case productCategoriesConstants.PRODUCT_CAT_SAVE_SUCCESS:
          return  {
              ...state,
              sendingRequest : true,
              submitted      : true,
              // successMessage : action.successMsg.message,
              loader         : false,
              // productCategoriesList    : [...state.productCategoriesList],
              // productCategoriesList    : state.productCategoriesList,
              errorMsg       : false,
              closeForm      : true
          };
        case productCategoriesConstants.PRODUCT_CAT_SAVE_FAILURE:
          return {
            ...state,
            submitted      : false,
            errorMsg       : action.error,
            closeForm      : false,
           };

        // Fetch Reducer's
        case productCategoriesConstants.STATUS_CHANGE_REQUEST:
          return {
            ...state,
            status            : false,
            errorMsg         : false,
            is_loaded:false
          };
        case productCategoriesConstants.STATUS_CHANGE_SUCCESS:
          return {
            ...state,
            status            : true,
            successMessage     : action.success,
            errorMsg           : false,
            is_loaded          : true
          };
        case productCategoriesConstants.STATUS_CHANGE_FAILURE:
          return {
            ...state,
            status            : false,
            errorMsg        : action.error
          };

        case productCategoriesConstants.PRODUCT_CAT_RESET_STATE:
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
