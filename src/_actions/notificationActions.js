import { configConstants, notificationConstants } from '../_constants';
import { notificationService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * notificationActions
 *
 * @package                ARKAdmin
 * @subpackage             notificationActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const notificationActions = {
    getNotificationList,
    sendPushNotification,
    resetNotificationState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get notification List
* @param                 JSON user, This contains full notification input data
* @return                JSON Object
*/
function getNotificationList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        notificationService.getNotificationList(page, pageSize, sorted, filtered)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.code == configConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
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
    function request() { return { type: notificationConstants.NOTIFICATION_FETCH_REQUEST } }
    function success(result) { return { type: notificationConstants.NOTIFICATION_FETCH_SUCCESS, result } }
    function failure(error) { return { type: notificationConstants.NOTIFICATION_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function sendPushNotification(notification, notificationList) {
    return dispatch => {
        dispatch(request({ notification }));
        notificationService.sendPushNotification(notification)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.code == configConstants.SUCCESS_CODE){
                        // Set new added notification
                        const index = notificationList.findIndex(
                                    i =>
                                        i.admin_notification_id == notification.admin_notification_id
                                    );
                        if(notificationList[index]) {
                            notificationList[index] = notification;
                        }else{
                            notification['admin_notification_id'] = data.result.admin_notification_id;
                            notificationList.push(notification);
                        }
                        var successMsg = { 'message' : data.message, 'detail' : data.result, 'notificationList' : notificationList };
                        dispatch(success(successMsg));
                    }else if(data.code == configConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        errorMsg  = data.message;
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
    function request(notification) { return { type: notificationConstants.NOTIFICATION_SAVE_REQUEST, notification } }
    function success(successMsg) { return { type: notificationConstants.NOTIFICATION_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: notificationConstants.NOTIFICATION_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

function resetNotificationState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : notificationConstants.NOTIFICATION_RESET_STATE }}
}
