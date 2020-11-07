import React from 'react';
import { connect } from 'react-redux';
import { healthTipsActions } from '../../_actions';
import { AddHealthTips } from './AddHealthTips';
import { healthTipsValidator } from '../../_validator';


class AddHealthTipsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveHealthTips = this.handleSaveHealthTips.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  get initialState() {
      return {
          healthTipsForm : {
              detail : {
                  'title' : '',
                  'image' : '',
                  'desc_en' : ''
              },
              validate : {
                  title : { isValid : true, message : '' },
                  desc_en : { isValid : true, message : '' }
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
        const { detail, validate }  = this.state.healthTipsForm;
        this.setState({
            healthTipsForm : {
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
        const { detail, validate }  = this.state.healthTipsForm;
        this.setState({
        healthTipsForm : {
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
      this.props.addHealthTipsHideHandle();
      const { dispatch } = this.props;
      dispatch(healthTipsActions.resetHealthTipsState());
  }

  handleSaveHealthTips() {
    if(healthTipsValidator.is_healthTipsValid(this)) {
        const { detail } = this.state.healthTipsForm;
        // console.log(detail)
        var bodyFormData = new FormData();
        bodyFormData.append('title', detail.title);
        bodyFormData.append('desc_en', detail.desc_en);
        //table structure with validation rules
        bodyFormData.append('image',detail.image);

        const { dispatch } = this.props;
        dispatch(healthTipsActions.saveHealthTips(bodyFormData, this.props.healthTipsList));
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
                dispatch(healthTipsActions.getHealthTipsList(1, 10, "asc", "filtered"));
                
                dispatch(healthTipsActions.resetHealthTipsState());
                this.props.addHealthTipsHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }else{
            this.setState(this.initialState);
        }
    }
  render() {
      return (
            <AddHealthTips 
              addHealthTipsShow = {this.props.addHealthTipsShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveHealthTips = {this.handleSaveHealthTips}
              handleInputChange = {this.handleInputChange}
              handleFileChange = {this.handleFileChange}
              payload = {this.state.healthTipsForm}
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
   const { healthTipsList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.healthTipsReducer;

    return {
        healthTipsList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddHealthTipsContainer = connect(mapStateToProps)(AddHealthTipsContainer);
export { connectedAddHealthTipsContainer as AddHealthTipsContainer };
