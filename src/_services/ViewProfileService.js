import axios from 'axios'; 
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get ViewProfileService
 *
 * @package                TruckAdmin
 * @subpackage             ViewProfileService
 * @category               Service
 * @DateOfCreation         19 Mar 2019
 * @ShortDescription       This is responsible for calling API
 */
export const ViewProfileService = {
    getViewProfileList
};

/**
* @DateOfCreation        19 Mar 2019
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getViewProfileList(data) {
    var bodyFormData = new FormData();
    //bodyFormData.append('user_image', data);
    bodyFormData = utilityHelper.jsonToFormData(data, bodyFormData);
    var getUserInfo = utilityHelper.getUserInfo();
    
    //bodyFormData.append('id',getUserInfo._id);

    bodyFormData = utilityHelper.jsonToFormData({"id":getUserInfo._id}, bodyFormData);
    
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'common/viewprofile',
        data : bodyFormData,
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