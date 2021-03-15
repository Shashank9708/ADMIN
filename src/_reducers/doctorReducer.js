import { configConstants, doctorConstants } from '../_constants';
/**
 * doctorReducer
 *
 * @subpackage             doctorReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    spList      : [],
    doctorList      : [],
    doctorDetailAction    : false,
    doctorDetail    : [],
    bookDApp        : false,
    myAppoinementList        : [],
    doctorAppoinementList    : [],
    doctorReferred    : [],
    doctorReferral    : [],
    cancelMessage          : false,
    referToDoctor          : false,
    uploaded          : false,
    loader          : false,
    errorMsg        : false,
    watchData       : false,
    complete       : false,
    serverDown      : false
};
export function doctorReducer(state = initialState, action) {
    switch (action.type) {
      
         // Fetch 
        case doctorConstants.SPECIALIZATION_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            spList       : [],
            submitted        : false 
          };
        case doctorConstants.SPECIALIZATION_FETCH_SUCCESS:
          return  { 
              ...state,
              spList     : action.result,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.SPECIALIZATION_FETCH_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

       // Fetch 
        case doctorConstants.DOCTOR_BY_SP_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            doctorList       : [],
            submitted        : false 
          };
        case doctorConstants.DOCTOR_BY_SP_FETCH_SUCCESS:
          return  { 
              ...state,
              doctorList     : action.result,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.DOCTOR_BY_SP_FETCH_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

       // Fetch 
        case doctorConstants.DOCTOR_BY_DETAIL_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            doctorDetailAction    : false,
            doctorDetail       : [],
            submitted        : false 
          };
        case doctorConstants.DOCTOR_BY_DETAIL_FETCH_SUCCESS:
          return  { 
              ...state,
              doctorDetail     : action.result,
              doctorDetailAction    : true,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.DOCTOR_BY_DETAIL_FETCH_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            doctorDetailAction    : false,
            errorMsg       : action.error
           };

        // Fetch 
        case doctorConstants.BOOK_APPOINTMENT_DOCTOR_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 
          };
        case doctorConstants.BOOK_APPOINTMENT_DOCTOR_SAVE_SUCCESS:
          return  { 
              ...state,
              bookDApp     : action.result,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.BOOK_APPOINTMENT_DOCTOR_SAVE_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // Fetch 
        case doctorConstants.MY_DOCTOR_APPOINTMENT_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            myAppoinementList       : [],
            submitted        : false 
          };
        case doctorConstants.MY_DOCTOR_APPOINTMENT_SUCCESS:
          return  { 
              ...state,
              myAppoinementList     : action.result,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.MY_DOCTOR_APPOINTMENT_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // Fetch 
        case doctorConstants.CANCEL_MY_DOCTOR_APPOINTMENT_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 
          };
        case doctorConstants.CANCEL_MY_DOCTOR_APPOINTMENT_SUCCESS:
          return  { 
              ...state,
              cancelMessage     : action.result,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.CANCEL_MY_DOCTOR_APPOINTMENT_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // Fetch 
        case doctorConstants.DOCTOR_APPOINTMENT_LIST_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            doctorAppoinementList       : [],
            submitted        : false 
          };
        case doctorConstants.DOCTOR_APPOINTMENT_LIST_SUCCESS:
          return  { 
              ...state,
              doctorAppoinementList     : action.result.data,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.DOCTOR_APPOINTMENT_LIST_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // Fetch 
        case doctorConstants.CANCEL_BY_DOCTOR_APPOINTMENT_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 
          };
        case doctorConstants.CANCEL_BY_DOCTOR_APPOINTMENT_SUCCESS:
          return  { 
              ...state,
              cancelMessage     : action.result,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.CANCEL_BY_DOCTOR_APPOINTMENT_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // Fetch 
        case doctorConstants.UPLOAD_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 
          };
        case doctorConstants.UPLOAD_SAVE_SUCCESS:
          return  { 
              ...state,
              uploaded     : action.result,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.UPLOAD_SAVE_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // Fetch 
        case doctorConstants.COMPLETE_APPOINTMENT_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 
          };
        case doctorConstants.COMPLETE_APPOINTMENT_SUCCESS:
          return  { 
              ...state,
              complete     : true,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.COMPLETE_APPOINTMENT_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // Fetch 
        case doctorConstants.DOCTOR_REFERRAL_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            doctorReferral   : [],
            submitted        : false 
          };
        case doctorConstants.DOCTOR_REFERRAL_SUCCESS:
          return  { 
              ...state,
              doctorReferral     : action.result,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.DOCTOR_REFERRAL_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // Fetch 
        case doctorConstants.DOCTOR_REFERRED_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            doctorReferred   : [],
            submitted        : false 
          };
        case doctorConstants.DOCTOR_REFERRED_SUCCESS:
          return  { 
              ...state,
              doctorReferred     : action.result,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.DOCTOR_REFERRED_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // Fetch 
        case doctorConstants.REFERTO_DOCTOR_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 
          };
        case doctorConstants.REFERTO_DOCTOR_SUCCESS:
          return  { 
              ...state,
              referToDoctor  : action.result,
              loader         : false,
              errorMsg       : false
          };
        case doctorConstants.REFERTO_DOCTOR_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };
       
        case doctorConstants.FIRST_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            isUpdateDone  : false,
            isInsertDone  : false
          }

        case doctorConstants.FIRST_RESET_STATE:
          return {
              ...state,
              errorMsg        : false,
              submitted       : false,
              closeForm       : false              
           };
        case doctorConstants.FIRST_UNAUTHENTICATE:
          return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
          }
        case configConstants.SERVER_DOWN:
          return {
            ...state,
            serverDown: true
          }
        default:
            return state
    }
}
