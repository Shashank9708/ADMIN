import React from 'react';
import { connect } from 'react-redux';
import { pathologyCentersActions } from '../../_actions';
import { AddPathologyCenters } from './AddPathologyCenters';
import { pathologyCentersValidator } from '../../_validator';


class AddPathologyCentersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSavePathologyCenters = this.handleSavePathologyCenters.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  get initialState() {
      return {
          pathologyCentersForm : {
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
        const { detail, validate }  = this.state.pathologyCentersForm;
        this.setState({
            pathologyCentersForm : {
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
        const { detail, validate }  = this.state.pathologyCentersForm;
        this.setState({
        pathologyCentersForm : {
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
      this.props.addPathologyCentersHideHandle();
      const { dispatch } = this.props;
      dispatch(pathologyCentersActions.resetPathologyCentersState());
  }

  handleSavePathologyCenters() {
    if(pathologyCentersValidator.is_pathologyCentersValid(this)) {
        const { detail } = this.state.pathologyCentersForm;
        // console.log(detail)
        // var bodyFormData = new FormData();
        // bodyFormData.append('title', detail.title);
        // bodyFormData.append('desc_en', detail.desc_en);
        // //table structure with validation rules
        // bodyFormData.append('image',detail.image);

        const { dispatch } = this.props;
        dispatch(pathologyCentersActions.savePathologyCenters(detail, this.props.pathologyCentersList));
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
                dispatch(pathologyCentersActions.getPathologyCentersList(1, 10, "asc", "filtered"));
                
                dispatch(pathologyCentersActions.resetPathologyCentersState());
                this.props.addPathologyCentersHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }else{
            this.setState(this.initialState);
        }
    }
  render() {
      return (
            <AddPathologyCenters 
              addPathologyCentersShow = {this.props.addPathologyCentersShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSavePathologyCenters = {this.handleSavePathologyCenters}
              handleInputChange = {this.handleInputChange}
              handleFileChange = {this.handleFileChange}
              payload = {this.state.pathologyCentersForm}
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
   const { pathologyCentersList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.pathologyCentersReducer;

    return {
        pathologyCentersList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddPathologyCentersContainer = connect(mapStateToProps)(AddPathologyCentersContainer);
export { connectedAddPathologyCentersContainer as AddPathologyCentersContainer };
