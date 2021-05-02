import { configConstants, medicalStoresConstants } from '../_constants';
import { medicalStoresService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * medicalStoresActions
 *
 * @package                ARKAdmin
 * @subpackage             medicalStoresActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const medicalStoresActions = {
    getMedicalStoresList,
    saveMedicalStores,
    statusChange,
    getMedicineOrder,
    changeMedicineOrderStatus,
    resetMedicalStoresState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get notification List
* @param                 JSON user, This contains full notification input data
* @return                JSON Object
*/
function getMedicalStoresList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        medicalStoresService.getMedicalStoresList(page, pageSize, sorted, filtered)
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
    function request() { return { type: medicalStoresConstants.MEDICAL_STORES_FETCH_REQUEST } }
    function success(result) { return { type: medicalStoresConstants.MEDICAL_STORES_FETCH_SUCCESS, result } }
    function failure(error) { return { type: medicalStoresConstants.MEDICAL_STORES_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function saveMedicalStores(category, categoryList) {
    return dispatch => {
        dispatch(request({ category }));
        medicalStoresService.saveMedicalStores(category)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.status === 201){
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
                    }else if(data.status == configConstants.SUCCESS_CODE){
                        var successMsg = { 'message' : "success"};
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
    function request(notification) { return { type: medicalStoresConstants.MEDICAL_STORES_SAVE_REQUEST, notification } }
    function success(successMsg) { return { type: medicalStoresConstants.MEDICAL_STORES_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: medicalStoresConstants.MEDICAL_STORES_SAVE_FAILURE, error } }
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
        medicalStoresService.statusChange(data)
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
    function request() { return { type: medicalStoresConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: medicalStoresConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: medicalStoresConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get notification List
* @param                 JSON user, This contains full notification input data
* @return                JSON Object
*/
function getMedicineOrder(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        medicalStoresService.getMedicineOrder(page, pageSize, sorted, filtered)
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
    function request() { return { type: medicalStoresConstants.MEDICAL_STORES_FETCH_REQUEST } }
    function success(result) { return { type: medicalStoresConstants.MEDICAL_STORES_FETCH_SUCCESS, result } }
    function failure(error) { return { type: medicalStoresConstants.MEDICAL_STORES_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get notification List
* @param                 JSON user, This contains full notification input data
* @return                JSON Object
*/
function changeMedicineOrderStatus(data) {
    return dispatch => {
        dispatch(request());
        medicalStoresService.changeMedicineOrderStatus(data)
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
    function request() { return { type: medicalStoresConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: medicalStoresConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: medicalStoresConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


function resetMedicalStoresState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : medicalStoresConstants.MEDICAL_STORES_RESET_STATE }}
}
