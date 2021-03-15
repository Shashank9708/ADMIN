/**
 * vendorCategoriesValidator
 *
 * @package                ARKAdmin
 * @subpackage             vendorCategoriesValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const vendorCategoriesValidator = {
    is_vendorCategoriesValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_vendorCategoriesValid(that) {
    const { detail } = that.state.vendorCategoriesForm;
    const { validate } = that.state.vendorCategoriesForm;
    const validationState = {};

    if (validator.isEmpty(validator.trim(detail.name))) {
        validationState.name = {
            isValid : false,
            message : 'Category is required.'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            vendorCategoriesForm : {
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
