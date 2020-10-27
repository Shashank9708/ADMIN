import { configConstants, chatConstants } from '../_constants';
import { chatService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * chatActions
 *
 * @package                TruckAdmin
 * @subpackage             chatActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const chatActions = {
    getChatList,
    saveChat,
    imageChat,
    flagChat,
    resetChatState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get chat List
* @param                 JSON user, This contains full chat input data
* @return                JSON Object
*/
function getChatList(user_id) {
    return dispatch => {
        dispatch(request(user_id));
        chatService.getChatList(user_id)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.response_code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.response_code == configConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.UNAUTHENTICATE_CODE){
                        errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: chatConstants.CHATS_BY_ID_FETCH_REQUEST } }
    function success(result) { return { type: chatConstants.CHATS_BY_ID_FETCH_SUCCESS, result } }
    function failure(error) { return { type: chatConstants.CHATS_BY_ID_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get chat List
* @param                 JSON user, This contains full chat input data
* @return                JSON Object
*/
function saveChat(userChatList,chat) {
    return dispatch => {
        dispatch(request(chat));
        chatService.saveChat(userChatList,chat)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.response_code == configConstants.SUCCESS_CODE){
                        userChatList.push(data.result[0])
                      
                        var successMsg = { 'message' : data.message,'result' : userChatList };
                        dispatch(success(userChatList));

                        //dispatch(success(data.result));
                    }else if(data.response_code == configConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.UNAUTHENTICATE_CODE){
                        errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: chatConstants.CHATS_BY_ID_SAVE_REQUEST } }
    function success(result) { return { type: chatConstants.CHATS_BY_ID_SAVE_SUCCESS, result } }
    function failure(error) { return { type: chatConstants.CHATS_BY_ID_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}



/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get chat List
* @param                 JSON user, This contains full chat input data
* @return                JSON Object
*/
function imageChat(userChatList,chat,recordedBlob) {
    return dispatch => {
        dispatch(request(userChatList,chat,recordedBlob));
        chatService.imageChat(chat,recordedBlob)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.response_code == configConstants.SUCCESS_CODE){
                        userChatList.push(data.result[0])
                      
                        var successMsg = { 'message' : data.message,'result' : userChatList };
                        dispatch(success(userChatList));

                        //dispatch(success(data.result));
                    }else if(data.response_code == configConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.UNAUTHENTICATE_CODE){
                        errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: chatConstants.CHATS_BY_ID_SAVE_REQUEST } }
    function success(result) { return { type: chatConstants.CHATS_BY_ID_SAVE_SUCCESS, result } }
    function failure(error) { return { type: chatConstants.CHATS_BY_ID_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get chat List
* @param                 JSON user, This contains full chat input data
* @return                JSON Object
*/
function flagChat(data) {
    return dispatch => {
        dispatch(request(data));
        chatService.flagChat(data)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.response_code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.response_code == configConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.UNAUTHENTICATE_CODE){
                        errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: chatConstants.CHATS_FLAG_SAVE_REQUEST } }
    function success(result) { return { type: chatConstants.CHATS_FLAG_SAVE_SUCCESS, result } }
    function failure(error) { return { type: chatConstants.CHATS_FLAG_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


function resetChatState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : chatConstants.CHATS_BY_ID_RESET_STATE }}
}
