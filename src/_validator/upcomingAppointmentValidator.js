/**
 * upcomingAppointmentValidator
 *
 * @package                ARKAdmin
 * @subpackage             upcomingAppointmentValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const upcomingAppointmentValidator = {
    is_upcomingAppointmentValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function is_upcomingAppointmentValid(that) {
    const { detail } = that.state.Form;
    const { validate } = that.state.Form;
    const validationState = {};
    console.log("detail",detail)
    if (validator.isEmpty(validator.trim(detail.name))) {
        validationState.name = {
            isValid : false,
            message : 'Name is required.'
        }
    }

    if (detail.contact_no.length !== 10) {
        validationState.contact_no = {
            isValid: false,
            message: 'Please enter valid mobile number.'
        } 
    }

    if (!detail.clinic_id) {
        validationState.clinic_id = {
            isValid : false,
            message : 'Select clinic'
        }
    }
    
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            Form: {
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

