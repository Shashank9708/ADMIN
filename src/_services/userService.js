import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get userService
 *
 * @package                TruckAdmin
 * @subpackage             userService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const userService = {
    getUserList,
    showUserList,
    sendMail
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getUserList(page, pageSize, sorted, filtered) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var getUserInfo = utilityHelper.getUserInfo();
    
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/userlist',
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
function showUserList(type) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var getUserInfo = utilityHelper.getUserInfo();
    
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/showuserlist',
        data : {"operator_id":getUserInfo._id,"user_type":getUserInfo.user_type,"type":type},
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
* @DateOfCreation        17 July 2018
* @ShortDescription      This function is responsible to call Fetch company api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function sendMail(data) {
    var jsonUserId = {'user_id':data};
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'create_password',
        data    : jsonUserId,
        headers : {
            'Authorization' : 'Bearer '+loginAccessToken,
            'unencrypted' : '1',
        }
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
