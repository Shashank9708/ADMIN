import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * chatService
 *
 * @package                TruckAdmin
 * @subpackage             chatService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const chatService = {
    getChatList,
    saveChat,
    imageChat,
    flagChat
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getChatList(user_id) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();

    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/getuserchat',
        data    : user_id,
        headers : {
            'Authorization' : 'Bearer '+loginAccessToken
        }
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function saveChat(userChatList, chat) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();

    var bodyFormData = new FormData();
    bodyFormData = utilityHelper.jsonToFormData(chat, bodyFormData);

    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/insertchat',
        data    : bodyFormData,
        headers : { 
            'Authorization' : 'Bearer '+loginAccessToken,
            'Content-Type' : 'multipart/form-data'
        }
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function imageChat(chat,recordedBlob) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();

    var bodyFormData = new FormData();
    bodyFormData = utilityHelper.jsonToFormData(chat, bodyFormData);
    bodyFormData = utilityHelper.jsonToFormData('image', recordedBlob);
    
    //bodyFormData.append('image', recordedBlob, 'myfiletosave.mp3');

    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/insertchatimage',
        data    : chat,
        headers : {
            'Authorization' : 'Bearer '+loginAccessToken,
            'enctype': 'multipart/form-data',
            'Content-Type' : 'multipart/form-data'
        }
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function flagChat(data) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();

    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/chatreplied',
        data    : data,
        headers : {
            'Authorization' : 'Bearer '+loginAccessToken
        }
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}