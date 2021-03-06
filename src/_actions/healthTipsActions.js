import { configConstants, healthTipsConstants } from '../_constants';
import { healthTipsService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * healthTipsActions
 *
 * @package                ARKAdmin
 * @subpackage             healthTipsActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const healthTipsActions = {
    getHealthTipsList,
    saveHealthTips,
    editHealthTips,
    statusChange,
    deleteHealthTip,
    resetHealthTipsState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get notification List
* @param                 JSON user, This contains full notification input data
* @return                JSON Object
*/
function getHealthTipsList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        healthTipsService.getHealthTipsList(page, pageSize, sorted, filtered)
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
    function request() { return { type: healthTipsConstants.HEALTH_TIPS_FETCH_REQUEST } }
    function success(result) { return { type: healthTipsConstants.HEALTH_TIPS_FETCH_SUCCESS, result } }
    function failure(error) { return { type: healthTipsConstants.HEALTH_TIPS_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function saveHealthTips(category, categoryList) {
    return dispatch => {
        dispatch(request({ category }));
        healthTipsService.saveHealthTips(category)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;

                    if(data.status == configConstants.SUCCESS_CODE){
                        // console.log('-----',data.data)
                        // Set new added notification
                        // const index = categoryList.findIndex(
                        //             i =>
                        //                 i.id == notification.id
                        //             );
                        // if(categoryList[index]) {
                        //     categoryList[index] = notification;
                        // }else{
                            // let category = data.data;
                            // categoryList.push(data.data);
                        // }
                        var successMsg = { 'message' : "success"};
                        // var successMsg = { 'message' : "success", 'notificationList' : notificationList };
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
    function request(notification) { return { type: healthTipsConstants.HEALTH_TIPS_SAVE_REQUEST, notification } }
    function success(successMsg) { return { type: healthTipsConstants.HEALTH_TIPS_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: healthTipsConstants.HEALTH_TIPS_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function editHealthTips(category, categoryList) {
    return dispatch => {
        dispatch(request({ category }));
        healthTipsService.editHealthTips(category)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;

                    if(data.status == configConstants.SUCCESS_CODE){
                        // console.log('-----',data.data)
                        // Set new added notification
                        // const index = categoryList.findIndex(
                        //             i =>
                        //                 i.id == notification.id
                        //             );
                        // if(categoryList[index]) {
                        //     categoryList[index] = notification;
                        // }else{
                            // let category = data.data;
                            // categoryList.push(data.data);
                        // }
                        var successMsg = { 'message' : "success"};
                        // var successMsg = { 'message' : "success", 'notificationList' : notificationList };
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
    function request(notification) { return { type: healthTipsConstants.HEALTH_TIPS_SAVE_REQUEST, notification } }
    function success(successMsg) { return { type: healthTipsConstants.HEALTH_TIPS_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: healthTipsConstants.HEALTH_TIPS_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get notification List
* @param                 JSON user, This contains full notification input data
* @return                JSON Object
*/
function statusChange(data) {
    return dispatch => {
        dispatch(request());
        healthTipsService.statusChange(data)
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
    function request() { return { type: healthTipsConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: healthTipsConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: healthTipsConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get notification List
* @param                 JSON user, This contains full notification input data
* @return                JSON Object
*/
function deleteHealthTip(data) {
    return dispatch => {
        dispatch(request());
        healthTipsService.deleteHealthTip(data)
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
    function request() { return { type: healthTipsConstants.HEALTH_TIPS_DELETE_REQUEST } }
    function success(result) { return { type: healthTipsConstants.HEALTH_TIPS_DELETE_SUCCESS, result } }
    function failure(error) { return { type: healthTipsConstants.HEALTH_TIPS_DELETE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

function resetHealthTipsState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : healthTipsConstants.HEALTH_TIPS_RESET_STATE }}
}
