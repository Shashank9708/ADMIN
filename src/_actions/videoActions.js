import { configConstants, videoConstants } from '../_constants';
import { videoService } from '../_services';

/**
 * videoActions
 *
 * @package                Luxury Car
 * @subpackage             videoActions
 * @category               Actions
 * @DateOfCreation         26 Sep 2018
 * @ShortDescription       This is responsible to handle all action
 */
export const videoActions = {
    sendVideoCallByServer,
    createRoom,
    resetFirstState
};


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function sendVideoCallByServer(data) {
    return dispatch => {
        dispatch(request(data));
        videoService.sendVideoCallByServer(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(response.status !== 200){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                            errorMsg = data.message;
                            dispatch(unauthorize(errorMsg));
                        }else{
                            dispatch(failure(response));
                        }
                    }else{
                        dispatch(serverDown(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: videoConstants.VIDEO_ROOM_ID_SERVER_REQUEST } }
    function success(result) { return { type: videoConstants.VIDEO_ROOM_ID_SERVER_SUCCESS, result } }
    function failure(error) { return { type: videoConstants.VIDEO_ROOM_ID_SERVER_FAILURE, error } }
    function unauthorize(error) { return { type: videoConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function createRoom() {
    return dispatch => {
        dispatch(request());
        videoService.createRoom()
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            return data
                            dispatch(success(data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(response.status !== 200){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                            errorMsg = data.message;
                            dispatch(unauthorize(errorMsg));
                        }else{
                            dispatch(failure(response));
                        }
                    }else{
                        dispatch(serverDown(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: videoConstants.VIDEO_ROOM_ID_SERVER_REQUEST } }
    function success(result) { return { type: videoConstants.VIDEO_ROOM_ID_SERVER_SUCCESS, result } }
    function failure(error) { return { type: videoConstants.VIDEO_ROOM_ID_SERVER_FAILURE, error } }
    function unauthorize(error) { return { type: videoConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}



function resetFirstState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : videoConstants.FIRST_RESET_STATE }}
}
