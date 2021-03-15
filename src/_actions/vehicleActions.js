import { configConstants, vehicleConstants } from '../_constants';
import { vehicleService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * vehicleActions
 *
 * @package                ARKAdmin
 * @subpackage             vehicleActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible to handle all action related
 */
export const vehicleActions = {
    getVehicleList,
    resetVehicleState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for Get route List
* @param                 JSON user, This contains full route input data 
* @return                JSON Object
*/

function getVehicleList() {
    return dispatch => {
        dispatch(request());
        vehicleService.getVehicleList()
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
    function request() { return { type: vehicleConstants.VEHICLE_FETCH_REQUEST } }
    function success(result) { return { type: vehicleConstants.VEHICLE_FETCH_SUCCESS, result } }
    function failure(error) { return { type: vehicleConstants.VEHICLE_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


function resetVehicleState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : vehicleConstants.VEHICLE_RESET_STATE }}
}