import React from 'react';
import { Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./login.scss";
import arklogo from "../../assets/images/arklogo.png";
/**
 * Login
 *
 * @package                ARKAdmin
 * @subpackage             Login
 * @category               Presentational Component
 * @DateOfCreation         16 July 2018
 * @ShortDescription       This component is reponsible to show the login form
 */
export const Login = (props) => {
    return (
            <div className="login-page__container">
                <div className="">
                    <img className="login-page__logo" src={arklogo}/>
                </div>
                <div className="">
                    <div className="login-page__heading H4DesktopWhite">SIGN IN TO ARK</div>
                </div>
                <div className="login-page__form">
                    {/* Show server side Error message */}
                    { 
                        props.error_message &&
                        <Alert bsStyle="danger">
                            { props.error_message }
                        </Alert>
                    } 
                    <div className="">
                        <div className="">{props.payload.userValidate.contact_no.message}</div>
                        <div className={props.payload.userValidate.contact_no.isValid ? 'form-group' : 'form-group has-error'}>
                            <input type="text" 
                                name="contact_no"
                                onChange={props.handle_input_change}
                                placeholder="Username"
                                value={props.payload.contact_no}
                                className="form-control" />
                        </div>

                        <div className="">{props.payload.userValidate.password.message}</div>
                        <div className={props.payload.userValidate.password.isValid ? 'form-group' : 'form-group password-field has-error'}>
                            <input type="password"
                                name="password"
                                onChange={props.handle_input_change}
                                placeholder="*******"
                                onKeyDown={props.handle_enter_press_submit}
                                className="form-control"  />
                        </div>
                        
                    </div>
                    
                    <div className="login-page__forgot-password">
                        <Link className="CTAWhite" to={'/forgotpassword'}>Forgot Password?</Link>
                    </div>
                    <div className="login-page__logn-btn">
                        <button
                            disabled={props.submitted ? 'disabled' : ''}  
                            className="" 
                            onClick={props.handle_login_submit}>{props.submitted ? 'Please Wait..' : 'Login'}
                        </button> 
                    </div>
                  
                </div>    
            </div>
           
        


        
    );
}