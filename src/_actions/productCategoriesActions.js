import { configConstants, productCategoriesConstants } from '../_constants';
import { productCategoriesService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * productCategoriesActions
 *
 * @package                ARKAdmin
 * @subpackage             productCategoriesActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const productCategoriesActions = {
    getProductCategoriesList,
    saveProductCategories,
    statusChange,
    deleteProductCategory,
    resetProductCategoriesState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get productCategories List
* @param                 JSON user, This contains full productCategories input data
* @return                JSON Object
*/
function getProductCategoriesList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        productCategoriesService.getProductCategoriesList(page, pageSize, sorted, filtered)
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
    function request() { return { type: productCategoriesConstants.PRODUCT_CAT_FETCH_REQUEST } }
    function success(result) { return { type: productCategoriesConstants.PRODUCT_CAT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: productCategoriesConstants.PRODUCT_CAT_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function saveProductCategories(category, categoryList) {
    return dispatch => {
        dispatch(request({ category }));
        productCategoriesService.saveProductCategories(category)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;

                    if(data.status == configConstants.SUCCESS_CODE){
                        // console.log('-----',data.data)
                        // Set new added productCategories
                        // const index = categoryList.findIndex(
                        //             i =>
                        //                 i.id == productCategories.id
                        //             );
                        // if(categoryList[index]) {
                        //     categoryList[index] = productCategories;
                        // }else{
                            // let category = data.data;
                            // categoryList.push(data.data);
                        // }
                        var successMsg = { 'message' : "success"};
                        // var successMsg = { 'message' : "success", 'productCategoriesList' : productCategoriesList };
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
    function request(productCategories) { return { type: productCategoriesConstants.PRODUCT_CAT_SAVE_REQUEST, productCategories } }
    function success(successMsg) { return { type: productCategoriesConstants.PRODUCT_CAT_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: productCategoriesConstants.PRODUCT_CAT_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get productCategories List
* @param                 JSON user, This contains full productCategories input data
* @return                JSON Object
*/
function statusChange(data) {
    return dispatch => {
        dispatch(request());
        productCategoriesService.statusChange(data)
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
    function request() { return { type: productCategoriesConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: productCategoriesConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: productCategoriesConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get product List
* @param                 JSON user, This contains full product input data
* @return                JSON Object
*/
function deleteProductCategory(data) {
    return dispatch => {
        dispatch(request());
        productCategoriesService.deleteProductCategory(data)
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
    function request() { return { type: productCategoriesConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: productCategoriesConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: productCategoriesConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


function resetProductCategoriesState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : productCategoriesConstants.PRODUCT_CAT_RESET_STATE }}
}
