import React from 'react';
import { connect } from 'react-redux';
import { appointmentActions } from '../../_actions';
import { AddAppointments } from './AddAppointments';
import { appointmentValidator } from '../../_validator';


class AddAppointmentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveAppointments = this.handleSaveAppointments.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  get initialState() {
      return {
          notificationForm : {
              detail : {
                  'en_spec' : '',
                  'image' : '',
                  'marathi_spec' : ''
              },
              validate : {
                  en_spec : { isValid : true, message : '' }
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
        const { detail, validate }  = this.state.notificationForm;
        this.setState({
            notificationForm : {
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
        // const { name, value }       = e.target;
        const { detail, validate }  = this.state.notificationForm;
        this.setState({
        notificationForm : {
            validate:{
                ...validate,
                image: {
                    isValid: true,
                    message: ''
                }
            },
            detail : {
                ...detail,
                image: file
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
      this.props.addAppointmentsHideHandle();
      const { dispatch } = this.props;
      dispatch(appointmentActions.resetAppointmentsState());
  }

  handleSaveAppointments() {
    if(appointmentValidator.is_appointmentValid(this)) {
        const { detail } = this.state.notificationForm;
        // console.log(detail)
        var bodyFormData = new FormData();
        bodyFormData.append('en_spec', detail.en_spec);
        //table structure with validation rules
        bodyFormData.append('image',detail.image);

        const { dispatch } = this.props;
        dispatch(appointmentActions.saveAppointments(bodyFormData, this.props.appointmentList));
    }
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
                dispatch(appointmentActions.getAppointmentList(1, 10, "asc", "filtered"));
                
                dispatch(appointmentActions.resetAppointmentsState());
                this.props.addAppointmentsHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }else{
            this.setState(this.initialState);
        }
    }
  render() {
      return (
            <AddAppointments 
              addAppointmentsShow = {this.props.addAppointmentsShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveAppointments = {this.handleSaveAppointments}
              handleInputChange = {this.handleInputChange}
              handleFileChange = {this.handleFileChange}
              payload = {this.state.notificationForm}
            />
      );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for notification list
 * @return                notification list and loader
 */

function mapStateToProps(state) {
   const { appointmentList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.appointmentReducer;

    return {
        appointmentList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddAppointmentsContainer = connect(mapStateToProps)(AddAppointmentsContainer);
export { connectedAddAppointmentsContainer as AddAppointmentsContainer };
