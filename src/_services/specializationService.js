import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get specializationService
 *
 * @package                TruckAdmin
 * @subpackage             specializationService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const specializationService = {
    getSpecializationList,
    saveSpecialization,
    statusChange
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getSpecializationList(page, pageSize, sorted, filtered) {
    
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/admin/category',
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
function saveSpecialization(notification) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/saveCategory',
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
        url     : configConstants.API_BASE_PATH + '/admin/categoryActive/'+data.id+'/'+data.status,
    })
    .then(response => {
        return response;
    })
    .then(response => {
        return response;
    });
}
