import React from 'react';
import { connect } from 'react-redux';
import { healthProblemActions } from '../../_actions';
import { AddHealthProblem } from './AddHealthProblem';
import { healthProblemValidator } from '../../_validator';


class AddHealthProblemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveHealthProblem = this.handleSaveHealthProblem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  get initialState() {
      return {
          healthProblemForm : {
              detail : {
                  'health_problem_title' : '',
              },
              validate : {
                  health_problem_title : { isValid : true, message : '' }
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
        const { detail, validate }  = this.state.healthProblemForm;
        this.setState({
            healthProblemForm : {
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
        const { detail, validate }  = this.state.healthProblemForm;
        this.setState({
        healthProblemForm : {
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
      this.props.addHealthProblemHideHandle();
      const { dispatch } = this.props;
      dispatch(healthProblemActions.resetHealthProblemState());
  }

  handleSaveHealthProblem() {
    if(healthProblemValidator.is_healthProblemValid(this)) {
        const { detail } = this.state.healthProblemForm;
        // console.log(detail)
        var bodyFormData = new FormData();
        bodyFormData.append('health_problem_title', detail.health_problem_title);
        //table structure with validation rules
        // bodyFormData.append('image',detail.image);

        const { dispatch } = this.props;
        dispatch(healthProblemActions.saveHealthProblem(detail, this.props.healthProblemList));
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
                dispatch(healthProblemActions.getHealthProblemList(1, 10, "asc", "filtered"));
                
                dispatch(healthProblemActions.resetHealthProblemState());
                this.props.addHealthProblemHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }else{
            this.setState(this.initialState);
        }
    }
  render() {
      return (
            <AddHealthProblem 
              addHealthProblemShow = {this.props.addHealthProblemShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveHealthProblem = {this.handleSaveHealthProblem}
              handleInputChange = {this.handleInputChange}
              handleFileChange = {this.handleFileChange}
              payload = {this.state.healthProblemForm}
            />
      );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for healthProblem list
 * @return                healthProblem list and loader
 */

function mapStateToProps(state) {
   const { healthProblemList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.healthProblemReducer;

    return {
        healthProblemList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddHealthProblemContainer = connect(mapStateToProps)(AddHealthProblemContainer);
export { connectedAddHealthProblemContainer as AddHealthProblemContainer };
