import { driverConstants, configConstants } from '../_constants';
/**
 * driverReducer
 *
 * @package                TruckAdmin
 * @subpackage             driverReducer
 * @category               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    driverList     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
};
export function driverReducer(state = initialState, action) {
    switch (action.type) {
        
        // Fetch Reducer's
        case driverConstants.DRIVER_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case driverConstants.DRIVER_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            driverList        : action.result,
            errorMsg           : false ,
            pages               : action.result.pages,
            is_loaded         :true
          };
        case driverConstants.DRIVER_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error
          };

        case driverConstants.DRIVER_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        case driverConstants.DRIVER_RESET_STATE:
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