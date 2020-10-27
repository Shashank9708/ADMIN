import { configConstants, driverConstants } from '../_constants';
import { driverService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * driverActions
 *
 * @package                TruckAdmin
 * @subpackage             driverActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const driverActions = {
    getDriverList,
    resetDriverState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get driver List
* @param                 JSON driver, This contains full driver input data
* @return                JSON Object
*/
function getDriverList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        driverService.getDriverList(page, pageSize, sorted, filtered)
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
    function request() { return { type: driverConstants.DRIVER_FETCH_REQUEST } }
    function success(result) { return { type: driverConstants.DRIVER_FETCH_SUCCESS, result } }
    function failure(error) { return { type: driverConstants.DRIVER_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        01 August 2018
* @ShortDescription      This function is responsible for sending email for driver pin
* @param                 JSON driver, This contains full companyDriver input data
* @return                JSON Object
*/
function sendMail(data) {
    return dispatch => {
        dispatch(request());
        driverService.sendMail(data)
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
    function request() { return { type: driverConstants.DRIVER_SAVE_REQUEST } }
    function success(result) { return { type: driverConstants.DRIVER_SAVE_SUCCESS, result } }
    function failure(error) { return { type: driverConstants.DRIVER_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


function resetDriverState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : driverConstants.DRIVER_RESET_STATE }}
}
