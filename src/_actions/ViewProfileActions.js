import { configConstants, ViewProfileConstants } from '../_constants';
import { ViewProfileService } from '../_services';
import { utilityHelper} from '../_helpers';

/**
 * tripActions
 *
 * @package                TruckAdmin
 * @subpackage             ViewProfileActions
 * @category               Actions
 * @DateOfCreation         19 Mar 2019
 * @ShortDescription       This is responsible to handle all action related
 */
export const ViewProfileActions = {
    getViewProfileList
};

/**
* @DateOfCreation        19 Mar 2019
* @ShortDescription      This function is responsible for Get trip List
* @param                 JSON user, This contains full trip input data 
* @return                JSON Object
*/

function getViewProfileList(data) {
    return dispatch => {
        dispatch(request());
        ViewProfileService.getViewProfileList(data)
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
    function request() { return { type: ViewProfileConstants.VIEWPROFILE_FETCH_REQUEST } }
    function success(result) { return { type: ViewProfileConstants.VIEWPROFILE_FETCH_SUCCESS, result } }
    function failure(error) { return { type: ViewProfileConstants.VIEWPROFILE_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}