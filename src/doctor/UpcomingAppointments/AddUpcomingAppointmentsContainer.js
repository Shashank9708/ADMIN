import React from 'react';
import { connect } from 'react-redux';
import { doctorActions, clinicSlotActions } from '../../_actions';
import { AddUpcomingAppointments } from './AddUpcomingAppointments';
import { upcomingAppointmentValidator } from '../../_validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class AddUpcomingAppointmentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveUpcomingAppointments = this.handleSaveUpcomingAppointments.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onSelectDate = this.onSelectDate.bind(this);
    this.onSelectTime = this.onSelectTime.bind(this);
  }

  get initialState() {
      return {
          Form : {
              detail : {
                  'name' : '',
                  'contact_no' : '',
                  'health_problem_id' : '',
                  'clinic_id' : '',
                  'appointment_date' : new Date().toJSON().slice(0,10),
                  'appointment_time' : '',
              },
              validate : {
                  name : { isValid : true, message : '' },
                  contact_no : { isValid : true, message : '' },
                  health_problem_id : { isValid : true, message : '' },
                  clinic_id : { isValid : true, message : '' },
                  appointment_date : { isValid : true, message : '' },
                  appointment_time : { isValid : true, message : '' }
              }
          }
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
        const { detail, validate }  = this.state.Form;
        this.setState({
            Form : {
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
  handleSelectChange(selectedOption, name) {
      // console.log('selectedOption',selectedOption, name)
        const { detail, validate } = this.state.Form;
        this.setState({
            Form : {
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
        if(name === 'clinic_id'){
          let data = {
                  clinic_id: selectedOption.value,
                  date: new Date()
                }

          const { dispatch } = this.props;
          dispatch(clinicSlotActions.getClinicSlotDate(data));
          dispatch(clinicSlotActions.getClinicSlotForAppointment(data));
        }
    }

    onSelectDate (appointment_date) {
        
        const { detail, validate }  = this.state.Form;
        this.setState({
            Form : {
                validate:{
                    ...validate,
                    'appointment_date': {
                        isValid: true,
                        message: ''
                    }
                },
                detail : {
                    ...detail,
                    'appointment_date': appointment_date
                }
            }
        }, function(){
          
        });


        let data = {
                  clinic_id: detail.clinic_id.value,
                  date: appointment_date
                }
        const { dispatch } = this.props;
        dispatch(clinicSlotActions.getClinicSlotForAppointment(data));
    }

    onSelectTime (appointment_time) {
        const { detail, validate }  = this.state.Form;
        this.setState({
            Form : {
                validate:{
                    ...validate,
                    'appointment_time': {
                        isValid: true,
                        message: ''
                    }
                },
                detail : {
                    ...detail,
                    'appointment_time': appointment_time
                }
            }
        }, function(){
          
        });
    
    }
  /**
     * @DateOfCreation        11 June 2018
     * @ShortDescription      This function is responsible to handle close add/edit employee modal
     * @return                Nothing
     */
  handleClose() {
      this.props.addUpcomingAppointmentsHideHandle();
      const { dispatch } = this.props;
      dispatch(doctorActions.resetFirstState());
  }

  handleSaveUpcomingAppointments() {
    // if(upcomingAppointmentValidator.is_upcomingAppointmentValid(this)) {
        const { detail } = this.state.Form;
        // console.log(detail)

        let data = {
                      "name": detail.name,
                      "contact_no": detail.contact_no,
                      "health_problem_id": detail.health_problem_id.value,
                      "clinic_id": detail.clinic_id.value,
                      "doc_id": JSON.parse(localStorage.user).doc_id,
                      "appointment_date": detail.appointment_date,
                      "appointment_time": detail.appointment_time
                    }

            // console.log("----------",data)
        const { dispatch } = this.props;
        dispatch(doctorActions.newPatientAppointment(data));
    // }
  }

  /**
     * @DateOfCreation        16 Aug 2018
     * @ShortDescription      This function is responsible to show list
     * @return                Nothing
     */
    componentWillReceiveProps(newProps) {
        if(newProps.closeForm == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                toast("Successfully Booked")
                dispatch(doctorActions.resetFirstState());
                this.props.getUpcomingAppointmentsList(1, 10, "asc", "filtered");
                this.props.addUpcomingAppointmentsHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }
    }
  render() {
      return (
        <>
            <AddUpcomingAppointments 
              addUpcomingAppointmentsShow = {this.props.addUpcomingAppointmentsShow}
              clinicList = {this.props.clinicList}
              healthProblem = {this.props.healthProblem}
              clinicSlotDate = {this.props.clinicSlotDate}
              clinicSlotManage = {this.props.clinicSlotManage}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveUpcomingAppointments = {this.handleSaveUpcomingAppointments}
              handleInputChange = {this.handleInputChange}
              handleSelectChange = {this.handleSelectChange}
              payload = {this.state.Form}
              slotDate={this.onSelectDate}
              slotTime={this.onSelectTime}
            />
            <ToastContainer />
        </>    
      );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for notification list
 * @return                notification list and loader
 */

function mapStateToProps(state) {
   const { loader,successMessage,sendingRequest,errorMsg,closeForm } = state.doctorReducer;
   const { clinicSlotManage, clinicSlotDate, dateSlot } = state.clinicSlotReducer;
    return {
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm,
        clinicSlotManage, 
        clinicSlotDate, 
        dateSlot
    };
}
const connectedAddUpcomingAppointmentsContainer = connect(mapStateToProps)(AddUpcomingAppointmentsContainer);
export { connectedAddUpcomingAppointmentsContainer as AddUpcomingAppointmentsContainer };
