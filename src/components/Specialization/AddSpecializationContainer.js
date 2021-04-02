import React from 'react';
import { connect } from 'react-redux';
import { specializationActions } from '../../_actions';
import { AddSpecialization } from './AddSpecialization';
import { specializationValidator } from '../../_validator';


class AddSpecializationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveSpecialization = this.handleSaveSpecialization.bind(this);
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
          },
          id: ''
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
      this.props.addSpecializationHideHandle();
      const { dispatch } = this.props;
      dispatch(specializationActions.resetSpecializationState());
  }

  handleSaveSpecialization() {
    
      if(specializationValidator.is_specializationValid(this)) {
          const { detail } = this.state.notificationForm;
          // console.log(detail)
          var bodyFormData = new FormData();
          bodyFormData.append('en_spec', detail.en_spec);
          //table structure with validation rules
          bodyFormData.append('image',detail.image);

          const { dispatch } = this.props;
          if(this.props.flag){
            bodyFormData.append('id',this.state.id);
            dispatch(specializationActions.editSpecialization(bodyFormData, this.props.notificationList));
          }else{
            dispatch(specializationActions.saveSpecialization(bodyFormData, this.props.notificationList));
          }
    }
  }

  /**
     * @DateOfCreation        16 Aug 2018
     * @ShortDescription      This function is responsible to show list
     * @return                Nothing
     */
    componentWillReceiveProps(newProps) {
        if(newProps.payload){
            this.setState({
              notificationForm : {
                detail : {
                    'en_spec' : newProps.payload.en_spec,
                    'image' : newProps.payload.image,
                    'marathi_spec' : ''
                },
                validate : {
                    en_spec : { isValid : true, message : '' }
                }
              },
              id: newProps.payload.id
            });
    
        }else{
            this.setState(this.initialState);
        }
        if(newProps.closeForm == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                dispatch(specializationActions.getSpecializationList(1, 10, "asc", "filtered"));
                
                dispatch(specializationActions.resetSpecializationState());
                this.props.addSpecializationHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }
    }
  render() {
      return (
            <AddSpecialization 
              addSpecializationShow = {this.props.addSpecializationShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveSpecialization = {this.handleSaveSpecialization}
              handleInputChange = {this.handleInputChange}
              handleFileChange = {this.handleFileChange}
              payload = {this.state.notificationForm}
              flag = { this.props.flag }
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
const connectedAddSpecializationContainer = connect(mapStateToProps)(AddSpecializationContainer);
export { connectedAddSpecializationContainer as AddSpecializationContainer };
