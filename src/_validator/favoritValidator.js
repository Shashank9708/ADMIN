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

export const favoritValidator = {
    is_favoritValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_favoritValid(that) {
    const { detail } = that.state.favoritForm;
    const { validate } = that.state.favoritForm;
    const validationState = {};
    if (!detail.category_id) {
        validationState.category_id = {
            isValid : false,
            message : 'Select Specialization'
        }
    }
    if (!detail.doc_id) {
        validationState.doc_id = {
            isValid : false,
            message : 'Select Doctor'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            favoritForm : {
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
