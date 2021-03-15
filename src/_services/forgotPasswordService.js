import axios from 'axios'; 
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';

/**
 * forgotPasswordService
 *
 * @package                ARKAdmin
 * @subpackage             forgotPasswordService
 * @category               Service
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for calling forgot password API
 */
export const forgotPasswordService = {
    getResetToken
};

/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to call forgot api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getResetToken(user) {
    var bodyFormData = new FormData();
    bodyFormData = utilityHelper.jsonToFormData(user, bodyFormData);
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'password/resetToken',
        data    : bodyFormData,
        headers: { 
            'Content-Type' : 'multipart/form-data',
        }
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

