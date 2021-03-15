import { configConstants, councilConstants } from '../_constants';
import { councilService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * councilActions
 *
 * @package                ARKAdmin
 * @subpackage             councilActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const councilActions = {
    getCouncilList,
    saveCouncil,
    statusChange,
    resetCouncilState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get council List
* @param                 JSON user, This contains full council input data
* @return                JSON Object
*/
function getCouncilList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        councilService.getCouncilList(page, pageSize, sorted, filtered)
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
    function request() { return { type: councilConstants.COUNCIL_FETCH_REQUEST } }
    function success(result) { return { type: councilConstants.COUNCIL_FETCH_SUCCESS, result } }
    function failure(error) { return { type: councilConstants.COUNCIL_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        06 June 2018
* @ShortDescription      This function is responsible for submit the Add/update Employee form
* @param                 JSON user, This contains full user input data
* @return                JSON Object
*/
function saveCouncil(category, categoryList) {
    return dispatch => {
        dispatch(request({ category }));
        councilService.saveCouncil(category)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;

                    if(data.status == configConstants.SUCCESS_CODE){
                        // console.log('-----',data.data)
                        // Set new added council
                        // const index = categoryList.findIndex(
                        //             i =>
                        //                 i.id == council.id
                        //             );
                        // if(categoryList[index]) {
                        //     categoryList[index] = council;
                        // }else{
                            // let category = data.data;
                            // categoryList.push(data.data);
                        // }
                        var successMsg = { 'message' : "success"};
                        // var successMsg = { 'message' : "success", 'councilList' : councilList };
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
    function request(council) { return { type: councilConstants.COUNCIL_SAVE_REQUEST, council } }
    function success(successMsg) { return { type: councilConstants.COUNCIL_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type: councilConstants.COUNCIL_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get council List
* @param                 JSON user, This contains full council input data
* @return                JSON Object
*/
function statusChange(data) {
    return dispatch => {
        dispatch(request());
        councilService.statusChange(data)
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
    function request() { return { type: councilConstants.STATUS_CHANGE_REQUEST } }
    function success(result) { return { type: councilConstants.STATUS_CHANGE_SUCCESS, result } }
    function failure(error) { return { type: councilConstants.STATUS_CHANGE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

function resetCouncilState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : councilConstants.COUNCIL_RESET_STATE }}
}
