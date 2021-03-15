import { commonConstants } from '../_constants';
/**
 * commonConstants
 *
 * @package                ARKAdmin
 * @subpackage             commonConstants
 * @category               Reducers
 * @DateOfCreation         17 May 2018
 * @ShortDescription       This is responsible for all state related to all module for drop down
 */
const initialState = {
    dashboardList     : {},
    locationList    : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '' ,
    detail          : {},
    statusClose     : false,
    editClose     : false,
    renewClose     : false,
};
export function commonReducer(state = initialState, action) {
    switch (action.type) {

        // User Status change
        case commonConstants.USER_STATUS_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded        : false,
            statusClose        : false,

          };
        case commonConstants.USER_STATUS_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            errorMsg           : false ,
            statusClose        : true,
            is_loaded          : true
          };
        case commonConstants.USER_STATUS_FETCH_FAILURE:
          return { 
            ...state,
            statusClose        : false,
            errorMsg        : action.error
          };

        case commonConstants.USER_STATUS_RESET_STATE:
          return {
              ...state,
              statusClose        : false,
           };

        // User Edit change
        case commonConstants.USER_EDIT_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded        : false,
            editClose        : false,

          };
        case commonConstants.USER_EDIT_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            errorMsg           : false ,
            editClose        : true,
            is_loaded          : true
          };
        case commonConstants.USER_EDIT_FETCH_FAILURE:
          return { 
            ...state,
            editClose        : false,
            errorMsg        : action.error
          };

        case commonConstants.USER_EDIT_RESET_STATE:
          return {
              ...state,
              editClose        : false,
           };

        // User Renew change
        case commonConstants.USER_RENEW_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded        : false,
            renewClose        : false,

          };
        case commonConstants.USER_RENEW_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            errorMsg           : false ,
            renewClose        : true,
            is_loaded          : true
          };
        case commonConstants.USER_RENEW_FETCH_FAILURE:
          return { 
            ...state,
            renewClose        : false,
            errorMsg        : action.error
          };

        case commonConstants.USER_RENEW_RESET_STATE:
          return {
              ...state,
              renewClose        : false,
           };

        // Fetch Vehicle list Reducer's
        case commonConstants.DASHBOARD_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded        : false
          };
        case commonConstants.DASHBOARD_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            dashboardList        : action.result,
            errorMsg           : false ,
            is_loaded          : true
          };
        case commonConstants.DASHBOARD_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error
          };

        

        default:
            return state
    }
}