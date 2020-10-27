import { configConstants, commonConstants } from '../_constants';
import { commonService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * commonActions
 *
 * @package                TruckAdmin
 * @subpackage             commonActions
 * @category               Actions
 * @DateOfCreation         10 May 2018
 * @ShortDescription       This is create all comman action used in all module
 */
export const commonActions = {
    statusCheck,
    resetStatusState,
    editPut,
    resetEditState,
    renewPackage,
    resetReNewState,
    getVehicleList,
};

/**
* @DateOfCreation        05 June 2018
* @ShortDescription      This function is responsible for Get vehicle List
* @return                JSON Object
*/
function statusCheck(data) {
    return dispatch => {
        dispatch(request(data));
        commonService.statusCheck(data)
            .then(
                response => { 
                    var data = response.data;
                    if(data.response_code == configConstants.SUCCESS_CODE){                        
                        dispatch(success(data.result));                        
                    }else if(data.response_code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
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
    function request() { return { type: commonConstants.USER_STATUS_FETCH_REQUEST } }
    function success(result) { return { type: commonConstants.USER_STATUS_FETCH_SUCCESS, result } }
    function failure(error) { return { type: commonConstants.USER_STATUS_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}




function resetStatusState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : commonConstants.USER_STATUS_RESET_STATE }}
}



/**
* @DateOfCreation        05 June 2018
* @ShortDescription      This function is responsible for Get vehicle List
* @return                JSON Object
*/
function editPut(data) {
    return dispatch => {
        dispatch(request(data));
        commonService.editPut(data)
            .then(
                response => { 
                    var data = response.data;
                    if(data.response_code == configConstants.SUCCESS_CODE){                        
                        dispatch(success(data.result));                        
                    }else if(data.response_code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
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
    function request() { return { type: commonConstants.USER_EDIT_FETCH_REQUEST } }
    function success(result) { return { type: commonConstants.USER_EDIT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: commonConstants.USER_EDIT_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

function resetEditState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : commonConstants.USER_EDIT_RESET_STATE }}
}

/**
* @DateOfCreation        05 June 2018
* @ShortDescription      This function is responsible for Get vehicle List
* @return                JSON Object
*/
function renewPackage(data) {
    return dispatch => {
        dispatch(request(data));
        commonService.renewPackage(data)
            .then(
                response => { 
                    var data = response.data;
                    if(data.response_code == configConstants.SUCCESS_CODE){                        
                        dispatch(success(data.result));                        
                    }else if(data.response_code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
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
    function request() { return { type: commonConstants.USER_RENEW_FETCH_REQUEST } }
    function success(result) { return { type: commonConstants.USER_RENEW_FETCH_SUCCESS, result } }
    function failure(error) { return { type: commonConstants.USER_RENEW_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}




function resetReNewState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : commonConstants.USER_RENEW_RESET_STATE }}
}




/**
* @DateOfCreation        05 June 2018
* @ShortDescription      This function is responsible for Get vehicle List
* @return                JSON Object
*/
function getVehicleList() {
    return dispatch => {
        dispatch(request());
        commonService.getVehicleList()
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){                        
                        dispatch(success(data.result));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: commonConstants.VEHICLES_FETCH_REQUEST } }
    function success(result) { return { type: commonConstants.VEHICLES_FETCH_SUCCESS, result } }
    function failure(error) { return { type: commonConstants.VEHICLES_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}
