/**
 * rxValidator
 *
 * @package                ARKAdmin
 * @subpackage             rxValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const rxValidator = {
    is_rxValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_rxValid(that) {
    const { detail } = that.state.rxForm;
    const { validate } = that.state.rxForm;
    const validationState = {};

    if (!detail.name) {
        validationState.name = {
            isValid : false,
            message : 'Medicine Name is required.'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            rxForm : {
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
