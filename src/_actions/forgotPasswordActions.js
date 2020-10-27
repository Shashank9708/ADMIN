import { forgotConstants, configConstants } from '../_constants';
import { forgotPasswordService } from '../_services';
import { utilityHelper } from '../_helpers';


/**
 * forgotPasswordActions
 *
 * @package                TruckAdmin
 * @subpackage             forgotPasswordActions
 * @category               Actions
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible to handle all action related to Forgot password
 */
export const forgotPasswordActions = {
    forgotSubmit
};

/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible for submit the forgot password form
* @param                 JSON user, This contains full user input data 
* @return                JSON Object
*/
function forgotSubmit(user) {
    return dispatch => {
        dispatch(request({ user }));
        forgotPasswordService.getResetToken(user)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var success_message = data.message;
                        dispatch(success(success_message));
                    }else if(data.code == configConstants.ERROR_CODE){
                        var error_message = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(error_message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(error_message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };
    
    // Actions defination that will perform according dispatch call and send data to reducer
    function request(user)   { return   { type  : forgotConstants.FORGOT_REQUEST, user } }
    function success(success) { return   { type  : forgotConstants.FORGOT_SUCCESS, success } }
    function failure(error)  { return   { type  : forgotConstants.FORGOT_FAILURE, error } }
}

