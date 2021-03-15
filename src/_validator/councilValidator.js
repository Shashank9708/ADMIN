/**
 * councilValidator
 *
 * @package                ARKAdmin
 * @subpackage             councilValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const councilValidator = {
    is_councilValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_councilValid(that) {
    const { detail } = that.state.councilForm;
    const { validate } = that.state.councilForm;
    const validationState = {};

    if (validator.isEmpty(validator.trim(detail.council_title))) {
        validationState.council_title = {
            isValid : false,
            message : 'Council is required.'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            councilForm : {
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
