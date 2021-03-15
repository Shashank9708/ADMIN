import React from 'react';
import { connect } from 'react-redux';
// import 'react-select/dist/react-select.css';
import { ForgotPassword } from './ForgotPassword';
import { forgotPasswordActions } from '../../_actions';
import { forgotPasswordValidator } from '../../_validator';

/**
 * ForgotPasswordContainer
 *
 * @package                ARKAdmin
 * @subpackage             ForgotPasswordContainer
 * @category               Container Component
 * @DateOfCreation         16 May 2018
 * @ShortDescription       This component is reponsible for logic for Forgot password
 */
class ForgotPasswordContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forgotPassword: {
                user: {
                    email       : '',
                },
                userValidate:{
                     email      : {isValid: true, message: ''}
                }             
            }            
        };
        
        // Bind the events to the current class
        this.handle_input_change  = this.handle_input_change.bind(this);
        this.handle_forgot_submit = this.handle_forgot_submit.bind(this);
    }
    
    /**
    * @DateOfCreation        16 May 2018
    * @ShortDescription      This function is responsible to handle changes in input state
    * @param                 Event Object
    * @return                Nothing
    */
    handle_input_change(event) {
        const { name, value }   = event.target;
        const { user }          = this.state.forgotPassword;
        const { userValidate }  = this.state.forgotPassword;
        this.setState({
            forgotPassword : {
                    userValidate:{
                        ...userValidate,
                        [name]: {
                            isValid: true,
                            message: ''
                        }
                    },
                    user : {
                        ...user,
                        [name]: value
                    }
            }
        });
    }

    /**
    * @DateOfCreation        16 May 2018
    * @ShortDescription      This function is responsible to Submit the Forgot password Form
    * @return                Nothing
    */
    handle_forgot_submit() {        

        // Check the validation of forgot password form
        if(forgotPasswordValidator.isForgotPasswordValid(this)){
            const { dispatch }  = this.props;
            const { user }      = this.state.forgotPassword;

            //Call the action function with dispatch
            dispatch(forgotPasswordActions.forgotSubmit(user));
            
        }
    }
    
     /**
    * @DateOfCreation        16 May 2018
    * @ShortDescription      This function is responsible render the forgot password form
    * @return                View
    */
    render() {
        return (
            <div >    
                <ForgotPassword 
                    success_message          = {this.props.success_message}
                    error_message            = {this.props.error_message}
                    handle_forgot_submit  = {this.handle_forgot_submit}
                    handle_input_change   = {this.handle_input_change}
                    payload             = {this.state.forgotPassword} 
                />
            </div>
        );
    }
}

/**
* @DateOfCreation        16 May 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { success_message, error_message } = state.forgotPass;
    return {
        success_message,
        error_message
    };
}

// Connect with state
const connectedForgotPasswordContainer = connect(mapStateToProps)(ForgotPasswordContainer);
export { connectedForgotPasswordContainer as ForgotPasswordContainer }; 
