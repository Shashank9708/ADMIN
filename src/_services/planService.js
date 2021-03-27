import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get planService
 *
 * @package                ARKAdmin
 * @subpackage             planService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const planService = {
    getPlanList,
    savePlan,
    statusChange,
    deletePlan
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getPlanList(page, pageSize, sorted, filtered) {
    
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/admin/getPlanList',
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
* @ShortDescription      This function is responsible to call Save vendor api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function savePlan(plan) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    console.log("plan",plan)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/savePlans',
        data    : plan
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
* @ShortDescription      This function is responsible to call Save vendor api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function statusChange(data) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/changePlanStatus',
        data    : data
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
* @ShortDescription      This function is responsible to call Save vendor api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function deletePlan(data) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/deletePlan',
        data    : data
    })
    .then(response => {
        return response;
    })
    .then(response => {
        return response;
    });
}