import axios from 'axios'; 
import { configConstants } from '../_constants';
import { utilityHelper, history } from '../_helpers';

/**
 * loginService
 *
 * @package                TruckAdmin
 * @subpackage             loginService
 * @category               Service
 * @DateOfCreation         10 May 2018
 * @ShortDescription       This is responsible for calling API
 */
export const userLoginService = {
    login
};

/**
* @DateOfCreation        10 May 2018
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function login(user) {
   // console.log('-->>>',configConstants.API_BASE_PATH + '/auth/login')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/auth/login',
        data    : user,
        headers : { 
            'Content-Type' : 'application/json',
        }
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}



