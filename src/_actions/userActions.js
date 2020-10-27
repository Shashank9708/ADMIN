import { configConstants, userConstants } from '../_constants';
import { userService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * userActions
 *
 * @package                TruckAdmin
 * @subpackage             userActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const userActions = {
    getUserList,
    showUserList,
    resetUserState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get user List
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function getUserList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        userService.getUserList(page, pageSize, sorted, filtered)
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
    function request() { return { type: userConstants.USER_FETCH_REQUEST } }
    function success(result) { return { type: userConstants.USER_FETCH_SUCCESS, result } }
    function failure(error) { return { type: userConstants.USER_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get user List
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function showUserList(type) {
    return dispatch => {
        dispatch(request());
        userService.showUserList(type)
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
    function request() { return { type: userConstants.CHATUSER_FETCH_REQUEST } }
    function success(result) { return { type: userConstants.CHATUSER_FETCH_SUCCESS, result } }
    function failure(error) { return { type: userConstants.CHATUSER_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        01 August 2018
* @ShortDescription      This function is responsible for sending email for user pin
* @param                 JSON user, This contains full companyUser input data
* @return                JSON Object
*/
function sendMail(data) {
    return dispatch => {
        dispatch(request());
        userService.sendMail(data)
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
    function request() { return { type: userConstants.USER_SAVE_REQUEST } }
    function success(result) { return { type: userConstants.USER_SAVE_SUCCESS, result } }
    function failure(error) { return { type: userConstants.USER_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


function resetUserState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : userConstants.USER_RESET_STATE }}
}