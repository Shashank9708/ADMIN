import { ImportConstants } from './ImportConstants';
/**
 * importReducer
 *
 * @package                TruckAdmin
 * @subpackage             importReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to Import
 */
const initialState = {
    results         : [],
    errorlist       : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successResult   : false,
    successMessage  : '',
    successMsg      : '',
    errorMsg        : false,
    detail          : {}
};
export function ImportReducer(state = initialState, action) { 
    switch (action.type) {
        
        // Fetch Import Reducer's Validation
        case ImportConstants.IMPORT_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded        : false
          };
        case ImportConstants.IMPORT_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage     : false, 
            successResult      : true, 
            results            : action.successMsg.result,
            errorMsg           : false,
            is_loaded          : true,
            closeForm          : false
          };
        case ImportConstants.IMPORT_FETCH_FAILURE:
          return { 
            ...state,
            errorlist        : action.error,
            errorMsg        : true
          };

        // Add / Update Reducer's  
        case ImportConstants.IMPORT_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            submitted        : false 

          };
        case ImportConstants.IMPORT_SAVE_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              successResult  : false, 
              submitted      : true,  
              successMessage : action.successMsg.message,
              loader         : false,
              errorMsg       : false,
              closeForm      : true
          };
        case ImportConstants.IMPORT_SAVE_FAILURE:
          return {
            ...state, 
            submitted      : false,
            errorMsg       : action.error,
            closeForm      : false,
           };
           
        case ImportConstants.IMPORT_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            successMsg    : false,
            isUpdateDone  : false,
            isInsertDone  : false
          }

        case ImportConstants.IMPORT_RESET_STATE:
          return {
              ...state,
              successResult   : false, 
              sendingRequest  : false, 
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              closeForm       : false              
           };
        case ImportConstants.IMPORT_UNAUTHENTICATE:
          return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
          } 
        default:
            return state
    }
}

