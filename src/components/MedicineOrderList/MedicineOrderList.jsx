import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { SideMenu } from '../../components/SideMenu';
// import {AddFavoriteDoctorContainer} from './AddFavoriteDoctorContainer';
import { medicalStoresActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'


class MedicineOrderList extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);

        this.getMedicineOrderList        = this.getMedicineOrderList.bind(this);
        this.notificationSearch           = this.notificationSearch.bind(this);
        this.handleSelectChange         = this.handleSelectChange.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addFavoriteDoctorShow: false
        }
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
    getMedicineOrderList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(medicalStoresActions.getMedicineOrder());
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
                dispatch(medicalStoresActions.resetMedicalStoresState())

                this.getMedicineOrderList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
    }

  
    /**
    * @DateOfCreation        11 June 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(e,id) {
      let data = {id: id, status: e.target.value}
      // changeMedicineOrderStatus
        // console.log(id,'selectedOption',e.target.value)
        const { dispatch } = this.props;
        dispatch(medicalStoresActions.changeMedicineOrderStatus(data));
    }


    render() {
      var statusOption =[{"label": "Pending", "value": 0},{"label": "Complete", "value": 1},{"label": "Cancel", "value": 2}]
        // var fileSize = parseInt(configConstants.MAX_FILE_SIZE);
        return (
            <React.Fragment>
                <HeaderContainer />
                <div className="container-fluid">
                   <div className="row">
                        <SideMenu/>
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <h1 className="page-title">Medicine Order List</h1>
                                </div>
                                {/*<div className="col-md-6 text-right">
                                    <button className="blue btn text-btn" onClick={this.addFavoriteDoctorShowHandle}>Add New</button>
                                </div>*/}
                            </div>
                            <div className="row">
                                <ReactTable
                                  noDataText="No found !!"
                                  data={this.props.medicalStoresList}
                                  filterable
                                  defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                  filtered={this.state.filtered}
                                  columns={[
                                      
                                      {
                                          Header: 'Patient Name',
                                          accessor  : "name",
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header: 'Mobile No',
                                          accessor  : "contact_no",
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header: 'Address',
                                          accessor  : "address",
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header: 'Landmark',
                                          accessor  : "landmark",
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header: 'Pincode',
                                          accessor  : "pincode",
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Prescription",
                                          accessor  : "prescription_url",
                                          className : "grid-header",
                                          filterable  : false,
                                          Cell: row => {
                                                return  (
                                                    <div>
                                                    <a href={configConstants.API_BASE_PATH+"/"+row.value} target="_blank">View</a>
                                                    </div>
                                                )}
                                      },
                                      {
                                          Header: 'Change Order Status',
                                          accessor  : "status",
                                          filterable  : false,
                                          
                                          className : 'grid-header',
                                          Cell: row => {
                                                return  (
                                                  <>
                                                    <select
                                                        placeholder = "Change Order Status"
                                                        onChange={ (e) => this.handleSelectChange(e,row.original.id) }
                                                        name='status'
                                                        value={row.original.status}
                                                    >
                                                    <option value="0">Pending</option>
                                                    <option value="1">Complete</option>
                                                    <option value="2">Cancel</option>
                                                    </select>
                                                  </> 
                                                )}
                                      }
                                      
                                  ]}
                                  defaultSorted={[
                                      {
                                          id: "id",
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
                                      this.getMedicineOrderList(state.page, state.pageSize, state.sorted, state.filtered);
                                  }}
                                />
                            </div>
                        </main>
                      {/*<AddFavoriteDoctorContainer
                        addFavoriteDoctorShow = {this.state.addFavoriteDoctorShow}
                        getDoctor={this.getDoctor}
                        categoryList = {this.props.categoryList}
                        doctorList = {this.props.doctorList}
                        addFavoriteDoctorHideHandle = {this.addFavoriteDoctorHideHandle}
                      />*/}
                    </div>
                </div>    
            </React.Fragment>
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
    return {
        medicalStoresList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status,
    };
}
const connectedMedicineOrderList = connect(mapStateToProps)(MedicineOrderList);
export { connectedMedicineOrderList as MedicineOrderList };
