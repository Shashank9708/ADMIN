import axios from 'axios'; 
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get tripService
 *
 * @package                ARKAdmin
 * @subpackage             tripService
 * @category               Service
 * @DateOfCreation         14 Aug 2018
 * @ShortDescription       This is responsible for calling API
 */
export const tripService = {
    getTripList,
    polyline,
    complaintlist,
    liabilitylist,
    liability
};

/**
* @DateOfCreation        14 Aug 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getTripList(page, pageSize, sorted, filtered,vehicle_id) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var getUserInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/triplist',
        data : {"user_id":getUserInfo._id,"user_type":getUserInfo.user_type},
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
* @DateOfCreation        04 March 2019
* @ShortDescription      This function is responsible to call Map
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function polyline(data) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/polyline',
        data : {"trip_id":data},
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
* @DateOfCreation        04 March 2019
* @ShortDescription      This function is responsible to call Map
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function complaintlist() {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
	 var getUserInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/complaintlist',
		data    : {"operator_id":getUserInfo._id},
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
* @DateOfCreation        04 March 2019
* @ShortDescription      This function is responsible to call Map
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function liability(data) {

    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/liability',
        data : data,
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
* @DateOfCreation        04 March 2019
* @ShortDescription      This function is responsible to call Map
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function liabilitylist() {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
	var getUserInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/liabilitylist',
		data    : {"created_by":getUserInfo._id},
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