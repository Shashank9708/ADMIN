import React from 'react';

import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import { profileActions, doctorActions, clinicActions, headerActions } from '../../_actions';
import Select from 'react-select' 
import { profileValidator } from '../../_validator';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {AddEducation} from './AddEducation';
import {AddClinic} from './AddClinic';
import { configConstants } from '../../_constants';
import {DropdownButton, Dropdown} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class ViewProfile extends React.Component {
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
        this.handleCheckboxChange   = this.handleCheckboxChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.optionList = this.optionList.bind(this);
        
        this.addEducation = this.addEducation.bind(this);
        this.closeEducation = this.closeEducation.bind(this);
        this.educationSave = this.educationSave.bind(this);
        this.removeEducation = this.removeEducation.bind(this);
        this.handleInputChangeED   = this.handleInputChangeED.bind(this);

        this.addClinic = this.addClinic.bind(this);
        this.closeClinic = this.closeClinic.bind(this);
        this.clinicSave = this.clinicSave.bind(this);
        this.editClinic   = this.editClinic.bind(this);
        this.removeClinic   = this.removeClinic.bind(this);
        this.handleInputChangeCL   = this.handleInputChangeCL.bind(this);
        this.handleSelectChangeCL   = this.handleSelectChangeCL.bind(this);

        this.handleNumberChange   = this.handleNumberChange.bind(this);
        this.send   = this.send.bind(this);
        this.submitOTP   = this.submitOTP.bind(this);
        this.handleChange   = this.handleChange.bind(this);
        this.apiCall   = this.apiCall.bind(this);
    }

    get initialState() {
        return {
          profile : {
              detail : {
                  dob: '',
                  display_pic: '',
                  display_image: '',
                  name: '',
                  gender:'',
                  email: '',
                  contact_no: '',
                  old_no: '',
                  age: '', 
                  expirience: '', 
                  about: '',  
                  visit_charge: '',  
                  chatting_charge: '',  
                  registratration_number: '',  
                  registration_year: '',  
                  spec_id: '',
                  degree: '',
                  year: '',
                  textInput : [],
                  educational_qualification : [],
                  council_id: '',
                  clinics : [],
                  isSwitchOn:false, 
                  video:0,
                  is_mobile_varify: 0
              },
              validate : {
                  name : { isValid : true, message : '' },
                  contact_no : { isValid : true, message : '' },
                  registratration_number : { isValid : true, message : '' },
                  registration_year : { isValid : true, message : '' },
                  spec_id : { isValid : true, message : '' },
                  council_id : { isValid : true, message : '' },
              }
          },
          education : {
            degree: '',
            year: ''
          },
          addEducationShow: false,
          doctorProfileDetail: false,
          clinic : {
            clinic_id: '',
            clinic_name: '',
            clinic_number: '',
            clinic_address: '',
            clinic_city_id: '',
            clinic_city_name: '',
            clinic_state_id: '',
            clinic_state_name: '',
            patient_attend_time: '',
            clinic_pincode: '',
            clinic_fees: '',
            status: "active"
          },
          addClinicShow: false,
          sendOTP: false,
          code: ''
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(doctorActions.getSpecialization("params"))
        dispatch(profileActions.getCouncil());
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
        const { detail, validate }  = this.state.profile;
        this.setState({
            profile : {
                validate:{
                    ...validate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
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
    handleNumberChange(event) {
        const { name, value }       = event.target;
        const { detail, validate }  = this.state.profile;
        this.setState({
            profile : {
                validate:{
                    ...validate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
                detail : {
                    ...detail,
                    [name]: value
                }
            }
        }, function(){
          
        });
        if(detail.old_no !== value){
          this.setState({sendOTP: true})
        }else{
          this.setState({sendOTP: false})
        }
    }

    send(){
      const { detail }  = this.state.profile;
      if(detail.contact_no.length === 10){
        this.setState({doctorProfileDetail: true})
        const { dispatch } = this.props;
        dispatch(profileActions.sendOTP(detail.contact_no));
      }else{
        toast("Enter Valid Number")
      }
    }
    handleChange(){
      const { name, value }       = event.target;
      this.setState({[name]: value})
    }

    submitOTP(){
      const { detail }  = this.state.profile;
      if(this.state.code.length === 6){
        const { dispatch } = this.props;
        dispatch(profileActions.verifyOTP(this.state.code,detail.contact_no));
      }else{
        toast("Enter Valid OTP Number")
      }
    }

    handleCheckboxChange(name, value) {
        const { detail, validate }  = this.state.profile;
        this.setState({
            profile : {
                validate:{
                    ...validate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
                detail : {
                    ...detail,
                    [name]: (value === 1) ? 0 : 1
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
        // console.log(fileName,file)
        // if (file.type.includes("png") || file.type.includes("jpeg") || file.type.includes("jpg")) {
        
        // } else {
        //     this.setState({ [target + "TypeError"]: true })
        // }
        // return false;
        const { name, value }       = e.target;
        const { detail, validate }  = this.state.profile;
        this.setState({
          profile : {
              validate:{
                  ...validate,
                  [target]: {
                      isValid: true,
                      message: ''
                  }
              },
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
    /**
    * @DateOfCreation        11 June 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(selectedOption, name) {
        // console.log('selectedOption',selectedOption, name)
          const { detail, validate } = this.state.profile;
          this.setState({
              profile : {
                  detail : {
                      ...detail,
                      [name] : selectedOption
                  },
                  validate : {
                      ...validate,
                      [name] : {
                          isValid : true,
                          message : ''
                      }
                  },
              }
          });
      }
    handleSave(){

      if(profileValidator.is_ProfileValid(this)) {
        const { detail } = this.state.profile;


        let formData = {
                        'doc_id': JSON.parse(localStorage.user).doc_id,
                        'user_id': JSON.parse(localStorage.user).user_id,
                        'name': detail.name,
                        'dob': detail.dob,
                        'registratration_number': detail.registratration_number,
                        'registration_year': detail.registration_year,
                        'expirience': detail.expirience,
                        'about': detail.about,
                        'video': detail.video,
                        'gender': (detail.gender.value) ? detail.gender.value : detail.gender,
                        'spec_id': (detail.spec_id.value) ? detail.spec_id.value : detail.spec_id,
                        'council_id': (detail.council_id.value) ? detail.council_id.value : detail.council_id
                    }

        this.apiCall(formData) 
      }
    } 

    addEducation(){
      this.setState({addEducationShow:true})
    }
    closeEducation(){
      this.setState({addEducationShow:false})
    }
    handleInputChangeED(event){
      const { name, value }       = event.target;
      const { education } = this.state;  
      this.setState({
        education: {
          ...education,
          [name]: value
        }
      })
    }
    removeEducation(index){
      const { detail }  = this.state.profile;

      var newState = detail.educational_qualification;
      newState.splice(index, 1);

      let formData = {
                        'doc_id': JSON.parse(localStorage.user).doc_id,
                        'user_id': JSON.parse(localStorage.user).user_id,
                        'educational_qualification': JSON.stringify(newState)
                    }
      this.apiCall(formData) 
    }
    educationSave(){
      const { detail }  = this.state.profile;

      var newState = detail.educational_qualification;
      newState.push(this.state.education);

      let formData = {
                        'doc_id': JSON.parse(localStorage.user).doc_id,
                        'user_id': JSON.parse(localStorage.user).user_id,
                        'educational_qualification': JSON.stringify(newState)
                    }

      this.apiCall(formData) 
    }

    addClinic(){
      this.setState({addClinicShow:true})
    }
    closeClinic(){
      this.setState({addClinicShow:false})
      const { clinic } = this.state;
      this.setState({
        clinic : {
            clinic_id: '',
            clinic_name: '',
            clinic_number: '',
            clinic_address: '',
            clinic_city_id: '',
            clinic_city_name: '',
            clinic_state_id: '',
            clinic_state_name: '',
            patient_attend_time: '',
            clinic_pincode: '',
            clinic_fees: '',
            status: "active"
          }
      })  
    }
    handleInputChangeCL(event){
      const { name, value }       = event.target;
      const { clinic } = this.state;  
      this.setState({
        clinic: {
          ...clinic,
          [name]: value
        }
      })
    }
    handleSelectChangeCL(selectedOption, name) {
      const { clinic } = this.state;  
      this.setState({
        clinic: {
          ...clinic,
          [name]: selectedOption
        }
      }) 
      if(name=='clinic_state_id'){
        const { dispatch } = this.props;
        dispatch(clinicActions.getCityList(selectedOption.value)); 
      }
    }
    editClinic(data){
      const { clinic } = this.state;  
      this.setState({
        clinic: {
          clinic_id: data.id,
          clinic_name: data.clinic_name,
          clinic_number: data.clinic_number,
          clinic_address: data.clinic_address,
          clinic_city_id: {label: data.clinic_city_id, value: data.clinic_city_id },
          clinic_state_id: {label: data.clinic_state_id, value: data.clinic_state_id },
          patient_attend_time: {label: data.patient_attend_time, value: data.patient_attend_time},
          clinic_pincode: data.clinic_pincode,
          clinic_fees: data.clinic_fees,
          status: "active"
        }
      })
      this.setState({addClinicShow:true})
    }
    removeClinic(clinic_id){
      // console.log('id',id)
        const { dispatch } = this.props;
        dispatch(clinicActions.deleteClinicProfile(clinic_id));
        // const newList = this.state.clinics.filter((item) => item.id !== this.state.clinic_id);
        // this.setState({clinics: newList, doctorProfileDetail: false})
    }
    clinicSave(){
      const { clinic }  = this.state;
      const { dispatch } = this.props;
      if(!clinic.clinic_id){
        let data = {
              doctor_id: JSON.parse(localStorage.user).doc_id,
              clinic_name: clinic.clinic_name,
              clinic_number: clinic.clinic_number,
              clinic_address: clinic.clinic_address,
              clinic_state_id: clinic.clinic_state_id.value,
              clinic_city_id: clinic.clinic_city_id.value,
              clinic_pincode: clinic.clinic_pincode,
              clinic_fees: clinic.clinic_fees,
              patient_attend_time: clinic.patient_attend_time.value,
              status: clinic.status,
              lat: 0,
              lng: 0
            }
          dispatch(clinicActions.addClinicProfile(data));
      }else{
        let data = {
              clinic_id: clinic.clinic_id,
              doctor_id: JSON.parse(localStorage.user).doc_id,
              clinic_name: clinic.clinic_name,
              clinic_number: clinic.clinic_number,
              clinic_address: clinic.clinic_address,
              clinic_state_id: clinic.clinic_state_id.value,
              clinic_city_id: clinic.clinic_city_id.value,
              clinic_pincode: clinic.clinic_pincode,
              clinic_fees: clinic.clinic_fees,
              patient_attend_time: clinic.patient_attend_time.value,
              status: clinic.status,
              lat: 0,
              lng: 0
            }
          dispatch(clinicActions.updateClinicProfile(data));
      }
    }


    apiCall(formData){
      const { dispatch } = this.props;
      dispatch(profileActions.updateProfilePic(formData));
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        // console.log("nextProps.doctorProfileDetail",nextProps)
        if(!this.state.doctorProfileDetail && nextProps.doctorProfileDetail.length > 0){
            let data = nextProps.doctorProfileDetail[0]
            const { detail, validate } = this.state.profile;

            this.setState({
                profile : {
                    detail : {
                        ...detail,
                        name: data.name,
                        about: data.about || '',
                        age: data.age,
                        gender: {label: data.gender, value: data.gender},
                        dob: data.dob,
                        contact_no: data.contact_no,
                        old_no: data.contact_no,
                        email: data.email,       
                        display_pic: data.display_pic,
                        logo: data.logo,
                        expirience: (data.expirience) && data.expirience.toString() || '',
                        id_proof: data.id_proof,
                        registration_proof: data.registraion_proof,
                        registratration_number: data.registratration_number || '',
                        registration_year: data.registration_year || '',
                        council_id: data.council_id,
                        video:data.video,
                        spec_id: data.spec_id,
                        visit_charge: (data.visit_charge) && data.visit_charge.toString() || '',
                        chatting_charge: data.chatting_charge || '',
                        educational_qualification: (data.educational_qualification) ? JSON.parse(data.educational_qualification) : [],
                        clinics: data.clinics || [],
                        doctorProfileDetail: true,
                        is_mobile_varify: data.is_mobile_varify
                    },
                    validate : {
                        ...validate
                    },
                }
            });
        }
    
        if(nextProps.profileUpdate || nextProps.clinicUpdate){
            setTimeout(function(){
              toast("Successfully Update")
              this.getProfile();
              this.closeEducation();
              this.closeClinic();
              const { dispatch } = this.props;
              dispatch(profileActions.resetProfileState())
              dispatch(clinicActions.resetClinicState())
            }.bind(this),1500);
        }
        if(nextProps.otp){
            setTimeout(function(){
              toast("Send OTP in Number")
            }.bind(this),1500);
        }
        if(nextProps.otpDone){
            setTimeout(function(){
              this.getProfile();
              this.setState({doctorProfileDetail: false, sendOTP: false})
              toast("Number verified")
              const { dispatch } = this.props;
              dispatch(profileActions.resetProfileState())
            }.bind(this),1500);
        }
        if(nextProps.otpMsg){
            setTimeout(function(){
              toast(nextProps.otpMsg)
              const { dispatch } = this.props;
              dispatch(profileActions.resetProfileState())
            }.bind(this),1500);
        }
        if(nextProps.otpVMsg){
            setTimeout(function(){
              toast(nextProps.otpVMsg)
              // const { dispatch } = this.props;
              // dispatch(profileActions.resetProfileState())
            }.bind(this),1500);
        }
        if(nextProps.deleteClinic){
            setTimeout(function(){
              toast("Successfully Removed")
              this.getProfile();
              const { dispatch } = this.props;
              dispatch(profileActions.resetProfileState())
              dispatch(clinicActions.resetClinicState())
            }.bind(this),1500);
        }
     
    }

    optionList(id, data){
      if(data.length > 0){
          return data.map((row)=>{
            if(row.value == id){
              return {label: row.label, value: id}
            }
          })
      }
    }
    render() {
      const profile = this.state.profile

        return (
            <div className="page-container">
                <HeaderContainer />
                <div className="container-fluid">
                   <div className="row">
                      <div className="col-md-2.5">
                        <DoctorSideMenu/>
                      </div>
                      <div className="col-md-9">          
                        <div className="main-content">
                            <div className="wrap-inner-content">
                                <div className="col-md-12">
                                  <div className="inner-content">
                                    <div className="row">
                                          <div className="col-md-3">
                                            <label>Profile Pic</label>
                                            <div>
                                              <img src={configConstants.API_BASE_PATH+"/"+profile.detail.display_pic} className="upload-img"/>
                                            </div>
                                              <input name="display_pic" type="file" className="form-control" onChange = { this.handleFileChange }/>
                                          </div>
                                          <div className="col-md-3">
                                            <label>Logo</label>
                                            <div>
                                              <img src={configConstants.API_BASE_PATH+"/"+profile.detail.logo}  className="upload-img"/>
                                            </div>
                                              <input name="logo" type="file" className="form-control" onChange = { this.handleFileChange }/>
                                          </div>
                                          <div className="col-md-6">
                                            <div className={ profile.validate.name.isValid ? 'form-group' : 'form-group has-error' }>
                                              <input name="name" type="text" className="form-control" onChange = { this.handleInputChange } placeholder="Name" value={profile.detail.name}/>
                                              <span className="help-block">{ profile.validate.name.message }</span>
                                            </div>
                                            <div className={ 'form-group' }>
                                              <input name="email" type="email" className="form-control" onChange = { this.handleInputChange } placeholder="Name" value={profile.detail.email}/>
                                            </div>
                                            <div className={ 'form-group' }>
                                              <label>DOB: {profile.detail.dob}</label>
                                              <DatePicker
                                                // selected={profile.detail.dob}
                                                onChange={date => this.handleInputChange('dob',date)}
                                                dateFormat="dd/MM/yyyy"
                                                showMonthDropdown
                                                peekNextMonth
                                                showYearDropdown
                                                dropdownMode="select"
                                              />
                                            </div>
                                            <div className="form-group">
                                                <div className="checkbox-section">
                                                  <label><input type="checkbox" name="video" onChange={() =>this.handleCheckboxChange('video',profile.detail.video)} checked={(profile.detail.video === 1) ? true : false} className="option-input"/><span>Video</span></label>
                                                </div>
                                              </div>
                                            <div className={ 'form-group' }>
                                              <Select
                                                  placeholder = "Select Gender"
                                                  onChange={ (value, name) => this.handleSelectChange(value, 'gender') }
                                                  options={[
                                                      {label: 'Male', value: 'Male'},
                                                      {label: 'Female', value: 'Female'}
                                                    ]}
                                                  name='council_id'
                                                  value={profile.detail.gender}
                                              />
                                            </div>
                                          </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                          <label>Specialization</label>
                                          <div className={ profile.validate.spec_id.isValid ? 'form-group' : 'form-group has-error' }>
                                            <Select
                                                placeholder = "Select Specialization"
                                                onChange={ (value, name) => this.handleSelectChange(value, 'spec_id') }
                                                options={this.props.spList}
                                                name='spec_id'
                                                value={this.optionList(profile.detail.spec_id, this.props.spList)}
                                            />
                                            <span className="help-block">{ profile.validate.spec_id.message }</span>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <label>Experience</label>
                                          <div className={ 'form-group' }>
                                            <input name="expirience" type="text" className="form-control" onChange = { this.handleInputChange } placeholder="Experience" value={profile.detail.expirience}/>
                                          </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        
                                        <div className="col-md-12">
                                          <label>About</label>
                                          <div className="form-group">
                                            <textarea name="about" className="form-control" onChange = { this.handleInputChange } placeholder="About">{profile.detail.about}</textarea>
                                          </div>
                                        </div>
                                        <div className="col-md-12 text-right">
                                          <button className="blue btn text-btn" onClick={this.addEducation}>Add Education</button>
                                        </div>
                                        <div className="col-md-12 table-wrap">
                                          <table className="table table-bordered responsive">
                                            <thead>
                                              <tr>
                                                <th>Qualification</th>
                                                <th>Year</th>
                                                <th></th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                            {profile && profile.detail && profile.detail.educational_qualification.length > 0 && profile.detail.educational_qualification.map((row, i) => {
                                              return <tr key={i}>
                                                  <td>{row.degree}</td>
                                                  <td>{row.year}</td>
                                                  <td className="help-block" onClick={() => this.removeEducation(i)}>X</td>
                                              </tr>
                                            })}
                                            </tbody>
                                          </table>
                                        </div>

                                    </div>
                                    
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label>Contact Number</label>
                                        <div className={ profile.validate.contact_no.isValid ? 'form-group' : 'form-group has-error' }>
                                          <input name="contact_no" type="number" className="form-control" onChange = { this.handleNumberChange } placeholder="Contact No." value={profile.detail.contact_no}/>
                                          <span className="help-block">{ profile.validate.contact_no.message }</span>
                                        </div>
                                        {this.state.sendOTP &&
                                          <div className="col-md-12 text-right">
                                            <a href="javascript:void(0);" className="" onClick={() => this.send()}>SEND OTP</a>
                                          </div>
                                        }
                                        {this.props.otp && 
                                          <>
                                            <input name="code" type="number" className="form-control" onChange = { this.handleChange } placeholder="Enter OTP" />
                                            <div className="col-md-12 text-right">
                                              <a href="javascript:void(0);" className="" onClick={() => this.submitOTP()}>Submit</a>
                                            </div>
                                          </>
                                        }
                                      </div>
                                      <div className="col-md-6">
                                        <label>Council</label>
                                        <div className={ profile.validate.council_id.isValid ? 'form-group' : 'form-group has-error' }>
                                          <Select
                                              placeholder = "Select Council"
                                              onChange={ (value, name) => this.handleSelectChange(value, 'council_id') }
                                              options={this.props.councilList}
                                              name='council_id'
                                              value={this.optionList(profile.detail.council_id, this.props.councilList)}
                                          />
                                          <span className="help-block">{ profile.validate.council_id.message }</span>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <label>Registration Number</label>
                                        <div className={ profile.validate.registratration_number.isValid ? 'form-group' : 'form-group has-error' }>
                                          <input name="registratration_number" type="text" className="form-control" onChange = { this.handleInputChange } placeholder="Registration Number" value={profile.detail.registratration_number}/>
                                          <span className="help-block">{ profile.validate.registratration_number.message }</span>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <label>Registration Year</label>
                                        <div className={ profile.validate.registration_year.isValid ? 'form-group' : 'form-group has-error' }>
                                          <input name="registration_year" type="text" className="form-control" onChange = { this.handleInputChange } placeholder="Registration Year" value={profile.detail.registration_year}/>
                                          <span className="help-block">{ profile.validate.registration_year.message }</span>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <label>Registration Proof {profile.detail.registration_proof && <a href={configConstants.API_BASE_PATH+"/"+profile.detail.registration_proof} target="_blank">View</a>}</label>
                                          <div className={ 'form-group'}>
                                            <input name="registration_proof" type="file" className="form-control" onChange = { this.handleFileChange }/>
                                            
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                        <label>ID Proof {profile.detail.id_proof && <a href={configConstants.API_BASE_PATH+"/"+profile.detail.id_proof} target="_blank">View</a> }</label>
                                          <div className={ 'form-group'}>
                                            <input name="id_proof" type="file" className="form-control" onChange = { this.handleFileChange }/>
                                            
                                          </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 text-right">
                                          <button className="blue btn text-btn" onClick={this.addClinic}>Add Clinic</button>
                                        </div>
                                        <div className="col-md-12 table-wrap">
                                          <table className="table table-bordered responsive">
                                            <thead>
                                              <tr>
                                                <th>Name</th>
                                                <th>Number</th>
                                                <th>Address</th>
                                                <th>Slot Interval</th>
                                                <th>State</th>
                                                <th>City</th>
                                                <th>Pincode</th>
                                                <th>Fees</th>
                                                <th></th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                            {profile && profile.detail && profile.detail.clinics.length > 0 && profile.detail.clinics.map((row, i) => {
                                              return <tr key={i}>
                                                  <td>{row.clinic_name}</td>
                                                  <td>{row.clinic_number}</td>
                                                  <td>{row.clinic_address}</td>
                                                  <td>{row.patient_attend_time}</td>
                                                  <td>{row.clinic_state_id}</td>
                                                  <td>{row.clinic_city_id}</td>
                                                  <td>{row.clinic_pincode}</td>
                                                  <td>{row.clinic_fees}</td>
                                                  <td>
                                                    <DropdownButton id={"dropdown-"+row.id} title="Action" menuAlign="right">
                                                        <Dropdown.Item onClick={() => this.editClinic(row)}>Edit</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => this.removeClinic(row.id)}>Remove</Dropdown.Item>
                                                    </DropdownButton>
                                                  </td>
                                              </tr>
                                            })}
                                            </tbody>
                                          </table>
                                        </div>
                                    </div>

                                        <div className="col-md-12">

                                          <div className="form-group">
                                            <button className="btn text-btn green" onClick={this.handleSave}>Update Information</button>
                                          </div>
                                        </div>
                                  </div>
                                </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <AddEducation
                  addEducationShow={this.state.addEducationShow}
                  handleClose={this.closeEducation}
                  handleEducationSave={this.educationSave}
                  handleInputChange={this.handleInputChangeED}
                />

                <AddClinic
                  addClinicShow={this.state.addClinicShow}
                  handleClose={this.closeClinic}
                  handleClinicSave={this.clinicSave}
                  handleInputChange={this.handleInputChangeCL}
                  handleSelectChange={this.handleSelectChangeCL}
                  payload={this.state.clinic}
                  cityList={this.props.cityList}
                />
                <ToastContainer />
            </div>

        );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for staff list
 * @return                staff list and loader
 */
function mapStateToProps(state) {
    const { loader, spList, isUserNotValid } = state.doctorReducer;
    const { doctorProfileDetail, councilList, sendingRequest, otp,otpDone,profileUpdate, otpMsg, otpVMsg } = state.profileReducer;
    const { deleteClinic, cityList, clinicUpdate } = state.clinicReducer;
    return {
        spList,
        doctorProfileDetail,
        otp,
        otpDone,
        otpMsg,
        otpVMsg,
        councilList,
        sendingRequest,
        profileUpdate,
        deleteClinic,
        cityList,
        clinicUpdate,
        isUserNotValid
    };
}
const connectedManager = connect(mapStateToProps)(ViewProfile);
export { connectedManager as ViewProfile };