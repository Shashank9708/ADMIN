import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import {AddMedicalStoresContainer} from './AddMedicalStoresContainer';
import { medicalStoresActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'

class MedicalStores extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        this.addMedicalStoresShowHandle = this.addMedicalStoresShowHandle.bind(this);
        this.addMedicalStoresHideHandle = this.addMedicalStoresHideHandle.bind(this);

        this.getMedicalStoresList        = this.getMedicalStoresList.bind(this);
        this.statusShowHandle = this.statusShowHandle.bind(this);
        this.notificationSearch         = this.notificationSearch.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addMedicalStoresShow: false
        }
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addMedicalStoresShowHandle() {
       this.setState({ addMedicalStoresShow: true });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addMedicalStoresHideHandle() {
       this.setState({ addMedicalStoresShow: false });
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
    getMedicalStoresList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(medicalStoresActions.getMedicalStoresList(page, pageSize, sorted, filtered));
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
    statusShowHandle(storeid, status) {
        var json = {'storeid':storeid,'status':status}
        const { dispatch } = this.props;
        dispatch(medicalStoresActions.statusChange(json));

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
                dispatch(medicalStoresActions.resetMedicalStoresState())

                this.getMedicalStoresList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
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
                                              <h1 className="page-title">Medical Stores</h1>
                                          </div>
                                          <div className="col-md-6 text-right">
                                             <button className="blue btn text-btn" onClick={this.addMedicalStoresShowHandle}>Add New</button>
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
                                          data={this.props.medicalStoresList}
                                          filterable
                                          defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                          filtered={this.state.filtered}
                                          columns={[
                                              {
                                                  Header: 'UIN',
                                                  accessor  : "storeid",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Name',
                                                  accessor  : "name",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Contact No',
                                                  accessor  : "contact_no",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Registration No',
                                                  accessor  : "license",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Home Service',
                                                  accessor  : "homeservice",
                                                  filterable  : false,
                                                  
                                                  className : 'grid-header',
                                                  Cell: row => {
                                                          return  (
                                                              <div>
                                                              {
                                                                row.value === 1 ?
                                                                'Yes'
                                                                :
                                                                'No'
                                                              }
                                                              </div>
                                                          )}
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
                                                                  onClick={ this.statusShowHandle.bind(null,row.original.storeid,0) } 
                                                                  disabled={ this.props.submitted ? true : false }>
                                                                    <span className="btn btn-success">Active</span>
                                                                </a>
                                                                :
                                                                <a href="javascript:void(0)" 
                                                                  className="btn"
                                                                  onClick={ this.statusShowHandle.bind(null,row.original.storeid,1) } 
                                                                  disabled={ this.props.submitted ? true : false }>
                                                                    <span className="grey btn">Inactive</span>   
                                                                </a>
                                                              }
                                                              </div>
                                                          )}
                                                },
                                                {
                                                    Header: 'Actions',
                                                    accessor  : "storeid",
                                                    filterable  : false,
                                                    
                                                    className : 'grid-header',
                                                    Cell: row => 
                                                          <DropdownButton id={"dropdown-"+row.value} title="Action" menuAlign="right">
                                                              <Dropdown.Item >View</Dropdown.Item>
                                                              <Dropdown.Item >Edit</Dropdown.Item>
                                                              <Dropdown.Item >Delete</Dropdown.Item>
                                                          </DropdownButton>
                                                }
                                              
                                          ]}
                                          defaultSorted={[
                                              {
                                                  id: "storeid",
                                                  desc: false
                                              }
                                          ]}
                                          defaultPageSize={10}
                                          minRows= {this.props.medicalStoresList}
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
                                              this.getMedicalStoresList(state.page, state.pageSize, state.sorted, state.filtered);
                                          }}
                                      />
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <AddMedicalStoresContainer
                        addMedicalStoresShow = {this.state.addMedicalStoresShow}
                        addMedicalStoresHideHandle = {this.addMedicalStoresHideHandle}
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
   const { medicalStoresList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status } = state.medicalStoresReducer;
   // console.log('medicalStoresList',medicalStoresList)
    return {
        medicalStoresList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status
    };
}
const connectedMedicalStores = connect(mapStateToProps)(MedicalStores);
export { connectedMedicalStores as MedicalStores };
