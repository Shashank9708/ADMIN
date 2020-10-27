import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * ForgotPassword
 *
 * @package                TruckAdmin
 * @subpackage             ForgotPassword
 * @category               Presentational Component
 * @DateOfCreation         20 July 2018
 * @ShortDescription       This component is reponsible to show the Forgot password form
 */
export const ForgotPassword = (props) => {
    return (
        <section class="starts">
           <div class="container">
              
                <a class="logoimg"><img src="src/assets/img/logo1.jpg"/></a>
                 <h3 class="heading1">ARK</h3>
                 <h3 class="heading1">Forgot your password</h3>
                <div class="row">
                    {/* Show server side Error message */}
                    {props.success_message &&
                    <Alert bsStyle="success">
                        {props.success_message}
                    </Alert>
                    }

                    {/* Show server side Error message */}
                    {props.error_message &&
                    <Alert bsStyle="danger">
                        {props.error_message}
                    </Alert>
                    }
                  <div class="col-md-7">
                   <div class="group">
                        
                        
                        <div className={props.payload.userValidate.email.isValid ? 'form-group' : 'form-group has-error'}>
                                <input
                                    type="text"
                                    name="email"
                                    onChange={props.handle_input_change}
                                    placeholder="Email/Mobile"
                                    value={props.email}
                                    className="form-control"
                                />
                                <span className="help-block">{props.payload.userValidate.email.message}</span>
                        </div>
                                                  
                    </div>
                    
                    <Link class="text1"  to="/">Go to login?</Link>
                  </div>
                  <div class="col-md-9">

                   <button
                        className="btn-s green text-btn" 
                        onClick={props.handle_forgot_submit}>Send
                    </button> 

                  </div>
                  
                </div>    
              
           </div>
           
        </section>

            
    );
}
