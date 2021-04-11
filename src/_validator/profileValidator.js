/**
 * profileValidator
 *
 * @package                ARKAdmin
 * @subpackage             profileValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const profileValidator = {
    is_ProfileValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_ProfileValid(that) {
    const { detail } = that.state.profile;
    const { validate } = that.state.profile;
    const validationState = {};

    if (validator.isEmpty(validator.trim(detail.name))) {
        validationState.name = {
            isValid : false,
            message : 'Name is required.'
        }
    }

    // Check the input is number or email
    if (!validator.isInt(validator.trim(detail.email))) {
        if(!validator.isEmail(validator.trim(detail.email))){
            validationState.email = {
                isValid: false,
                message: 'Please enter valid email address.'
            }
        }     
    }
    if (detail.contact_no.length !== 10) {
       validationState.contact_no = {
            isValid: false,
            message: 'Please enter valid mobile number.'
        } 
    }
    if (!detail.registratration_number) {
       validationState.registratration_number = {
            isValid: false,
            message: 'Please enter registration number.'
        } 
    }
    if (!detail.registration_year) {
       validationState.registration_year = {
            isValid: false,
            message: 'Please enter registration year.'
        } 
    }

    if (!detail.spec_id) {
        validationState.spec_id = {
            isValid : false,
            message : 'Select Specialization'
        }
    }
    if (!detail.council_id) {
        validationState.council_id = {
            isValid : false,
            message : 'Select Doctor'
        }
    }
   
    
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            profile: {
                detail: {
                    ...detail
                },
                validate:{
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

