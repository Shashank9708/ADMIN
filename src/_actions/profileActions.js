import { configConstants, profileConstants } from '../_constants';
import { profileService } from '../_services';

/**
 * profileActions
 *
 * @package                Season
 * @subpackage             profileActions
 * @category               Actions
 * @DateOfCreation         26 Sep 2018
 * @ShortDescription       This is responsible to handle all action
 */
export const profileActions = {
    updateSOS,
    updateProfilePic,
    getDoctorProfile,
    getPatientProfile,
    uploadPic,
    sendOTP,
    verifyOTP,
    getCouncil,
    getWallet,
    getWalletHistory,
    resetProfileState
};


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function updateSOS(data) {
    return dispatch => {
        dispatch(request(data));
        profileService.updateSOS(data)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: profileConstants.PROFILE_SOS_REQUEST } }
    function success(result) { return { type: profileConstants.PROFILE_SOS_SUCCESS, result } }
    function failure(error) { return { type: profileConstants.PROFILE_SOS_FAILURE, error } }
    function unauthorize(error) { return { type: profileConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function updateProfilePic(data) {
    return dispatch => {
        dispatch(request(data));
        profileService.updateProfilePic(data)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        console.log("profilePic",response)
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: profileConstants.PROFILE_PIC_REQUEST } }
    function success(result) { return { type: profileConstants.PROFILE_PIC_SUCCESS, result } }
    function failure(error) { return { type: profileConstants.PROFILE_PIC_FAILURE, error } }
    function unauthorize(error) { return { type: profileConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getDoctorProfile() {
    return dispatch => {
        dispatch(request());
        profileService.getDoctorProfile()
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        // var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: profileConstants.GET_DOCTOR_REQUEST } }
    function success(result) { return { type: profileConstants.GET_DOCTOR_SUCCESS, result } }
    function failure(error) { return { type: profileConstants.GET_DOCTOR_FAILURE, error } }
    function unauthorize(error) { return { type: profileConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getPatientProfile(patient_id) {
    return dispatch => {
        dispatch(request());
        profileService.getPatientProfile(patient_id)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        // var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: profileConstants.GET_PATIENT_REQUEST } }
    function success(result) { return { type: profileConstants.GET_PATIENT_SUCCESS, result } }
    function failure(error) { return { type: profileConstants.GET_PATIENT_FAILURE, error } }
    function unauthorize(error) { return { type: profileConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function uploadPic(data) {
    return dispatch => {
        dispatch(request(data));
        profileService.uploadPic(data)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: profileConstants.PROFILE_PATIENT_REQUEST } }
    function success(result) { return { type: profileConstants.PROFILE_PATIENT_SUCCESS, result } }
    function failure(error) { return { type: profileConstants.PROFILE_PATIENT_FAILURE, error } }
    function unauthorize(error) { return { type: profileConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function sendOTP(contact_no) {
    return dispatch => {
        dispatch(request(contact_no));
        profileService.sendOTP(contact_no)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: profileConstants.SEND_OTP_REQUEST } }
    function success(result) { return { type: profileConstants.SEND_OTP_SUCCESS, result } }
    function failure(error) { return { type: profileConstants.SEND_OTP_FAILURE, error } }
    function unauthorize(error) { return { type: profileConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function verifyOTP(otp,contact_no) {
    return dispatch => {
        dispatch(request(otp,contact_no));
        profileService.verifyOTP(otp,contact_no)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: profileConstants.VERIFY_OTP_REQUEST } }
    function success(result) { return { type: profileConstants.VERIFY_OTP_SUCCESS, result } }
    function failure(error) { return { type: profileConstants.VERIFY_OTP_FAILURE, error } }
    function unauthorize(error) { return { type: profileConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getCouncil() {
    return dispatch => {
        dispatch(request());
        profileService.getCouncil()
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: profileConstants.COUNCIL_DOCTOR_REQUEST } }
    function success(result) { return { type: profileConstants.COUNCIL_DOCTOR_SUCCESS, result } }
    function failure(error) { return { type: profileConstants.COUNCIL_DOCTOR_FAILURE, error } }
    function unauthorize(error) { return { type: profileConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getWallet(data) {
    return dispatch => {
        dispatch(request());
        profileService.getWallet(data)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: profileConstants.WALLET_REQUEST } }
    function success(result) { return { type: profileConstants.WALLET_SUCCESS, result } }
    function failure(error) { return { type: profileConstants.WALLET_FAILURE, error } }
    function unauthorize(error) { return { type: profileConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getWalletHistory(data) {
    return dispatch => {
        dispatch(request());
        profileService.getWalletHistory(data)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: profileConstants.WALLET_HISTORY_REQUEST } }
    function success(result) { return { type: profileConstants.WALLET_HISTORY_SUCCESS, result } }
    function failure(error) { return { type: profileConstants.WALLET_HISTORY_FAILURE, error } }
    function unauthorize(error) { return { type: profileConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


function resetProfileState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : profileConstants.PROFILE_RESET_STATE }}
}
