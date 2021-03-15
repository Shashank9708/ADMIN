import { appointmentConstants, configConstants } from '../_constants';
/**
 * appointmentReducer
 *
 * @package                ARKAdmin
 * @subpackage             appointmentReducer
 * @category               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    appointmentList     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
};
export function appointmentReducer(state = initialState, action) {
    switch (action.type) {

        // Fetch Reducer's
        case appointmentConstants.APPOINTMENT_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case appointmentConstants.APPOINTMENT_FETCH_SUCCESS:
          return {
            ...state,
            successMessage     : action.success,
            appointmentList        : action.result,
            errorMsg           : false ,
            pages               : action.result.pages,
            is_loaded         :true
          };
        case appointmentConstants.APPOINTMENT_FETCH_FAILURE:
          return {
            ...state,
            errorMsg        : action.error
          };

        case appointmentConstants.APPOINTMENT_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        // Add Reducer's
        case appointmentConstants.APPOINTMENT_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            submitted        : false

          };
        case appointmentConstants.APPOINTMENT_SAVE_SUCCESS:
          return  {
              ...state,
              sendingRequest : true,
              submitted      : true,
              // successMessage : action.successMsg.message,
              loader         : false,
              // appointmentList    : [...state.appointmentList],
              // appointmentList    : state.appointmentList,
              errorMsg       : false,
              closeForm      : true
          };
        case appointmentConstants.APPOINTMENT_SAVE_FAILURE:
          return {
            ...state,
            submitted      : false,
            errorMsg       : action.error,
            closeForm      : false,
           };

        case appointmentConstants.APPOINTMENT_RESET_STATE:
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
