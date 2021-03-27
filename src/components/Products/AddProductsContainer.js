import React from 'react';
import { connect } from 'react-redux';
import { productActions } from '../../_actions';
import { AddProducts } from './AddProducts';
import { productValidator } from '../../_validator';


class AddProductsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveProducts = this.handleSaveProducts.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputPriceChange = this.handleInputPriceChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.percentage = this.percentage.bind(this);
    this.onContentStateChange = this.onContentStateChange.bind(this);


  }

  get initialState() {
      return {
          productForm : {
              detail : {
                  'category_id' : '',
                  'product_name' : '',
                  'product_description' : '',
                  'quantity' : '',
                  'price' : '',
                  'discount_percent' : '',
                  'sale_price' : '',
                  'product_image' : '',
                  'content': '' 
              },
              validate : {
                  category_id : { isValid : true, message : '' },
                  product_name : { isValid : true, message : '' },
                  quantity : { isValid : true, message : '' },
                  price : { isValid : true, message : '' }
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
        const { detail, validate }  = this.state.productForm;
        this.setState({
            productForm : {
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
  handleInputPriceChange(event) {
        const { name, value }       = event.target;
        const { detail, validate }  = this.state.productForm;
        let discount_price;
        if(name === 'price'){
          if(detail.quantity){
            discount_price = this.percentage(detail.quantity, value)
            // console.log("discount_price", discount_price)
          }
        }else{
          if(detail.price){
            discount_price = this.percentage(value, detail.price)
            // console.log("discount_price", discount_price)
          }
        }

        this.setState({
            productForm : {
                validate:{
                    ...validate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
                detail : {
                    ...detail,
                    [name]: value,
                    sale_price: (discount_price) && detail.price - discount_price
                }
            }
        }, function(){
          
        });
    }

    percentage(percent, totalValue){
       // return (100 * partialValue) / totalValue;
       return ((percent/ 100) * totalValue)
    } 

    onContentStateChange(value){
      console.log("content",value)
      let name = 'content'
      const { detail, validate }  = this.state.productForm;
      this.setState({
            productForm : {
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
        const { detail, validate }  = this.state.productForm;
        this.setState({
        productForm : {
            validate:{
                ...validate,
                product_image: {
                    isValid: true,
                    message: ''
                }
            },
            detail : {
                ...detail,
                product_image: file
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
  handleSelectChange(selectedOption, name) {
      // console.log('selectedOption',selectedOption, name)
        const { detail, validate } = this.state.productForm;
        this.setState({
            productForm : {
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
     * @ShortDescription      This function is responsible to handle close add/edit employee modal
     * @return                Nothing
     */
  handleClose() {
      this.props.addProductsHideHandle();
      const { dispatch } = this.props;
      dispatch(productActions.resetProductState());
  }

  handleSaveProducts() {
    if(productValidator.is_productValid(this)) {
        const { detail } = this.state.productForm;
        var bodyFormData = new FormData();
        bodyFormData.append('category_id', detail.category_id);
        bodyFormData.append('product_name', detail.product_name);
        bodyFormData.append('product_description', detail.product_description);
        bodyFormData.append('quantity', detail.quantity);
        bodyFormData.append('price', detail.price);
        bodyFormData.append('discount_percent', detail.discount_percent);
        bodyFormData.append('sale_price', detail.sale_price);
        //table structure with validation rules
        bodyFormData.append('image',detail.product_image);
        bodyFormData.append('content',JSON.stringify(detail.content));

        const { dispatch } = this.props;
        dispatch(productActions.saveProduct(bodyFormData, this.props.productList));
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
                dispatch(productActions.getProductList(1, 10, "asc", "filtered"));
                
                dispatch(productActions.resetProductState());
                this.props.addProductsHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }else{
            this.setState(this.initialState);
        }
    }
  render() {
      return (
            <AddProducts 
              addProductsShow = {this.props.addProductsShow}
              productCategoriesList = {this.props.productCategoriesList}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveProducts = {this.handleSaveProducts}
              handleInputChange = {this.handleInputChange}
              handleInputPriceChange = {this.handleInputPriceChange}
              handleFileChange = {this.handleFileChange}
              handleSelectChange = {this.handleSelectChange}
              onContentStateChange = {this.onContentStateChange}
              payload = {this.state.productForm}
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
   const { productList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.productReducer;

    return {
        productList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddProductsContainer = connect(mapStateToProps)(AddProductsContainer);
export { connectedAddProductsContainer as AddProductsContainer };
