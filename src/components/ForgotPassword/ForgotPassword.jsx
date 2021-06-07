import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./ForgotPassword.scss";
import arklogo from "../../assets/images/arklogo.png";

/**
 * ForgotPassword
 *
 * @package                ARKAdmin
 * @subpackage             ForgotPassword
 * @category               Presentational Component
 * @DateOfCreation         20 July 2018
 * @ShortDescription       This component is reponsible to show the Forgot password form
 */
export const ForgotPassword = (props) => {
    return (
       
           <div class="forgot-password-page__container">
              
                <div className="">
                    <img className="forgot-password-page__logo" src={arklogo}/>
                </div>
                <div className="">
                    <div className="forgot-password-page__heading H4DesktopWhite">FORGOT YOUR PASSWORD</div>
                </div>                
                
                <div class="forgot-password-page__form">
                    {/* Show server side Error message */}
                    {
                        props.success_message &&
                        <Alert variant="success">
                            {props.success_message}
                        </Alert>
                    }

                    {/* Show server side Error message */}
                    {
                        props.error_message &&
                        <Alert variant="danger">
                            {props.error_message}
                        </Alert>
                    }
                    
                    <div class="">
                        <div className="">{props.payload.userValidate.email.message}</div>
                        <div className={props.payload.userValidate.email.isValid ? 'form-group' : 'form-group has-error'}>
                                <input
                                    type="text"
                                    name="email"
                                    onChange={props.handle_input_change}
                                    placeholder="Email Address / Mobile Number"
                                    value={props.email}
                                    className="form-control"
                                />
                        </div>
                    </div>
                    
                    <div className="forgot-password-page__login">
                        <Link className="CTAWhite" to="/">Go to login?</Link>
                    </div>                    
                    
                    <div class="forgot-password-page__send-btn">
                        <button
                            className="" 
                            onClick={props.handle_forgot_submit}>Send
                        </button> 
                    </div>
                </div>    
           </div>
            
    );
}
