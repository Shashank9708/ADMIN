import { loginConstants, configConstants } from '../_constants';
import { userLoginService } from '../_services';
import { utilityHelper} from '../_helpers';
import { sessionService } from '../_packages/redux-react-session';
import jwtdecode from 'jwt-decode'
import axios from "axios";

/**
 * userLoginActions
 *
 * @package                TruckAdmin
 * @subpackage             userLoginActions
 * @category               Actions
 * @DateOfCreation         10 May 2018
 * @ShortDescription       This is responsible to handle all action related to login
 */
export const userLoginActions = {
    loginSubmit,
    updateState
};

/**
* @DateOfCreation        10 May 2018
* @ShortDescription      This function is responsible for submit the login form
* @param                 JSON user, This contains full user input data 
* @return                JSON Object
*/
function loginSubmit(user) {
    return dispatch => {
        dispatch(request({ user }));
        userLoginService.login(user)
            .then(
                response => { 
                    var data = response.data;
                    var error_message;   
                    if(data.status == configConstants.SUCCESS_CODE){
                        // Set access token and user in cookies 
                        sessionService.saveSession(data.token);
                        axios.defaults.headers.common["Authorization"] = data.token;
                        let user = jwtdecode(data.token);
                        localStorage.setItem('accessToken', data.token);
                        sessionService.saveUser(user);
                        dispatch(success(user));                        
                    }else if(data.status == configConstants.ERROR_CODE){
                        error_message = data.message;
                        dispatch(failure(error_message));

                    }else if(data.status == configConstants.EXCEPTION_CODE){
                        error_message  = data.message;
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
    function request(user) { return { type: loginConstants.LOGIN_REQUEST, user } }
    function success(result) { return { type: loginConstants.LOGIN_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
}

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function updateState(){
     return dispatch => {
        dispatch(request());
    }
    function request() { return { type: loginConstants.LOGIN_UPDATE_STATE } }
}

