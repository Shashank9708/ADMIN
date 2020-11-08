import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get healthTipsService
 *
 * @package                TruckAdmin
 * @subpackage             healthTipsService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const healthTipsService = {
    getHealthTipsList,
    saveHealthTips,
    statusChange
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getHealthTipsList(page, pageSize, sorted, filtered) {
    
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/admin/healthTipsList',
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
function saveHealthTips(notification) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/saveHealthTips',
        data    : notification,
        headers : { 
            'Content-Type' : 'multipart/form-data'
        }
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
        url     : configConstants.API_BASE_PATH + '/admin/healthTipsActive/'+data.health_tip_id+'/'+data.status,
    })
    .then(response => {
        return response;
    })
    .then(response => {
        return response;
    });
}