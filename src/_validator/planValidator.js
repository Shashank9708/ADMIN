/**
 * planValidator
 *
 * @package                ARKAdmin
 * @subpackage             planValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const planValidator = {
    is_planValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_planValid(that) {
    const { detail } = that.state.planForm;
    const { validate } = that.state.planForm;
    const validationState = {};

    if (validator.isEmpty(validator.trim(detail.plan_name))) {
        validationState.plan_name = {
            isValid : false,
            message : 'Plan is required.'
        }
    }
    if (!detail.type) {
        validationState.type = {
            isValid : false,
            message : 'User type is required.'
        }
    }
    if (!detail.days) {
        validationState.days = {
            isValid : false,
            message : 'Valid days is required.'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            planForm : {
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
