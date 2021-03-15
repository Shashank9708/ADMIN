/**
 * appointmentValidator
 *
 * @package                ARKAdmin
 * @subpackage             appointmentValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const appointmentValidator = {
    is_appointmentValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_appointmentValid(that) {
    const { detail } = that.state.notificationForm;
    const { validate } = that.state.notificationForm;
    const validationState = {};

    if (validator.isEmpty(validator.trim(detail.en_spec))) {
        validationState.en_spec = {
            isValid : false,
            message : 'Specialization is required.'
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
