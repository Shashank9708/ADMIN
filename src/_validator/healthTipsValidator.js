/**
 * healthTipsValidator
 *
 * @package                ARKAdmin
 * @subpackage             healthTipsValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const healthTipsValidator = {
    is_healthTipsValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_healthTipsValid(that) {
    const { detail } = that.state.healthTipsForm;
    const { validate } = that.state.healthTipsForm;
    const validationState = {};

    if (validator.isEmpty(validator.trim(detail.title))) {
        validationState.title = {
            isValid : false,
            message : 'Title is required.'
        }
    }

    if (validator.isEmpty(validator.trim(detail.desc_en))) {
        validationState.desc_en = {
            isValid : false,
            message : 'Description is required.'
        }
    }

    if (validator.isEmpty(validator.trim(detail.healthtips_category_id))) {
        validationState.healthtips_category_id = {
            isValid : false,
            message : 'Select Health tips category'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            healthTipsForm : {
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
