import { tripConstants, configConstants } from '../_constants';
/**
 * tripReducer
 *
 * @package                TruckAdmin
 * @subpackage             tripReducer
 * @category               Reducers
 * @DateOfCreation         14 Aug 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    tripList     : [],
    polyline     : [],
    complaint     : [],
    liability     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    is_trip        : false,
    is_liability        : false,
    detail          : {},
};
export function tripReducer(state = initialState, action) {
    switch (action.type) {
        
        // Fetch Reducer's
        case tripConstants.MAP_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case tripConstants.MAP_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            polyline        : action.result,
            errorMsg           : false ,
            is_loaded         :true
          };
        case tripConstants.MAP_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error
          };

        // Fetch Reducer's
        case tripConstants.TRIP_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false,
            is_trip:false
          };
        case tripConstants.TRIP_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            tripList        : action.result,
            errorMsg           : false ,
            pages               : action.result.pages,
            is_loaded         :true,
            is_trip         :true,
          };
        case tripConstants.TRIP_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error,
            is_trip:false
          };

        case tripConstants.TRIP_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        case tripConstants.TRIP_RESET_STATE:
          return {
              ...state,
              is_trip         : false        
           };


        // Fetch Reducer's
        case tripConstants.LIABILITY_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false,
            is_liability:false
          };
        case tripConstants.LIABILITY_FETCH_SUCCESS:
          return { 
            ...state,
            
            liability        : action.result,
            errorMsg           : false ,
            is_loaded         :true,
            is_liability:true
          };
        case tripConstants.LIABILITY_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error,
            is_liability:false            
          };

        // Fetch Reducer's
        case tripConstants.LIABILITY_UPDATE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false,
            
          };
        case tripConstants.LIABILITY_UPDATE_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            errorMsg           : false ,
            
          };
        case tripConstants.LIABILITY_UPDATE_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error,
            
          };
        
        case tripConstants.LIABILITY_RESET_STATE:
          return {
              ...state,
              is_liability         : false        
           };
        
        // Fetch Reducer's
        case tripConstants.COMPLAINT_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case tripConstants.COMPLAINT_FETCH_SUCCESS:
          return { 
            ...state,
            complaint        : action.result,
            errorMsg           : false ,
            is_loaded         :true
          };
        case tripConstants.COMPLAINT_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error
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