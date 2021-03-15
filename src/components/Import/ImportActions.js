import { ImportConstants } from './ImportConstants';
import { ImportService } from './ImportService';
import { utilityHelper} from '../../_helpers';

/**
 * ImportActions
 *
 * @package                ARKAdmin
 * @subpackage             ImportActions
 * @category               Actions
 * @DateOfCreation         10 May 2018
 * @ShortDescription       This is responsible to handle all action related to import
 */
export const ImportActions = {
    validationImport,
    saveImport,
    resetImportState
};

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Import Route allocation Validation
* @param                 JSON user, This contains full user input data 
* @return                JSON Object
*/
function validationImport(data, importType, importData) {
    return dispatch => {
        dispatch(request({ data }));
            ImportService.validationImport(data, importType, importData)
            .then(
                response => { 
                    var data = response.data;
                    var errorMsg;
                    if(data.code == ImportConstants.SUCCESS_CODE){                        
                        var successMsg = { 'message' : data.message, 'result' : data.result };
                        dispatch(success(successMsg));                     
                    }else if(data.code == ImportConstants.ERROR_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == ImportConstants.EXCEPTION_CODE){
                        errorMsg  = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == ImportConstants.UNAUTHENTICATE_CODE){
                        errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request(data) { return { type: ImportConstants.IMPORT_FETCH_REQUEST, data } }
    function success(successMsg) { return { type: ImportConstants.IMPORT_FETCH_SUCCESS, successMsg } }
    function failure(error) { return { type: ImportConstants.IMPORT_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: ImportConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Route form
* @param                 JSON user, This contains full user input data 
* @return                JSON Object
*/
function saveImport(data, importSave, importType) {
    return dispatch => {
        dispatch(request({ data }));
        ImportService.saveImport(data, importSave, importType)
            .then(
                response => { 
                    var data = response.data;
                    var errorMsg;
                    if(data.response_code == ImportConstants.SUCCESS_CODE){                        
                        var successMsg = { 'message' : data.message, 'detail' : data.result};
                        dispatch(success(successMsg));                     
                    }else if(data.response_code == ImportConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == ImportConstants.EXCEPTION_CODE){
                        errorMsg  = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == ImportConstants.UNAUTHENTICATE_CODE){
                        errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request(data) { return { type: ImportConstants.IMPORT_SAVE_REQUEST, data } }
    function success(successMsg) { return { type: ImportConstants.IMPORT_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: ImportConstants.IMPORT_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: ImportConstants.UNAUTHENTICATE, error } }
}


function resetImportState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : ImportConstants.IMPORT_RESET_STATE }}
}