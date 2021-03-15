import { configConstants, productConstants } from '../_constants';
import { productService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * productActions
 *
 * @package                ARKAdmin
 * @subpackage             productActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const productActions = {
    getProductList,
    saveProduct,
    statusChange,
    deleteProduct,
    resetProductState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get product List
* @param                 JSON user, This contains full product input data
* @return                JSON Object
*/
function getProductList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        productService.getProductList(page, pageSize, sorted, filtered)
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
    function request() { return { type: productConstants.PRODUCT_FETCH_REQUEST } }
    function success(result) { return { type: productConstants.PRODUCT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: productConstants.PRODUCT_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function saveProduct(category, categoryList) {
    return dispatch => {
        dispatch(request({ category }));
        productService.saveProduct(category)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;

                    if(data.status == configConstants.SUCCESS_CODE){
                        // console.log('-----',data.data)
                        // Set new added product
                        // const index = categoryList.findIndex(
                        //             i =>
                        //                 i.id == product.id
                        //             );
                        // if(categoryList[index]) {
                        //     categoryList[index] = product;
                        // }else{
                            // let category = data.data;
                            // categoryList.push(data.data);
                        // }
                        var successMsg = { 'message' : "success"};
                        // var successMsg = { 'message' : "success", 'productList' : productList };
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
    function request(product) { return { type: productConstants.PRODUCT_SAVE_REQUEST, product } }
    function success(successMsg) { return { type: productConstants.PRODUCT_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: productConstants.PRODUCT_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get product List
* @param                 JSON user, This contains full product input data
* @return                JSON Object
*/
function statusChange(data) {
    return dispatch => {
        dispatch(request());
        productService.statusChange(data)
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
    function request() { return { type: productConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: productConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: productConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get product List
* @param                 JSON user, This contains full product input data
* @return                JSON Object
*/
function deleteProduct(data) {
    return dispatch => {
        dispatch(request());
        productService.deleteProduct(data)
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
    function request() { return { type: productConstants.PRODUCT_DELETE_REQUEST } }
    function success(result) { return { type: productConstants.PRODUCT_DELETE_SUCCESS, result } }
    function failure(error) { return { type: productConstants.PRODUCT_DELETE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

function resetProductState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : productConstants.PRODUCT_RESET_STATE }}
}
