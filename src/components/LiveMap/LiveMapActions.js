import { LiveMapConstants } from './LiveMapConstants';
import { LiveMapService } from './LiveMapService';
import { utilityHelper } from '../../_helpers';

/**
 * LiveMapActions
 *
 * @package                ARKAdmin
 * @subpackage             LiveMapActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const LiveMapActions = {
    getLiveMapList,
    getAllVehicle,
    resetLiveMapState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get route List
* @param                 JSON user, This contains full route input data 
* @return                JSON Object
*/
function getLiveMapList(data) {
    return dispatch => {
        dispatch(request());
        LiveMapService.getLiveMapList(data)
            .then(
                response => { 
                    var data = response.data;
                    var errorMsg;
                    if(data.code == LiveMapConstants.SUCCESS_CODE){                        
                        dispatch(success(data.result));                        
                    }else if(data.code == LiveMapConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == LiveMapConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == LiveMapConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: LiveMapConstants.LIVE_MAP_FETCH_REQUEST } }
    function success(result) { return { type: LiveMapConstants.LIVE_MAP_FETCH_SUCCESS, result } }
    function failure(error) { return { type: LiveMapConstants.LIVE_MAP_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: LiveMapConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get route List
* @param                 JSON user, This contains full route input data 
* @return                JSON Object
*/
function getAllVehicle() {
    return dispatch => {
        dispatch(request());
        LiveMapService.getAllVehicle()
            .then(
                response => { 
                    var data = response.data;
                    var errorMsg;
                    if(data.code == LiveMapConstants.SUCCESS_CODE){                        
                        dispatch(success(data.result));                        
                    }else if(data.code == LiveMapConstants.ERROR_CODE){
                        errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == LiveMapConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == LiveMapConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: LiveMapConstants.LIVE_MAP_ALL_VEHICLE_FETCH_REQUEST } }
    function success(result) { return { type: LiveMapConstants.LIVE_MAP_ALL_VEHICLE_FETCH_SUCCESS, result } }
    function failure(error) { return { type: LiveMapConstants.LIVE_MAP_ALL_VEHICLE_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: LiveMapConstants.UNAUTHENTICATE, error } }
}

function resetLiveMapState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : LiveMapConstants.LIVE_MAP_RESET_STATE }}
}