import { configConstants, staffConstants } from '../_constants';
import { staffService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * staffActions
 *
 * @package                TruckAdmin
 * @subpackage             staffActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const staffActions = {
    getStaffList,
    getManagerList,
    insertManagerList,
    resetStaffState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get staff List
* @param                 JSON user, This contains full staff input data
* @return                JSON Object
*/
function getStaffList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        staffService.getStaffList(page, pageSize, sorted, filtered)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.response_code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.response_code == configConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: staffConstants.STAFF_FETCH_REQUEST } }
    function success(result) { return { type: staffConstants.STAFF_FETCH_SUCCESS, result } }
    function failure(error) { return { type: staffConstants.STAFF_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        01 August 2018
* @ShortDescription      This function is responsible for sending email for user pin
* @param                 JSON user, This contains full companyUser input data
* @return                JSON Object
*/
function getManagerList() {
    return dispatch => {
        dispatch(request());
        staffService.getManagerList()
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.response_code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.response_code == configConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: staffConstants.MANAGER_FETCH_REQUEST } }
    function success(result) { return { type: staffConstants.MANAGER_FETCH_SUCCESS, result } }
    function failure(error) { return { type: staffConstants.MANAGER_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        01 August 2018
* @ShortDescription      This function is responsible for sending email for user pin
* @param                 JSON user, This contains full companyUser input data
* @return                JSON Object
*/
function insertManagerList(data) {
    return dispatch => {
        dispatch(request(data));
        staffService.insertManagerList(data)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.response_code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.response_code == configConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.response_code == configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: staffConstants.MANAGER_SAVE_REQUEST } }
    function success(result) { return { type: staffConstants.MANAGER_SAVE_SUCCESS, result } }
    function failure(error) { return { type: staffConstants.MANAGER_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


function resetStaffState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : staffConstants.STAFF_RESET_STATE }}
}
