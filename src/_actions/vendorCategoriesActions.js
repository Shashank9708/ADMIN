import { configConstants, vendorCategoriesConstants } from '../_constants';
import { vendorCategoriesService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * vendorCategoriesActions
 *
 * @package                ARKAdmin
 * @subpackage             vendorCategoriesActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const vendorCategoriesActions = {
    getVendorCategoriesList,
    saveVendorCategories,
    statusChange,
    deleteVendorCategory,
    resetVendorCategoriesState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get vendorCategories List
* @param                 JSON user, This contains full vendorCategories input data
* @return                JSON Object
*/
function getVendorCategoriesList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        vendorCategoriesService.getVendorCategoriesList(page, pageSize, sorted, filtered)
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
    function request() { return { type: vendorCategoriesConstants.VENDOR_CAT_FETCH_REQUEST } }
    function success(result) { return { type: vendorCategoriesConstants.VENDOR_CAT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: vendorCategoriesConstants.VENDOR_CAT_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function saveVendorCategories(category, categoryList) {
    return dispatch => {
        dispatch(request({ category }));
        vendorCategoriesService.saveVendorCategories(category)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;

                    if(data.status == configConstants.SUCCESS_CODE){
                        // console.log('-----',data.data)
                        // Set new added vendorCategories
                        // const index = categoryList.findIndex(
                        //             i =>
                        //                 i.id == vendorCategories.id
                        //             );
                        // if(categoryList[index]) {
                        //     categoryList[index] = vendorCategories;
                        // }else{
                            // let category = data.data;
                            // categoryList.push(data.data);
                        // }
                        var successMsg = { 'message' : "success"};
                        // var successMsg = { 'message' : "success", 'vendorCategoriesList' : vendorCategoriesList };
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
    function request(vendorCategories) { return { type: vendorCategoriesConstants.VENDOR_CAT_SAVE_REQUEST, vendorCategories } }
    function success(successMsg) { return { type: vendorCategoriesConstants.VENDOR_CAT_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: vendorCategoriesConstants.VENDOR_CAT_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get vendorCategories List
* @param                 JSON user, This contains full vendorCategories input data
* @return                JSON Object
*/
function statusChange(data) {
    return dispatch => {
        dispatch(request());
        vendorCategoriesService.statusChange(data)
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
    function request() { return { type: vendorCategoriesConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: vendorCategoriesConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: vendorCategoriesConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get vendor List
* @param                 JSON user, This contains full vendor input data
* @return                JSON Object
*/
function deleteVendorCategory(data) {
    return dispatch => {
        dispatch(request());
        vendorCategoriesService.deleteVendorCategory(data)
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
    function request() { return { type: vendorCategoriesConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: vendorCategoriesConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: vendorCategoriesConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


function resetVendorCategoriesState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : vendorCategoriesConstants.VENDOR_CAT_RESET_STATE }}
}
