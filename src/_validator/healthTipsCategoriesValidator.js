/**
 * healthTipsCategoriesValidator
 *
 * @package                ARKAdmin
 * @subpackage             healthTipsCategoriesValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const healthTipsCategoriesValidator = {
    is_healthTipsCategoriesValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_healthTipsCategoriesValid(that) {
    const { detail } = that.state.healthTipsCategoriesForm;
    const { validate } = that.state.healthTipsCategoriesForm;
    const validationState = {};

    if (validator.isEmpty(validator.trim(detail.title_en))) {
        validationState.title_en = {
            isValid : false,
            message : 'Category is required.'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            healthTipsCategoriesForm : {
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
