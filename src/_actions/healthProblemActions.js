import { configConstants, healthProblemConstants } from '../_constants';
import { healthProblemService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * healthProblemActions
 *
 * @package                TruckAdmin
 * @subpackage             healthProblemActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const healthProblemActions = {
    getHealthProblemList,
    saveHealthProblem,
    statusChange,
    resetHealthProblemState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get healthProblem List
* @param                 JSON user, This contains full healthProblem input data
* @return                JSON Object
*/
function getHealthProblemList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        healthProblemService.getHealthProblemList(page, pageSize, sorted, filtered)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.status == configConstants.SUCCESS_CODE){
                        dispatch(success(data.data));
                    }else if(data.status == configConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.status == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: healthProblemConstants.HEALTH_PROBLEM_FETCH_REQUEST } }
    function success(result) { return { type: healthProblemConstants.HEALTH_PROBLEM_FETCH_SUCCESS, result } }
    function failure(error) { return { type: healthProblemConstants.HEALTH_PROBLEM_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function saveHealthProblem(category, categoryList) {
    return dispatch => {
        dispatch(request({ category }));
        healthProblemService.saveHealthProblem(category)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;

                    if(data.status == configConstants.SUCCESS_CODE){
                        // console.log('-----',data.data)
                        // Set new added healthProblem
                        // const index = categoryList.findIndex(
                        //             i =>
                        //                 i.id == healthProblem.id
                        //             );
                        // if(categoryList[index]) {
                        //     categoryList[index] = healthProblem;
                        // }else{
                            // let category = data.data;
                            // categoryList.push(data.data);
                        // }
                        var successMsg = { 'message' : "success"};
                        // var successMsg = { 'message' : "success", 'healthProblemList' : healthProblemList };
                        dispatch(success(successMsg));
                    }else if(data.status == configConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.status == configConstants.EXCEPTION_CODE){
                        errorMsg  = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
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
    function request(healthProblem) { return { type: healthProblemConstants.HEALTH_PROBLEM_SAVE_REQUEST, healthProblem } }
    function success(successMsg) { return { type: healthProblemConstants.HEALTH_PROBLEM_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: healthProblemConstants.HEALTH_PROBLEM_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get healthProblem List
* @param                 JSON user, This contains full healthProblem input data
* @return                JSON Object
*/
function statusChange(data) {
    return dispatch => {
        dispatch(request());
        healthProblemService.statusChange(data)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.status == configConstants.SUCCESS_CODE){
                        dispatch(success(data.data));
                    }else if(data.status == configConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.status == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: healthProblemConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: healthProblemConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: healthProblemConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

function resetHealthProblemState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : healthProblemConstants.HEALTH_PROBLEM_RESET_STATE }}
}
