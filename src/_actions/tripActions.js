import { configConstants, tripConstants } from '../_constants';
import { tripService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * tripActions
 *
 * @package                ARKAdmin
 * @subpackage             tripActions
 * @category               Actions
 * @DateOfCreation         14 Aug 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const tripActions = {
    getTripsList,
    resetTripState,
    polyline,
    complaintlist,
    liabilitylist,
    liability,
    resetLiability
};

/**
* @DateOfCreation        14 Aug 2018
* @ShortDescription      This function is responsible for Get trip List
* @param                 JSON user, This contains full trip input data 
* @return                JSON Object
*/
function getTripsList(page, pageSize, sorted, filtered, vehicle_id) {
    return dispatch => {
        dispatch(request());
        tripService.getTripList(page, pageSize, sorted, filtered, vehicle_id)
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
    function request() { return { type: tripConstants.TRIP_FETCH_REQUEST } }
    function success(result) { return { type: tripConstants.TRIP_FETCH_SUCCESS, result } }
    function failure(error) { return { type: tripConstants.TRIP_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


function resetTripState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : tripConstants.TRIP_RESET_STATE }}
}



/* ********* 04march 2019 polyline code start ********** */

function polyline(data) {
    return dispatch => {
        dispatch(request());
        tripService.polyline(data)
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
    function request() { return { type: tripConstants.MAP_FETCH_REQUEST } }
    function success(result) { return { type: tripConstants.MAP_FETCH_SUCCESS, result } }
    function failure(error) { return { type: tripConstants.MAP_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/* ********* 04march 2019 polyline code end ********** */


function complaintlist() {
    return dispatch => {
        dispatch(request());
        tripService.complaintlist()
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
    function request() { return { type: tripConstants.COMPLAINT_FETCH_REQUEST } }
    function success(result) { return { type: tripConstants.COMPLAINT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: tripConstants.COMPLAINT_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


function liabilitylist() {
    return dispatch => {
        dispatch(request());
        tripService.liabilitylist()
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
    function request() { return { type: tripConstants.LIABILITY_FETCH_REQUEST } }
    function success(result) { return { type: tripConstants.LIABILITY_FETCH_SUCCESS, result } }
    function failure(error) { return { type: tripConstants.LIABILITY_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

function liability(data) {
    return dispatch => {
        dispatch(request(data));
        tripService.liability(data)
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
    function request() { return { type: tripConstants.LIABILITY_UPDATE_REQUEST } }
    function success(result) { return { type: tripConstants.LIABILITY_UPDATE_SUCCESS, result } }
    function failure(error) { return { type: tripConstants.LIABILITY_UPDATE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

function resetLiability(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : tripConstants.LIABILITY_RESET_STATE }}
}
