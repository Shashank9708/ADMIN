import React from 'react';
import { connect } from 'react-redux';
import { healthTipsCategoriesActions } from '../../_actions';
import { AddHealthTipsCategories } from './AddHealthTipsCategories';
import { healthTipsCategoriesValidator } from '../../_validator';


class AddHealthTipsCategoriesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveHealthTipsCategories = this.handleSaveHealthTipsCategories.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  get initialState() {
      return {
          healthTipsCategoriesForm : {
              detail : {
                  'title_en' : '',
                  'image' : '',
              },
              validate : {
                  title_en : { isValid : true, message : '' }
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
        const { detail, validate }  = this.state.healthTipsCategoriesForm;
        this.setState({
            healthTipsCategoriesForm : {
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
        const { detail, validate }  = this.state.healthTipsCategoriesForm;
        this.setState({
        healthTipsCategoriesForm : {
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
      this.props.addHealthTipsCategoriesHideHandle();
      const { dispatch } = this.props;
      dispatch(healthTipsCategoriesActions.resetHealthTipsCategoriesState());
  }

  handleSaveHealthTipsCategories() {
    if(healthTipsCategoriesValidator.is_healthTipsCategoriesValid(this)) {
        const { detail } = this.state.healthTipsCategoriesForm;
        // console.log(detail)
        var bodyFormData = new FormData();
        bodyFormData.append('title_en', detail.title_en);
        //table structure with validation rules
        bodyFormData.append('image',detail.image);

        const { dispatch } = this.props;
          if(this.props.flag){
            bodyFormData.append('id',this.state.id);
            dispatch(healthTipsCategoriesActions.editHealthTipsCategories(bodyFormData, this.props.healthTipsCategoriesList));
          }else{
            dispatch(healthTipsCategoriesActions.saveHealthTipsCategories(bodyFormData, this.props.healthTipsCategoriesList));
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
              healthTipsCategoriesForm : {
                detail : {
                    'title_en' : newProps.payload.title_en,
                    'image' : newProps.payload.image,
                },
                validate : {
                    title_en : { isValid : true, message : '' }
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
                dispatch(healthTipsCategoriesActions.getHealthTipsCategoriesList(1, 10, "asc", "filtered"));
                
                dispatch(healthTipsCategoriesActions.resetHealthTipsCategoriesState());
                this.props.addHealthTipsCategoriesHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }
    }
  render() {
      return (
            <AddHealthTipsCategories 
              addHealthTipsCategoriesShow = {this.props.addHealthTipsCategoriesShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveHealthTipsCategories = {this.handleSaveHealthTipsCategories}
              handleInputChange = {this.handleInputChange}
              handleFileChange = {this.handleFileChange}
              payload = {this.state.healthTipsCategoriesForm}
            />
      );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for healthTipsCategories list
 * @return                healthTipsCategories list and loader
 */

function mapStateToProps(state) {
   const { healthTipsCategoriesList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.healthTipsCategoriesReducer;

    return {
        healthTipsCategoriesList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddHealthTipsCategoriesContainer = connect(mapStateToProps)(AddHealthTipsCategoriesContainer);
export { connectedAddHealthTipsCategoriesContainer as AddHealthTipsCategoriesContainer };
