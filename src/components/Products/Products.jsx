import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import {AddProductsContainer} from './AddProductsContainer';
import { productActions, productCategoriesActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'

class Products extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        this.addProductsShowHandle = this.addProductsShowHandle.bind(this);
        this.addProductsHideHandle = this.addProductsHideHandle.bind(this);

        this.getProductsList        = this.getProductsList.bind(this);
        this.statusShowHandle = this.statusShowHandle.bind(this);
        this.notificationSearch         = this.notificationSearch.bind(this);
        this.deleteProducts         = this.deleteProducts.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addProductsShow: false
        }
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addProductsShowHandle() {
       this.setState({ addProductsShow: true });
       const { dispatch }   = this.props;
       dispatch(productCategoriesActions.getProductCategoriesList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered));
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addProductsHideHandle() {
       this.setState({ addProductsShow: false });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to redirect unauthorise users
     * @return                Redirect
     */
    componentDidUpdate(){
        const { dispatch }  = this.props;
        if(this.props.isUserNotValid){
           dispatch(headerActions.logout());
        }
    }

    /**
    * @DateOfCreation        26 July 2018
    * @ShortDescription      This function is responsible to get the list of notification from API
    * @return                Nothing
    */
    getProductsList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(productActions.getProductList(page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle load filtered notification list
     * @return                Nothing
    */
    notificationSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    statusShowHandle(id, status) {
        var json = {'id':id,'status':status}
        const { dispatch } = this.props;
        dispatch(productActions.statusChange(json));

    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    deleteProducts(id) {
        var json = {'id':id}
        const { dispatch } = this.props;
        dispatch(productActions.deleteProduct(json));

    }

    /**
   * @DateOfCreation        28 June 2018
   * @ShortDescription      This function is responsible to close import model.
   * @return                Nothing
  */
    UNSAFE_componentWillReceiveProps(newProps) {
        
        if(newProps.status == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                dispatch(productActions.resetProductState())

                this.getProductsList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
    }

    render() {
      // console.log("this.props.productList",this.props.productList)
        // var fileSize = parseInt(configConstants.MAX_FILE_SIZE);
        return (
            <div className="page-container">
                <HeaderContainer />
                <div className="container-fluid">
                   <div className="row">
                      <div className="col-md-2.5">
                        <SideMenu/>
                      </div>
                      <div className="col-md-9">
                        <div className="main-content">
                          <div className="wrap-inner-content">
                            <div className="col-md-12">
                              <div className="inner-content">
                                      <div className="row page-header">
                                          <div className="col-md-6">
                                              <h1 className="page-title">Products</h1>
                                          </div>
                                          <div className="col-md-6 text-right">
                                             <button className="blue btn text-btn" onClick={this.addProductsShowHandle}>Add New</button>
                                          </div>
                                      </div>
                                      <div className="table-wrap">
                                      {/*<div className="table-search">
                                              <input
                                                  value={this.state.filterAll}
                                                  onChange={this.notificationSearch}
                                                  className="table-search-input"
                                                  placeholder="Search"
                                              />
                                      </div>*/}
                                      <ReactTable
                                          noDataText="No found !!"
                                          data={this.props.productList}
                                          filterable
                                          defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                          filtered={this.state.filtered}
                                          columns={[
                                              {
                                                  Header: 'Image',
                                                  accessor  : "product_image",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  Cell: row =>
                                                    <div><img src={configConstants.API_BASE_PATH+"/"+row.value} width="50px" height="50px"/></div>
                                                    
                                              },
                                              {
                                                  Header: 'Title',
                                                  accessor  : "product_name",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Category',
                                                  accessor  : "cat_name",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Description',
                                                  accessor  : "product_description",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Quantity',
                                                  accessor  : "quantity",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Price',
                                                  accessor  : "price",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Discount Percent',
                                                  accessor  : "discount_percent",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Sale Price',
                                                  accessor  : "sale_price",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Status',
                                                  accessor  : "status",
                                                  filterable  : false,
                                                  
                                                  className : 'grid-header',
                                                  Cell: row => {
                                                          return  (
                                                              <div>
                                                              {
                                                                row.value === 1 ?
                                                                <a href="javascript:void(0)" 
                                                                  className="btn"
                                                                  onClick={ this.statusShowHandle.bind(null,row.original.product_id,0) } 
                                                                  disabled={ this.props.submitted ? true : false }>
                                                                    <span className="btn btn-success">Active</span>
                                                                </a>
                                                                :
                                                                <a href="javascript:void(0)" 
                                                                  className="btn"
                                                                  onClick={ this.statusShowHandle.bind(null,row.original.product_id,1) } 
                                                                  disabled={ this.props.submitted ? true : false }>
                                                                    <span className="grey btn">Inactive</span>   
                                                                </a>
                                                              }
                                                              </div>
                                                          )}
                                                },
                                                {
                                                    Header: 'Actions',
                                                    accessor  : "product_id",
                                                    filterable  : false,
                                                    
                                                    className : 'grid-header',
                                                    Cell: row => 
                                                          <DropdownButton id={"dropdown-"+row.value} title="Action" menuAlign="right">
                                                              <Dropdown.Item onClick={ this.deleteProducts.bind(null,row.original.product_id) }>Delete</Dropdown.Item>
                                                          </DropdownButton>
                                                }
                                              
                                          ]}
                                          defaultSorted={[
                                              {
                                                  id: "product_id",
                                                  desc: false
                                              }
                                          ]}
                                          defaultPageSize={10}
                                          // minRows= {this.props.productList}
                                          className="table table-bordered responsive"
                                          loading={this.state.loading}
                                          filterable
                                          Sorted
                                          // pages={this.props.pages}
                                          showPagination={true}
                                          showPaginationTop={true}
                                          showPaginationBottom={false}
                                          pageSizeOptions={[10, 20, 50]}
                                          automatic // For server side pagination
                                          onFetchData={(state, instance) => {
                                              this.getProductsList(state.page, state.pageSize, state.sorted, state.filtered);
                                          }}
                                      />
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <AddProductsContainer
                        addProductsShow = {this.state.addProductsShow}
                        productCategoriesList = {this.props.productCategoriesList}
                        addProductsHideHandle = {this.addProductsHideHandle}
                      />
                    </div>
                </div>    
            </div>
        );
    }
}

/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for notification list
 * @return                notification list and loader
 */

function mapStateToProps(state) {
   const { productList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status } = state.productReducer;
   const { productCategoriesList  } = state.productCategoriesReducer;
    return {
        productList,
        isUserNotValid,
        loader,
        productCategoriesList,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status
    };
}
const connectedProducts = connect(mapStateToProps)(Products);
export { connectedProducts as Products };
