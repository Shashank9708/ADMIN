import { LiveMapConstants } from './LiveMapConstants';
/**
 * LiveMapReducer
 *
 * @package                ARKAdmin
 * @subpackage             LiveMapReducer
 * @category               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    waypoints          : [],
    polyline           : [],
    location           : [],
    vehicle_route_id   : '',
    school_id   : '',
    vehicle_route_list : [],
    sendingRequest     : false,
    afterUpdate        : false,
    loader             : true,
    successMessage     : '',
    errorMsg           : false,
    draw               : false,
};
export function LiveMapReducer(state = initialState, action) {
    switch (action.type) {
        
        // Fetch Reducer's
        case LiveMapConstants.LIVE_MAP_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            draw            : false,
            is_loaded:false
          };
        case LiveMapConstants.LIVE_MAP_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage   : action.success, 
            waypoints        : action.result.waypoints,
            polyline         : action.result.polyline,
            vehicle_route_id : action.result.vehicle_route_id,
            location         : action.result.location,
            draw             : true,
            errorMsg         : false ,
            is_loaded        : true
          };
        case LiveMapConstants.LIVE_MAP_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error,
            draw            : false
          };


        // Fetch Reducer's
        case LiveMapConstants.LIVE_MAP_ALL_VEHICLE_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            draw            : false,
            is_loaded:false
          };
        case LiveMapConstants.LIVE_MAP_ALL_VEHICLE_FETCH_SUCCESS:
          return { 
            ...state,

            vehicle_route_list : action.result.data,
            school_id         : action.result.school_id,
            errorMsg         : false ,
            is_loaded        : true
          };
        case LiveMapConstants.LIVE_MAP_ALL_VEHICLE_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error,
            draw            : false
          };



        case LiveMapConstants.LIVE_MAP_UPDATE_STATE:
        return {
            ...state,
            errorMsg      : false,
            successMsg    : false,
            isUpdateDone  : false,
            isInsertDone  : false
        }

        case LiveMapConstants.LIVE_MAP_RESET_STATE:
          return {
              ...state,
              sendingRequest  : false,
              submitted       : false,
              closeForm       : false,
              loader          : false,
              successMessage  : '',
              errorMsg        : false,          
           };
        case LiveMapConstants.UNAUTHENTICATE:
          return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
          } 
        default:
            return state
    }
}