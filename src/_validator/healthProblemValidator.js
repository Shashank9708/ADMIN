/**
 * healthProblemValidator
 *
 * @package                ARKAdmin
 * @subpackage             healthProblemValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const healthProblemValidator = {
    is_healthProblemValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_healthProblemValid(that) {
    const { detail } = that.state.healthProblemForm;
    const { validate } = that.state.healthProblemForm;
    const validationState = {};

    if (validator.isEmpty(validator.trim(detail.health_problem_title))) {
        validationState.health_problem_title = {
            isValid : false,
            message : 'Health Problem is required.'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            healthProblemForm : {
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
