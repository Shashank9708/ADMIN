import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import {AddVendorCategoriesContainer} from './AddVendorCategoriesContainer';
import { vendorCategoriesActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'


class VendorCategories extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        this.addVendorCategoriesShowHandle = this.addVendorCategoriesShowHandle.bind(this);
        this.addVendorCategoriesHideHandle = this.addVendorCategoriesHideHandle.bind(this);

        this.getVendorsCategoriesList        = this.getVendorsCategoriesList.bind(this);
        this.statusShowHandle = this.statusShowHandle.bind(this);
        this.notificationSearch         = this.notificationSearch.bind(this);
        this.deleteVendor         = this.deleteVendor.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addVendorCategoriesShow: false
        }
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addVendorCategoriesShowHandle() {
       this.setState({ addVendorCategoriesShow: true });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addVendorCategoriesHideHandle() {
       this.setState({ addVendorCategoriesShow: false });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    deleteVendor(id) {
        var json = {'id':id}
        const { dispatch } = this.props;
        dispatch(vendorCategoriesActions.deleteVendorCategory(json));

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
    getVendorsCategoriesList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(vendorCategoriesActions.getVendorCategoriesList(page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    statusShowHandle(id, status) {
        var json = {'id':id,'status':status}
        const { dispatch } = this.props;
        dispatch(vendorCategoriesActions.statusChange(json));

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
                dispatch(vendorCategoriesActions.resetVendorCategoriesState())

                this.getVendorsCategoriesList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
    }

    render() {
        // var fileSize = parseInt(configConstants.MAX_FILE_SIZE);
        return (
            <>
                <HeaderContainer />
                <div className="container-fluid">
                   <div className="row">
                      <SideMenu/>
                      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                          <div className="page-heading">
                            <div className="page-heading__title-container">
                                <h1 className="page-heading__title">Vendor Categories</h1>
                            </div>
                            <div className="page-heading__btn-container">
                              <button className="page-heading__btn btn-sm" onClick={this.addVendorCategoriesShowHandle}>Add New</button>
                            </div>
                          </div>
                          <div className="row">
                              <ReactTable
                                  noDataText="No found !!"
                                  data={this.props.vendorCategoriesList}
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
                                          Header      : "VendorCategories ID",
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
                                                <div className="">
                                                  <button type="button" className="btn-sm dropdown-toggle" data-toggle="dropdown" id={"dropdown-"+row.value}>
                                                    <span className="caret"></span>
                                                    <span>Action</span>
                                                  </button>
                                                  <ul className="dropdown-menu" role="menu">
                                                    <li><a href="#" onClick={ this.deleteVendor.bind(null,row.original.id) }>Delete</a></li>
                                                  </ul>
                                                </div>
                                      }
                                      
                                  ]}
                                  defaultSorted={[
                                      {
                                          id: "id",
                                          desc: false
                                      }
                                  ]}
                                  defaultPageSize={10}
                                  minRows= {this.props.vendorCategoriesList}
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
                                      this.getVendorsCategoriesList(state.page, state.pageSize, state.sorted, state.filtered);
                                  }}
                              />
                          </div>
                      </main>
                      <AddVendorCategoriesContainer
                        addVendorCategoriesShow = {this.state.addVendorCategoriesShow}
                        addVendorCategoriesHideHandle = {this.addVendorCategoriesHideHandle}
                      />
                    </div>
                </div>    
            </>
        );
    }
}

/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for notification list
 * @return                notification list and loader
 */

function mapStateToProps(state) {
   const { vendorCategoriesList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status } = state.vendorCategoriesReducer;
   // console.log('vendorCategoriesList',vendorCategoriesList)
    return {
        vendorCategoriesList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status
    };
}
const connectedVendorCategories = connect(mapStateToProps)(VendorCategories);
export { connectedVendorCategories as VendorCategories };
