import React from 'react';
import { Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
/**
 * Login
 *
 * @package                TruckAdmin
 * @subpackage             Login
 * @category               Presentational Component
 * @DateOfCreation         16 July 2018
 * @ShortDescription       This component is reponsible to show the login form
 */
export const Login = (props) => {
    return (
        <section className="starts">
           <div className="container">
              <h2 className="heading">Welcome!</h2> 
                   <a className="logoimg"><img src="src/assets/img/logo1.jpg"/></a>
                     <h3 className="heading1">ARK</h3>
                <div className="row">
                    {/* Show server side Error message */}
                    { props.error_message &&
                        <Alert bsStyle="danger">
                                { props.error_message }
                        </Alert>
                    } 
                  <div className="col-md-7">
                   <div className="group">
                        
                        
                        <div className={props.payload.userValidate.email.isValid ? 'form-group' : 'form-group has-error'}>
                            <input  type="text" 
                                    name="email"
                                    onChange={props.handle_input_change}
                                    placeholder="Username"
                                    value={props.payload.email}
                                    className="form-group" />

                            <span className="help-block">{props.payload.userValidate.email.message}</span>

                        </div>

                        <div className={props.payload.userValidate.password.isValid ? 'form-group password-field' : 'form-group password-field has-error'}>
                            <input  type="password"
                                    name="password"
                                    onChange={props.handle_input_change}
                                    placeholder="*******"
                                    onKeyDown={props.handle_enter_press_submit}
                                    className="form-group"  />
                            
                            <span className="help-block">{props.payload.userValidate.password.message}</span>
                        </div>  
                         
                                                  
                    </div>
                    
                    <Link className="text1" to={'/forgotpassword'}>Forgot Password?</Link>
                  </div>
                  <div className="col-md-9">

                   <button
                        disabled={props.submitted ? 'disabled' : ''}  
                        className="btn-s green text-btn" 
                        onClick={props.handle_login_submit}>{props.submitted ? 'Please Wait..' : 'Login'}
                    </button> 
                  </div>
                  
                </div>    
              
           </div>
           
        </section>


        
    );
}