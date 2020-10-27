import axios from 'axios'; 
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';

/**
 * headerService
 *
 * @package                TruckAdmin
 * @subpackage             headerService
 * @category               Service
 * @DateOfCreation         22 May 2018
 * @ShortDescription       This is responsible for calling API
 */
export const headerService = {
    logout
};

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible for remove cookies
* @return                Redirect
*/
function logout() {
    //Call the action function with dispatch
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'admin_logout',
        data    : {'user_id':userInfo.user_id},
        headers : { 
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

