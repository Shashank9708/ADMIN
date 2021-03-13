import React from 'react';
import { connect } from 'react-redux';
import { productCategoriesActions } from '../../_actions';
import { AddProductsCategories } from './AddProductsCategories';
import { productCategoriesValidator } from '../../_validator';


class AddProductsCategoriesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveProductsCategories = this.handleSaveProductsCategories.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  get initialState() {
      return {
          productCategoriesForm : {
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
        const { detail, validate }  = this.state.productCategoriesForm;
        this.setState({
            productCategoriesForm : {
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
        const { detail, validate }  = this.state.productCategoriesForm;
        this.setState({
        productCategoriesForm : {
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
      this.props.addProductsCategoriesHideHandle();
      const { dispatch } = this.props;
      dispatch(productCategoriesActions.resetProductCategoriesState());
  }

  handleSaveProductsCategories() {
    if(productCategoriesValidator.is_productCategoriesValid(this)) {
        const { detail } = this.state.productCategoriesForm;
        // console.log(detail)
        var bodyFormData = new FormData();
        bodyFormData.append('name', detail.name);
        bodyFormData.append('details', detail.details);
        //table structure with validation rules
        bodyFormData.append('image',detail.image);

        const { dispatch } = this.props;
        dispatch(productCategoriesActions.saveProductCategories(bodyFormData, this.props.productCategoriesList));
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
                dispatch(productCategoriesActions.getProductCategoriesList(1, 10, "asc", "filtered"));
                
                dispatch(productCategoriesActions.resetProductCategoriesState());
                this.props.addProductsCategoriesHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }else{
            this.setState(this.initialState);
        }
    }
  render() {
      return (
            <AddProductsCategories 
              addProductsCategoriesShow = {this.props.addProductsCategoriesShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveProductsCategories = {this.handleSaveProductsCategories}
              handleInputChange = {this.handleInputChange}
              handleFileChange = {this.handleFileChange}
              payload = {this.state.productCategoriesForm}
            />
      );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for productCategories list
 * @return                productCategories list and loader
 */

function mapStateToProps(state) {
   const { productCategoriesList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.productCategoriesReducer;

    return {
        productCategoriesList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddProductsCategoriesContainer = connect(mapStateToProps)(AddProductsCategoriesContainer);
export { connectedAddProductsCategoriesContainer as AddProductsCategoriesContainer };
