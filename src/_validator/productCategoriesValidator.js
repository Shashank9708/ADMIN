/**
 * productCategoriesValidator
 *
 * @package                ARKAdmin
 * @subpackage             productCategoriesValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const productCategoriesValidator = {
    is_productCategoriesValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_productCategoriesValid(that) {
    const { detail } = that.state.productCategoriesForm;
    const { validate } = that.state.productCategoriesForm;
    const validationState = {};

    if (validator.isEmpty(validator.trim(detail.name))) {
        validationState.name = {
            isValid : false,
            message : 'Category is required.'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            productCategoriesForm : {
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
