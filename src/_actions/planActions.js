import { configConstants, planConstants } from '../_constants';
import { planService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * planActions
 *
 * @package                ARKAdmin
 * @subpackage             planActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const planActions = {
    getPlanList,
    savePlan,
    statusChange,
    deletePlan,
    resetPlanState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get plan List
* @param                 JSON user, This contains full plan input data
* @return                JSON Object
*/
function getPlanList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        planService.getPlanList(page, pageSize, sorted, filtered)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.status == configConstants.SUCCESS_CODE){
                        dispatch(success(data.data));
                    }else if(data.status == configConstants.ERROR_CODE){
                        // errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(data.error));
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
    function request() { return { type: planConstants.PLAN_FETCH_REQUEST } }
    function success(result) { return { type: planConstants.PLAN_FETCH_SUCCESS, result } }
    function failure(error) { return { type: planConstants.PLAN_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function savePlan(plan, planList) {
    return dispatch => {
        dispatch(request({ plan }));
        planService.savePlan(plan)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;

                    if(data.status == configConstants.SUCCESS_CODE){
                        // console.log('-----',data.data)
                        // Set new added plan
                        // const index = planList.findIndex(
                        //             i =>
                        //                 i.id == plan.id
                        //             );
                        // if(planList[index]) {
                        //     planList[index] = plan;
                        // }else{
                            // let plan = data.data;
                            // categoryList.push(data.data);
                        // }
                        var successMsg = { 'message' : "success"};
                        // var successMsg = { 'message' : "success", 'planList' : planList };
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
    function request(plan) { return { type: planConstants.PLAN_SAVE_REQUEST, plan } }
    function success(successMsg) { return { type: planConstants.PLAN_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: planConstants.PLAN_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get plan List
* @param                 JSON user, This contains full plan input data
* @return                JSON Object
*/
function statusChange(data) {
    return dispatch => {
        dispatch(request());
        planService.statusChange(data)
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
    function request() { return { type: planConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: planConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: planConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get vendor List
* @param                 JSON user, This contains full vendor input data
* @return                JSON Object
*/
function deletePlan(data) {
    return dispatch => {
        dispatch(request());
        planService.deletePlan(data)
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
    function request() { return { type: planConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: planConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: planConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


function resetPlanState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : planConstants.PLAN_RESET_STATE }}
}
