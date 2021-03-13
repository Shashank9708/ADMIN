/**
 * productValidator
 *
 * @package                TruckAdmin
 * @subpackage             productValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const productValidator = {
    is_productValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_productValid(that) {
    const { detail } = that.state.productForm;
    const { validate } = that.state.productForm;
    const validationState = {};

    if (!detail.category_id) {
        validationState.category_id = {
            isValid : false,
            message : 'Category is required.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.product_name))) {
        validationState.product_name = {
            isValid : false,
            message : 'Product Name is required.'
        }
    }
    if (!detail.quantity) {
        validationState.quantity = {
            isValid : false,
            message : 'Quantity is required.'
        }
    }
    if (!detail.price) {
        validationState.price = {
            isValid : false,
            message : 'Price is required.'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            productForm : {
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
