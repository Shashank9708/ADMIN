import axios from 'axios'; 
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';

/**
 * get common list
 *
 * @package                TruckAdmin
 * @subpackage             get common list
 * @category               Service
 * @DateOfCreation         23 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const commonService = {
    statusCheck,
    editPut,
    renewPackage,
    getDashboard
};

/**
* @DateOfCreation        23 July 2018
* @ShortDescription      This function is responsible to call Fetch Vehicle list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function statusCheck(data) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/admin/doctorActive/'+data.doc_id+'/'+data.is_approved,
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        23 July 2018
* @ShortDescription      This function is responsible to call Fetch Vehicle list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function editPut(data) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var getUserInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'put',
        url     : configConstants.API_BASE_PATH +getUserInfo._id,
        data    : data,
        headers : { 
            'Authorization' : 'Bearer '+loginAccessToken,
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
* @DateOfCreation        23 July 2018
* @ShortDescription      This function is responsible to call Fetch Vehicle list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function renewPackage(data) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/renewpackage',
        data    : data,
        headers : { 
            'Authorization' : 'Bearer '+loginAccessToken,
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
* @DateOfCreation        23 July 2018
* @ShortDescription      This function is responsible to call Fetch Vehicle list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getDashboard() {
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/admin/dashboard',
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

