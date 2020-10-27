import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get driverService
 *
 * @package                TruckAdmin
 * @subpackage             driverService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const driverService = {
    getDriverList,
    sendMail
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getDriverList(page, pageSize, sorted, filtered) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var getUserInfo = utilityHelper.getUserInfo();

    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/driverlist',
        data : {"operator_id":getUserInfo._id,"user_type":getUserInfo.user_type},
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
    var jsonDriverId = {'driver_id':data};
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'create_password',
        data    : jsonDriverId,
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
