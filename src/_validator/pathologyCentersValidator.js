/**
 * pathologyCentersValidator
 *
 * @package                TruckAdmin
 * @subpackage             pathologyCentersValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const pathologyCentersValidator = {
    is_pathologyCentersValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_pathologyCentersValid(that) {
    const { detail } = that.state.pathologyCentersForm;
    const { validate } = that.state.pathologyCentersForm;
    const validationState = {};

    if (validator.isEmpty(validator.trim(detail.name))) {
        validationState.name = {
            isValid : false,
            message : 'Name is required.'
        }
    }

    if (validator.isEmpty(validator.trim(detail.contact_no))) {
        validationState.contact_no = {
            isValid : false,
            message : 'Number is required.'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            pathologyCentersForm : {
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
