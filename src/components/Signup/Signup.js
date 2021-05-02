import react from 'react';
import './Signup.scss';

function Signup(){
  return(
      <>
        <div className="signup-page__container">
                <div className="">
                    <img className="signup-page__logo" src={arklogo}/>
                </div>
                <div className="">
                    <div className="signup-page__heading H4DesktopWhite">SIGN UP TO ARK</div>
                </div>
                <div className="signup-page__form">
                      
                      <div className="row">
                        <div className="col-md-6">
                                <input type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="form-control"  />
                            </div>
                        
                        <div className="col-md-6">
                                <input type="text"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control"  />
                            </div>
                      </div>    
                        
                      <div className="row">
                          <div className="col-md-6">
                                <input type="password"
                                    name="password"
                                    placeholder="*******"
                                    className="form-control"  />
                            </div>
                            
                          <div className="col-md-6">
                                <input type="password"
                                    name="confirm-password"
                                    placeholder="*******"
                                    className="form-control"  />
                            </div>
                      </div>
                        
                      <div className="row">
                        <div className="col-md-6">
                                <input type="text"
                                    name="mobile-number"
                                    placeholder="Mobile Number"
                                    className="form-control"  />
                            </div>
                                                
                        <div className="col-md-6">
                                <input type="text"
                                    name="experience"
                                    placeholder="Experience"
                                    className="form-control"  />
                            </div>
                      </div>
                        
                      <div className="row">
                          <div class="col-md-6">
                                <select class="form-control" id="gender">
                                    <option>Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div> 
                        
                          <div class="col-md-6">
                                <select class="form-control" id="gender">
                                    <option>Select Specialization</option>
                                    <option>Allergists</option>
                                    <option>Anesthesiologist</option>
                                </select>
                            </div>                         
                      </div>
                
                      <div className="signup-page__login-redirection">
                        <Link className="CTAWhite" to={'/'}>Login Here</Link>
                      </div>
                    
                    <div className="signup-page__signup-btn">
                        <button
                            disabled={props.submitted ? 'disabled' : ''}  
                            className="" 
                            onClick={props.handle_login_submit}>{props.submitted ? 'Please Wait..' : 'Sign up'}
                        </button> 
                    </div>
                  
                
                
                </div>
        </div>
      
      </>
  
  )}

export default Signup;

