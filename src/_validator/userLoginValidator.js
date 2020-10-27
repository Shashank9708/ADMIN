/**
 * userLoginValidator
 *
 * @package                TruckAdmin
 * @subpackage             userLoginValidator
 * @category               Validator
 * @DateOfCreation         22 May 2018
 * @ShortDescription       This is responsible for user login validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const userLoginValidator = {
    isLoginValid
};


/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible to validate login data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isLoginValid(that) {
    const { user } = that.state.login;
    const { userValidate } = that.state.login;
    const validationState = {};

    // Check the input is number or email
    if (!validator.isInt(validator.trim(user.email))) {
        if(!validator.isEmail(validator.trim(user.email))){
            validationState.email = {
                isValid: false,
                message: 'Please enter valid email address.'
            }
        }     
    }
    else{
       if (user.email.length != 10) {
           validationState.email = {
                isValid: false,
                message: 'Please enter valid mobile number.'
            } 
       }
    }   
    
    if (validator.isEmpty(validator.trim(user.password))) {        
      validationState.password = {
            isValid: false,
            message: 'Password is required.'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            login: {
                user: {
                    ...user
                },
                userValidate:{
                    ...userValidate,
                    ...validationState
                }
            }
        });
        return false;
    }else{
        return true;
    }
}

