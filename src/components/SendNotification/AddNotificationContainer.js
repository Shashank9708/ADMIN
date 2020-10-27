import React from 'react';
import { connect } from 'react-redux';
import { notificationActions } from '../../_actions';
import { AddNotification } from './AddNotification';
import { sendNotificationValidator } from '../../_validator';


class AddNotificationContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  get initialState() {
      return {
          notificationForm : {
              detail : {
                  'user_type' : '',
                  'title'      : '',
                  'description'      : ''
              },
              validate : {
                  user_type : { isValid : true, message : '' },
                  title : { isValid : true, message : '' },
                  description : { isValid : true, message : '' },
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
  handleSelectChange(selectedOption, name) {

        const { detail, validate } = this.state.notificationForm;
        this.setState({
            notificationForm : {
                detail : {
                    ...detail,
                    [name] : selectedOption.value
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
     * @ShortDescription      This function is responsible to handle close add/edit employee modal
     * @return                Nothing
     */
  handleClose() {
      this.props.addNotificationHideHandle();
      const { dispatch } = this.props;
      dispatch(notificationActions.resetNotificationState());
  }

  sendNotification() {
    if(sendNotificationValidator.is_sendNotificationValid(this)) {
        const { detail } = this.state.notificationForm;
        const { dispatch } = this.props;
        dispatch(notificationActions.sendPushNotification(detail, this.props.notificationList));
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
                dispatch(notificationActions.resetNotificationState());
                this.props.addNotificationHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }else{
            this.setState(this.initialState);
        }
    }
  render() {
      return (
            <AddNotification 
              addNotificationShow = {this.props.addNotificationShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              sendNotification = {this.sendNotification}
              handleInputChange = {this.handleInputChange}
              handleSelectChange = {this.handleSelectChange}
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
   const { notificationList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.notificationReducer;

    return {
        notificationList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddNotificationContainer = connect(mapStateToProps)(AddNotificationContainer);
export { connectedAddNotificationContainer as AddNotificationContainer };
