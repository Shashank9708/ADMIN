import axios from 'axios'; 
import { LiveMapConstants } from './LiveMapConstants';
import { utilityHelper } from '../../_helpers';
/**
 * get LiveMapService
 *
 * @package                ARKAdmin
 * @subpackage             LiveMapService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const LiveMapService = {
    getLiveMapList,
    getAllVehicle
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getLiveMapList(data) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    
    return axios({
        method  : 'post',
        url     : LiveMapConstants.API_BASE_PATH + 'route_path_draw',
        data    : data,
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
* @DateOfCreation        14 Aug 2018
* @ShortDescription      This function is responsible to call Fetch vehicle route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getAllVehicle() {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    
    return axios({
        method  : 'post',
        url     : LiveMapConstants.API_BASE_PATH + 'vehicle_route',
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
