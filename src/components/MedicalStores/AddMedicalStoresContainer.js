import React from 'react';
import { connect } from 'react-redux';
import { medicalStoresActions } from '../../_actions';
import { AddMedicalStores } from './AddMedicalStores';
import { medicalStoresValidator } from '../../_validator';


class AddMedicalStoresContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveMedicalStores = this.handleSaveMedicalStores.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  get initialState() {
      return {
          medicalStoresForm : {
              detail : {
                  'name' : '',
                  'email' : '',
                  'contact_no' : '',
                  'password': '123456'
              },
              validate : {
                  name : { isValid : true, message : '' },
                  contact_no : { isValid : true, message : '' }
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
        const { detail, validate }  = this.state.medicalStoresForm;
        this.setState({
            medicalStoresForm : {
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
        const { detail, validate }  = this.state.medicalStoresForm;
        this.setState({
        medicalStoresForm : {
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
      this.props.addMedicalStoresHideHandle();
      const { dispatch } = this.props;
      dispatch(medicalStoresActions.resetMedicalStoresState());
  }

  handleSaveMedicalStores() {
    if(medicalStoresValidator.is_medicalStoresValid(this)) {
        const { detail } = this.state.medicalStoresForm;
        // console.log(detail)
        // var bodyFormData = new FormData();
        // bodyFormData.append('title', detail.title);
        // bodyFormData.append('desc_en', detail.desc_en);
        // //table structure with validation rules
        // bodyFormData.append('image',detail.image);

        const { dispatch } = this.props;
        dispatch(medicalStoresActions.saveMedicalStores(detail, this.props.medicalStoresList));
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
                dispatch(medicalStoresActions.getMedicalStoresList(1, 10, "asc", "filtered"));
                
                dispatch(medicalStoresActions.resetMedicalStoresState());
                this.props.addMedicalStoresHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }else{
            this.setState(this.initialState);
        }
    }
  render() {
      return (
            <AddMedicalStores 
              addMedicalStoresShow = {this.props.addMedicalStoresShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveMedicalStores = {this.handleSaveMedicalStores}
              handleInputChange = {this.handleInputChange}
              handleFileChange = {this.handleFileChange}
              payload = {this.state.medicalStoresForm}
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
   const { medicalStoresList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.medicalStoresReducer;

    return {
        medicalStoresList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddMedicalStoresContainer = connect(mapStateToProps)(AddMedicalStoresContainer);
export { connectedAddMedicalStoresContainer as AddMedicalStoresContainer };
