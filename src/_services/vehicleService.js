import axios from 'axios'; 
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get vehicleService
 *
 * @package                ARKAdmin
 * @subpackage             vehicleService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const vehicleService = {
    getVehicleList
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getVehicleList() {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + 'common/getallvehicle',
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
