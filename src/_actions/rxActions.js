import { configConstants, rxConstants } from '../_constants';
import { rxService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * rxActions
 *
 * @package                ARKAdmin
 * @subpackage             rxActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const rxActions = {
    getRXList,
    saveRX,
    editRX,
    statusChange,
    resetRXState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get rx List
* @param                 JSON user, This contains full rx input data
* @return                JSON Object
*/
function getRXList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        rxService.getRXList(page, pageSize, sorted, filtered)
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
    function request() { return { type: rxConstants.RX_FETCH_REQUEST } }
    function success(result) { return { type: rxConstants.RX_FETCH_SUCCESS, result } }
    function failure(error) { return { type: rxConstants.RX_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function saveRX(category, categoryList) {
    return dispatch => {
        dispatch(request({ category }));
        rxService.saveRX(category)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;

                    if(data.status == configConstants.SUCCESS_CODE){
                        // console.log('-----',data.data)
                        // Set new added rx
                        // const index = categoryList.findIndex(
                        //             i =>
                        //                 i.id == rx.id
                        //             );
                        // if(categoryList[index]) {
                        //     categoryList[index] = rx;
                        // }else{
                            // let category = data.data;
                            // categoryList.push(data.data);
                        // }
                        var successMsg = { 'message' : "success"};
                        // var successMsg = { 'message' : "success", 'rxList' : rxList };
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
    function request(rx) { return { type: rxConstants.RX_SAVE_REQUEST, rx } }
    function success(successMsg) { return { type: rxConstants.RX_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: rxConstants.RX_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}
/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function editRX(category, categoryList) {
    return dispatch => {
        dispatch(request({ category }));
        rxService.editRX(category)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;

                    if(data.status == configConstants.SUCCESS_CODE){
                        // console.log('-----',data.data)
                        // Set new added rx
                        // const index = categoryList.findIndex(
                        //             i =>
                        //                 i.id == rx.id
                        //             );
                        // if(categoryList[index]) {
                        //     categoryList[index] = rx;
                        // }else{
                            // let category = data.data;
                            // categoryList.push(data.data);
                        // }
                        var successMsg = { 'message' : "success"};
                        // var successMsg = { 'message' : "success", 'rxList' : rxList };
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
    function request(rx) { return { type: rxConstants.RX_SAVE_REQUEST, rx } }
    function success(successMsg) { return { type: rxConstants.RX_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: rxConstants.RX_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get rx List
* @param                 JSON user, This contains full rx input data
* @return                JSON Object
*/
function statusChange(data) {
    return dispatch => {
        dispatch(request());
        rxService.statusChange(data)
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
    function request() { return { type: rxConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: rxConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: rxConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

function resetRXState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : rxConstants.RX_RESET_STATE }}
}
