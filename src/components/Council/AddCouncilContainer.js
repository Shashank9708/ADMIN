import React from 'react';
import { connect } from 'react-redux';
import { councilActions } from '../../_actions';
import { AddCouncil } from './AddCouncil';
import { councilValidator } from '../../_validator';


class AddCouncilContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveCouncil = this.handleSaveCouncil.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  get initialState() {
      return {
          councilForm : {
              detail : {
                  'council_title' : '',
              },
              validate : {
                  council_title : { isValid : true, message : '' }
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
        const { detail, validate }  = this.state.councilForm;
        this.setState({
            councilForm : {
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
        const { detail, validate }  = this.state.councilForm;
        this.setState({
        councilForm : {
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
      this.props.addCouncilHideHandle();
      const { dispatch } = this.props;
      dispatch(councilActions.resetCouncilState());
  }

  handleSaveCouncil() {
    if(councilValidator.is_councilValid(this)) {
        const { detail } = this.state.councilForm;
        // console.log(detail)
        var bodyFormData = new FormData();
        bodyFormData.append('council_title', detail.council_title);
        //table structure with validation rules
        // bodyFormData.append('image',detail.image);

        const { dispatch } = this.props;
        dispatch(councilActions.saveCouncil(detail, this.props.councilList));
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
                dispatch(councilActions.getCouncilList(1, 10, "asc", "filtered"));
                
                dispatch(councilActions.resetCouncilState());
                this.props.addCouncilHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }else{
            this.setState(this.initialState);
        }
    }
  render() {
      return (
            <AddCouncil 
              addCouncilShow = {this.props.addCouncilShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveCouncil = {this.handleSaveCouncil}
              handleInputChange = {this.handleInputChange}
              handleFileChange = {this.handleFileChange}
              payload = {this.state.councilForm}
            />
      );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for council list
 * @return                council list and loader
 */

function mapStateToProps(state) {
   const { councilList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.councilReducer;

    return {
        councilList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddCouncilContainer = connect(mapStateToProps)(AddCouncilContainer);
export { connectedAddCouncilContainer as AddCouncilContainer };
