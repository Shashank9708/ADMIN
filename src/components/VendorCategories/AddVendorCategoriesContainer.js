import React from 'react';
import { connect } from 'react-redux';
import { vendorCategoriesActions } from '../../_actions';
import { AddVendorCategories } from './AddVendorCategories';
import { vendorCategoriesValidator } from '../../_validator';


class AddVendorCategoriesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveVendorCategories = this.handleSaveVendorCategories.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  get initialState() {
      return {
          vendorCategoriesForm : {
              detail : {
                  'name' : '',
                  'details' : '',
                  'image' : '',
              },
              validate : {
                  name : { isValid : true, message : '' }
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
        const { detail, validate }  = this.state.vendorCategoriesForm;
        this.setState({
            vendorCategoriesForm : {
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
        const { detail, validate }  = this.state.vendorCategoriesForm;
        this.setState({
        vendorCategoriesForm : {
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
      this.props.addVendorCategoriesHideHandle();
      const { dispatch } = this.props;
      dispatch(vendorCategoriesActions.resetVendorCategoriesState());
  }

  handleSaveVendorCategories() {
    if(vendorCategoriesValidator.is_vendorCategoriesValid(this)) {
        const { detail } = this.state.vendorCategoriesForm;
        // console.log(detail)
        var bodyFormData = new FormData();
        bodyFormData.append('name', detail.name);
        bodyFormData.append('details', detail.details);
        //table structure with validation rules
        bodyFormData.append('image',detail.image);

        const { dispatch } = this.props;
        dispatch(vendorCategoriesActions.saveVendorCategories(bodyFormData, this.props.vendorCategoriesList));
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
                dispatch(vendorCategoriesActions.getVendorCategoriesList(1, 10, "asc", "filtered"));
                
                dispatch(vendorCategoriesActions.resetVendorCategoriesState());
                this.props.addVendorCategoriesHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }else{
            this.setState(this.initialState);
        }
    }
  render() {
      return (
            <AddVendorCategories 
              addVendorCategoriesShow = {this.props.addVendorCategoriesShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveVendorCategories = {this.handleSaveVendorCategories}
              handleInputChange = {this.handleInputChange}
              handleFileChange = {this.handleFileChange}
              payload = {this.state.vendorCategoriesForm}
            />
      );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for vendorCategories list
 * @return                vendorCategories list and loader
 */

function mapStateToProps(state) {
   const { vendorCategoriesList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.vendorCategoriesReducer;

    return {
        vendorCategoriesList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddVendorCategoriesContainer = connect(mapStateToProps)(AddVendorCategoriesContainer);
export { connectedAddVendorCategoriesContainer as AddVendorCategoriesContainer };
