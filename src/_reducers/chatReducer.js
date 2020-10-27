import { chatConstants, configConstants } from '../_constants';
/**
 * chatReducer
 *
 * @package                TruckAdmin
 * @subpackage             chatReducer
 * @category               Reducers
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all state related
 */
const initialState = {
    userChatList     : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    errorMsg        : false,
    detail          : {},
};
export function chatReducer(state = initialState, action) {
    switch (action.type) {
        
        // Fetch Reducer's
        case chatConstants.CHATS_BY_ID_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            is_loaded:false
          };
        case chatConstants.CHATS_BY_ID_FETCH_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            userChatList        : action.result,
            errorMsg           : false ,
            is_loaded         :true
          };
        case chatConstants.CHATS_BY_ID_FETCH_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error,
          };

        // Fetch Reducer's
        case chatConstants.CHATS_BY_ID_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            sendingRequest : false
          };
        case chatConstants.CHATS_BY_ID_SAVE_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            userChatList        : action.result,
            errorMsg           : false ,
             sendingRequest : true
            
          };
        case chatConstants.CHATS_BY_ID_SAVE_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error,
             sendingRequest : false
          };

        // Fetch Reducer's
        case chatConstants.CHATS_FLAG_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            sendingRequest : false
          };
        case chatConstants.CHATS_FLAG_SAVE_SUCCESS:
          return { 
            ...state,
            successMessage     : action.success, 
            errorMsg           : false ,
             sendingRequest : true
            
          };
        case chatConstants.CHATS_FLAG_SAVE_FAILURE:
          return { 
            ...state,
            errorMsg        : action.error,
             sendingRequest : false
          };

        case chatConstants.CHATS_BY_ID_UPDATE_STATE:
        return {
          ...state,
          errorMsg      : false,
          successMsg    : false,
          isUpdateDone  : false,
          isInsertDone  : false
        }

        case chatConstants.CHATS_BY_ID_RESET_STATE:
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