import React from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import { profileActions, doctorActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import {DropdownButton, Dropdown} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Settings.scss';
import { Accordion,Card } from "react-bootstrap";
import {CreateOptions, CreateOptionTime} from '../../_helpers/helper'
import { utilityHelper } from '../../_helpers';
import SignaturePad from 'react-signature-canvas'




class SettingsDoctor extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        this.state               = this.initialState;
        this.getProfile   = this.getProfile.bind(this);
        this.handleSave   = this.handleSave.bind(this);
        this.handleInputChange   = this.handleInputChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        
        this.apiCall   = this.apiCall.bind(this);
  
        this.clear   = this.clear.bind(this);
        this.saveSign   = this.saveSign.bind(this);

        this.sigPad = {}
    }

    get initialState() {
        return {
          profile : {
              detail : {
                  logo: '',
                  header_color: '',
                  footer_color: '',
                  footer_text: '',
                  signature: '',
                  trimmedDataURL: ''
              }
          }

        }
    }
    
    clear () {
      this.sigPad.clear()
    }
    saveSign () {
      const { detail }  = this.state.profile;
        this.setState({
            profile : {
                detail : {
                    ...detail,
                    trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png')
                }
            }
        }, function(){
          
        });
        let formData = {
                          'doc_id': JSON.parse(localStorage.user).doc_id,
                          'user_id': JSON.parse(localStorage.user).user_id,
                          'signature': this.sigPad.getTrimmedCanvas().toDataURL('image/png')
                      }
        this.apiCall(formData) 
    }
    componentDidMount() {
        const { dispatch } = this.props;
        this.getProfile()
    }

    getProfile(){
      const { dispatch } = this.props;
      dispatch(profileActions.getDoctorProfile());
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to redirect unauthorise users
     * @return                Redirect
     */
    componentDidUpdate(){
        const { dispatch }  = this.props;
        if(this.props.isUserNotValid){
           dispatch(headerActions.logout());
        }
    }

    /**
    * @DateOfCreation        11 June 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleInputChange(event) {
        const { name, value }       = event.target;
        const { detail }  = this.state.profile;
        this.setState({
            profile : {
                detail : {
                    ...detail,
                    [name]: value
                }
            }
        }, function(){
          
        });
    }

    /**
     * @DateOfCreation        11 June 2018
     * @ShortDescription      This function is responsible to handle changes in Select state
     * @param                 Event Object
     * @return                Nothing
     */
    handleFileChange(e) {
        const target = e.target.name;
        let file = e.target.files[0];
        let fileName = file.name;
        const { name, value }       = e.target;
        const { detail }  = this.state.profile;
        this.setState({
          profile : {
              detail : {
                  ...detail,
                  [target]: file
              }
          }
          }, function(){
          
        });

        const formData = new FormData();
        formData.append(target, file)
        formData.append('doc_id', JSON.parse(localStorage.user).doc_id)
        formData.append('user_id', JSON.parse(localStorage.user).user_id)

        
        const { dispatch } = this.props;
        dispatch(profileActions.uploadPic(formData)); 
    }
    handleSave(){

        const { detail } = this.state.profile;
        let formData = {
                        'doc_id': JSON.parse(localStorage.user).doc_id,
                        'user_id': JSON.parse(localStorage.user).user_id,
                        'header_color': detail.header_color,
                        'footer_color': detail.footer_color,
                        'footer_text': detail.footer_text,
                    }

        this.apiCall(formData) 
    } 

    apiCall(formData){
      const { dispatch } = this.props;
      dispatch(profileActions.updateProfilePic(formData));
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        // console.log("nextProps.doctorProfileDetail",nextProps)
        if(!this.state.doctorProfileDetail && nextProps.doctorProfileDetail.length > 0){
            let data = nextProps.doctorProfileDetail[0]
            const { detail } = this.state.profile;

            this.setState({
                profile : {
                    detail : {
                        ...detail,
                        logo: detail.logo,
                        header_color: detail.header_color,
                        footer_color: detail.footer_color,
                        footer_text: detail.footer_text,
                        signature: detail.signature
                    }
                }
            });
        }
    
        if(nextProps.profileUpdate){
            setTimeout(function(){
              toast("Successfully Update")
              this.getProfile();
              const { dispatch } = this.props;
              dispatch(profileActions.resetProfileState())
            }.bind(this),1500);
        }
     
    }


    render() {
      const profile = this.state.profile
      // console.log(profile.detail.trimmedDataURL)
        return (
              <React.Fragment>
                <HeaderContainer />
                <div className="container-fluid">
                   <div className="row">
                      <DoctorSideMenu/>
                      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">          
                        
                        <div className="page-heading">
                          <div className="page-heading__title-container">
                              <h1 className="page-heading__title">Settings</h1>
                          </div>
                        </div>
                        
                      
                        <Accordion defaultActiveKey="0">
                          <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                              PDF Settings
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>
                              
                              <div className="row mt-3">
                                  <div className="col-md-6">
                                    <label>Logo</label>
                                    <div>
                                      <img src={configConstants.API_BASE_PATH+"/"+profile.detail.logo}  className="user-logo-image"/>
                                    </div>
                                      <input name="logo" type="file" className="form-control" onChange = { this.handleFileChange }/>
                                  </div>
                                  <div className="col-md-6">
                                    <label>Header Color</label>
                                    <div className={ 'form-group' }>
                                      <input name="header_color" type="text" className="form-control" onChange = { this.handleInputChange } placeholder="Header Color" value={profile.detail.header_color}/>
                                    </div>
                                    
                                  </div>

                                  <div className="col-md-6">
                                    <label>Footer Color</label>
                                    <div className={ 'form-group' }>
                                      <input name="footer_color" type="text" className="form-control" onChange = { this.handleInputChange } placeholder="Footer Color" value={profile.detail.footer_color}/>
                                    </div>
                                    
                                  </div>

                                  <div className="col-md-6">
                                    <label>Footer text</label>
                                    <div className={ 'form-group' }>
                                      <input name="footer_text" type="text" className="form-control" onChange = { this.handleInputChange } placeholder="Footer Color" value={profile.detail.footer_text}/>
                                    </div>
                                    
                                  </div>


                                  
                                                              
                              </div>
                                                              
                              
                                <div className="row">
                                  
                                  
                                  <div className="col-md-6">
                                    <label>Signature </label>
                                    <div className="form-group">
                                      <SignaturePad 
                                          canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
                                          ref={(ref) => { this.sigPad = ref }} 
                                      />

                                      <button  onClick={this.clear}>
                                        Clear
                                      </button>
                                      <button  onClick={this.saveSign}>
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <label>Signature Saved </label>
                                    <div className="form-group">
                                      {this.state.profile.detail.trimmedDataURL
                                        ? <img className={{
                                            backgroundSize: "200px 50px",
                                            width: "200px",
                                            height: "50px",
                                            backgroundColor: "#fff"
                                          }}
                                          src={this.state.profile.detail.trimmedDataURL} />
                                        : null}
                                    </div>
                                  </div>
                                </div>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>

                        

                        <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <button className="btn-sm mt-3" onClick={this.handleSave}>Update Information</button>
                              </div>
                            </div>
                        </div>
                      </main>
                    </div>
                </div>
                
                <ToastContainer />
              </React.Fragment>

        );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for staff list
 * @return                staff list and loader
 */
function mapStateToProps(state) {
    const {isUserNotValid, loader, doctorProfileDetail , profileUpdate } = state.profileReducer;
    
    return {
        doctorProfileDetail,
        profileUpdate,
        isUserNotValid,
        loader
    };
}
const connectedManager = connect(mapStateToProps)(SettingsDoctor);
export { connectedManager as SettingsDoctor };