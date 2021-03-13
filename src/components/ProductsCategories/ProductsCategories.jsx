import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import {AddProductsCategoriesContainer} from './AddProductsCategoriesContainer';
import { productCategoriesActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'


class ProductsCategories extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        this.addProductsCategoriesShowHandle = this.addProductsCategoriesShowHandle.bind(this);
        this.addProductsCategoriesHideHandle = this.addProductsCategoriesHideHandle.bind(this);

        this.getProductsCategoriesList        = this.getProductsCategoriesList.bind(this);
        this.statusShowHandle = this.statusShowHandle.bind(this);
        this.notificationSearch         = this.notificationSearch.bind(this);
        this.deleteProducts         = this.deleteProducts.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addProductsCategoriesShow: false
        }
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addProductsCategoriesShowHandle() {
       this.setState({ addProductsCategoriesShow: true });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addProductsCategoriesHideHandle() {
       this.setState({ addProductsCategoriesShow: false });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    deleteProducts(id) {
        var json = {'id':id}
        const { dispatch } = this.props;
        dispatch(productCategoriesActions.deleteProductCategory(json));

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
    getProductsCategoriesList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(productCategoriesActions.getProductCategoriesList(page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    statusShowHandle(id, status) {
        var json = {'id':id,'status':status}
        const { dispatch } = this.props;
        dispatch(productCategoriesActions.statusChange(json));

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
   * @DateOfCreation        28 June 2018
   * @ShortDescription      This function is responsible to close import model.
   * @return                Nothing
  */
    UNSAFE_componentWillReceiveProps(newProps) {
        
        if(newProps.status == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                dispatch(productCategoriesActions.resetProductCategoriesState())

                this.getProductsCategoriesList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
    }

    render() {
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
                                                <h1 className="page-title">Product Categories</h1>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <button className="blue btn text-btn" onClick={this.addProductsCategoriesShowHandle}>Add New</button>
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
                                            data={this.props.productCategoriesList}
                                            filterable
                                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                            filtered={this.state.filtered}
                                            columns={[
                                                {
                                                    Header: 'Image',
                                                    accessor  : "image",
                                                    className : 'grid-header',
                                                    filterable  : false,
                                                    Cell: row =>
                                                      <div><img src={configConstants.API_BASE_PATH+"/"+row.value} width="50px" height="50px"/></div>
                                                    
                                                },
                                                {
                                                    Header      : "ProductsCategories ID",
                                                    accessor    : "id",
                                                    className   : "grid-header",
                                                    filterable  : false,
                                                    filterMethod: (filter, row) => {
                                                        return row[filter.id].includes(filter.value);
                                                    }
                                                },
                                                {
                                                    Header    : "Title",
                                                    accessor  : "name",
                                                    className : "grid-header",
                                                    filterable  : false,
                                                    filterMethod: (filter, row) => {
                                                        return row[filter.id].includes(filter.value);
                                                    }
                                                },
                                                {
                                                    Header    : "Description",
                                                    accessor  : "details",
                                                    className : "grid-header",
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
                                                                  onClick={ this.statusShowHandle.bind(null,row.original.id,0) } 
                                                                  disabled={ this.props.submitted ? true : false }>
                                                                    <span className="btn btn-success">Active</span>
                                                                </a>
                                                                :
                                                                <a href="javascript:void(0)" 
                                                                  className="btn"
                                                                  onClick={ this.statusShowHandle.bind(null,row.original.id,1) } 
                                                                  disabled={ this.props.submitted ? true : false }>
                                                                    <span className="grey btn">Inactive</span>   
                                                                </a>
                                                              }
                                                              </div>
                                                          )}
                                                },
                                                {
                                                    Header: 'Actions',
                                                    accessor  : "id",
                                                    filterable  : false,
                                                    
                                                    className : 'grid-header',
                                                    Cell: row => 
                                                          <DropdownButton id={"dropdown-"+row.value} title="Action" menuAlign="right">
                                                              <Dropdown.Item onClick={ this.deleteProducts.bind(null,row.original.id) }>Delete</Dropdown.Item>
                                                          </DropdownButton>
                                                }
                                                
                                            ]}
                                            defaultSorted={[
                                                {
                                                    id: "id",
                                                    desc: false
                                                }
                                            ]}
                                            defaultPageSize={10}
                                            minRows= {this.props.productCategoriesList}
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
                                                this.getProductsCategoriesList(state.page, state.pageSize, state.sorted, state.filtered);
                                            }}
                                        />
                                    </div>
                                </div>
                                </div>
                        </div>
                        </div>
                      </div>
                      <AddProductsCategoriesContainer
                        addProductsCategoriesShow = {this.state.addProductsCategoriesShow}
                        addProductsCategoriesHideHandle = {this.addProductsCategoriesHideHandle}
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
   const { productCategoriesList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status } = state.productCategoriesReducer;
   // console.log('productCategoriesList',productCategoriesList)
    return {
        productCategoriesList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status
    };
}
const connectedProductsCategories = connect(mapStateToProps)(ProductsCategories);
export { connectedProductsCategories as ProductsCategories };
