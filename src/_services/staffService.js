import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get staffService
 *
 * @package                TruckAdmin
 * @subpackage             staffService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const staffService = {
    getStaffList,
    getManagerList,
    insertManagerList
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getStaffList(page, pageSize, sorted, filtered) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();

    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/operatorlist',
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
function getManagerList() {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var getUserInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/getmanagerlist',
        data    : {"operator_id":getUserInfo._id},
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


/**
* @DateOfCreation        17 July 2018
* @ShortDescription      This function is responsible to call Fetch company api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function insertManagerList(data) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/insertManager',
        data    : data,
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
