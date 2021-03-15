import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get notificationService
 *
 * @package                ARKAdmin
 * @subpackage             notificationService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const notificationService = {
    getNotificationList,
    sendPushNotification
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getNotificationList(page, pageSize, sorted, filtered) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();

    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'admin_notification_list',
        data : {"page":page, "pageSize":pageSize, "sorted":sorted, "filtered":filtered},
        headers : {
            'Authorization' : 'Bearer '+loginAccessToken,
            'unencrypted' : '1'
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
* @DateOfCreation        10 May 2018
* @ShortDescription      This function is responsible to call Save notification api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function sendPushNotification(notification) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'send_notification',
        data    : notification,
        headers: {
            'Authorization' : 'Bearer '+loginAccessToken,
            'unencrypted' : '1'
        }
    })
    .then(response => {
        return response;
    })
    .then(response => {
        return response;
    });
}
