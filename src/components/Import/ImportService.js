import axios from 'axios'; 
import { ImportConstants } from './ImportConstants';
import { utilityHelper } from '../../_helpers';

/**
 * Import
 *
 * @package                ARKAdmin
 * @subpackage             Import
 * @category               Service
 * @DateOfCreation         27 June 2018
 * @ShortDescription       This is responsible for calling API
 */
export const ImportService = {
    validationImport,
    saveImport
};


/**
* @DateOfCreation        27 June 2018
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function validationImport(fileData, importType, importData) {    
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var bodyFormData = new FormData();
    bodyFormData.append('import', fileData);
    //table structure with validation rules
    bodyFormData.append('importData',importData);
    
    return axios({
        method  : 'post',
        url     : ImportConstants.API_BASE_PATH + importType,
        data    : bodyFormData,
        headers: { 
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
* @DateOfCreation        27 June 2018
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function saveImport(fileData, importSave, importType) {
    
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var id = utilityHelper.getUserInfo();

    var bodyFormData = new FormData();
    bodyFormData.append('csv', fileData);
    bodyFormData.append('user_id',id._id);
    return axios({
        method  : 'post',
        url     : ImportConstants.API_BASE_PATH + importType,
        data    : bodyFormData,
        headers: { 
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