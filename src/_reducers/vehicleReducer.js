import { vehicleConstants, configConstants } from '../_constants';
/**
 * vehicleReducer
 *
 * @package                ARKAdmin
 * @subpackage             vehicleReducer
 * @category               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    vehicleList     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
    is_current      : false
};
export function vehicleReducer(state = initialState, action) {
    switch (action.type) {
        
        // Fetch Reducer's
        case vehicleConstants.VEHICLE_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_current:false
          };
        case vehicleConstants.VEHICLE_FETCH_SUCCESS:
          return { 
            ...state,
            vehicleList        : action.result,
            errorMsg           : false ,
            is_current         :true
          };
        case vehicleConstants.VEHICLE_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error,
            is_current:false
          };

        case vehicleConstants.VEHICLE_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false,
          is_current    : false  
        }

        case vehicleConstants.VEHICLE_RESET_STATE:
          return {
              ...state,
              is_current:false          
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