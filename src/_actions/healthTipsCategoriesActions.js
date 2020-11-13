import { configConstants, healthTipsCategoriesConstants } from '../_constants';
import { healthTipsCategoriesService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * healthTipsCategoriesActions
 *
 * @package                TruckAdmin
 * @subpackage             healthTipsCategoriesActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const healthTipsCategoriesActions = {
    getHealthTipsCategoriesList,
    saveHealthTipsCategories,
    statusChange,
    resetHealthTipsCategoriesState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get healthTipsCategories List
* @param                 JSON user, This contains full healthTipsCategories input data
* @return                JSON Object
*/
function getHealthTipsCategoriesList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        healthTipsCategoriesService.getHealthTipsCategoriesList(page, pageSize, sorted, filtered)
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
    function request() { return { type: healthTipsCategoriesConstants.HEALTH_TIPS_CAT_FETCH_REQUEST } }
    function success(result) { return { type: healthTipsCategoriesConstants.HEALTH_TIPS_CAT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: healthTipsCategoriesConstants.HEALTH_TIPS_CAT_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function saveHealthTipsCategories(category, categoryList) {
    return dispatch => {
        dispatch(request({ category }));
        healthTipsCategoriesService.saveHealthTipsCategories(category)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;

                    if(data.status == configConstants.SUCCESS_CODE){
                        // console.log('-----',data.data)
                        // Set new added healthTipsCategories
                        // const index = categoryList.findIndex(
                        //             i =>
                        //                 i.id == healthTipsCategories.id
                        //             );
                        // if(categoryList[index]) {
                        //     categoryList[index] = healthTipsCategories;
                        // }else{
                            // let category = data.data;
                            // categoryList.push(data.data);
                        // }
                        var successMsg = { 'message' : "success"};
                        // var successMsg = { 'message' : "success", 'healthTipsCategoriesList' : healthTipsCategoriesList };
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
    function request(healthTipsCategories) { return { type: healthTipsCategoriesConstants.HEALTH_TIPS_CAT_SAVE_REQUEST, healthTipsCategories } }
    function success(successMsg) { return { type: healthTipsCategoriesConstants.HEALTH_TIPS_CAT_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: healthTipsCategoriesConstants.HEALTH_TIPS_CAT_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get healthTipsCategories List
* @param                 JSON user, This contains full healthTipsCategories input data
* @return                JSON Object
*/
function statusChange(data) {
    return dispatch => {
        dispatch(request());
        healthTipsCategoriesService.statusChange(data)
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
    function request() { return { type: healthTipsCategoriesConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: healthTipsCategoriesConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: healthTipsCategoriesConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

function resetHealthTipsCategoriesState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : healthTipsCategoriesConstants.HEALTH_TIPS_CAT_RESET_STATE }}
}
