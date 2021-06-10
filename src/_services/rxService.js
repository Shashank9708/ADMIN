import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get rxService
 *
 * @package                ARKAdmin
 * @subpackage             rxService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const rxService = {
    getRXList,
    saveRX,
    editRX,
    statusChange
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getRXList(page, pageSize, sorted, filtered) {
    let doc_id = JSON.parse(localStorage.user).doc_id
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/doctor/medsbyspecialization/'+doc_id,
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
function saveRX(notification) {
    let doc_id = JSON.parse(localStorage.user).doc_id
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/doctor/medsbyspecialization/'+doc_id,
        data    : notification
    })
    .then(response => {
        return response;
    })
    .then(response => {
        return response;
    });
}
/**
* @DateOfCreation        10 May 2018
* @ShortDescription      This function is responsible to call Save notification api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function editRX(notification) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();editHealthTips
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/healthtips_EditCategory',
        data    : notification
    })
    .then(response => {
        return response;
    })
    .then(response => {
        return response;
    });
}

/**
* @DateOfCreation        10 May 2018
* @ShortDescription      This function is responsible to call Save notification api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function statusChange(data) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/admin/healthtips_CategoryActive/'+data.healthtips_category_id+'/'+data.status,
    })
    .then(response => {
        return response;
    })
    .then(response => {
        return response;
    });
}
