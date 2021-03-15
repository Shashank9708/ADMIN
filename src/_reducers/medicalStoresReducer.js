import { medicalStoresConstants, configConstants } from '../_constants';
/**
 * medicalStoresReducer
 *
 * @package                ARKAdmin
 * @subpackage             medicalStoresReducer
 * @category               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    medicalStoresList     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
    status            : false,
};
export function medicalStoresReducer(state = initialState, action) {
    switch (action.type) {

        // Fetch Reducer's
        case medicalStoresConstants.MEDICAL_STORES_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case medicalStoresConstants.MEDICAL_STORES_FETCH_SUCCESS:
          return {
            ...state,
            successMessage     : action.success,
            medicalStoresList  : action.result,
            errorMsg           : false,
            pages              : action.result.pages,
            is_loaded          : true
          };
        case medicalStoresConstants.MEDICAL_STORES_FETCH_FAILURE:
          return {
            ...state,
            errorMsg        : action.error
          };

        case medicalStoresConstants.MEDICAL_STORES_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        // Add Reducer's
        case medicalStoresConstants.MEDICAL_STORES_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            submitted        : false

          };
        case medicalStoresConstants.MEDICAL_STORES_SAVE_SUCCESS:
          return  {
              ...state,
              sendingRequest : true,
              submitted      : true,
              // successMessage : action.successMsg.message,
              loader         : false,
              // medicalStoresList    : [...state.medicalStoresList],
              // medicalStoresList    : state.medicalStoresList,
              errorMsg       : false,
              closeForm      : true
          };
        case medicalStoresConstants.MEDICAL_STORES_SAVE_FAILURE:
          return {
            ...state,
            submitted      : false,
            errorMsg       : action.error,
            closeForm      : false,
           };

        // Fetch Reducer's
        case medicalStoresConstants.STATUS_CHANGE_REQUEST:
          return {
            ...state,
            status           : false,
            errorMsg         : false,
            is_loaded        : false
          };
        case medicalStoresConstants.STATUS_CHANGE_SUCCESS:
          return {
            ...state,
            status             : true,
            successMessage     : action.success,
            errorMsg           : false,
            is_loaded          : true
          };
        case medicalStoresConstants.STATUS_CHANGE_FAILURE:
          return {
            ...state,
            status          : false,
            errorMsg        : action.error
          };

        case medicalStoresConstants.MEDICAL_STORES_RESET_STATE:
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
