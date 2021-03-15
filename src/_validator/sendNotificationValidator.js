/**
 * sendNotificationValidator
 *
 * @package                ARKAdmin
 * @subpackage             sendNotificationValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const sendNotificationValidator = {
    is_sendNotificationValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_sendNotificationValid(that) {
    const { detail } = that.state.notificationForm;
    const { validate } = that.state.notificationForm;
    const validationState = {};

    if (validator.isEmpty(validator.trim(detail.title))) {
        validationState.title = {
            isValid : false,
            message : 'Title is required.'
        }
    }

    if (validator.isEmpty(validator.trim(detail.description))) {
        validationState.description = {
            isValid : false,
            message : 'Description is required.'
        }
    }

    if (validator.isEmpty(validator.trim(detail.user_type))) {
        validationState.user_type = {
            isValid : false,
            message : 'Please select notification type.'
        }
    }
    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            notificationForm : {
                detail : {
                    ...detail
                },
                validate : {
                    ...validate,
                    ...validationState
                }
            }
        });
        return false;
    }else{
        return true;
    }
}
