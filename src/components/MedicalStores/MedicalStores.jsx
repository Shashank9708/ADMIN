import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import {AddMedicalStoresContainer} from './AddMedicalStoresContainer';
import { medicalStoresActions, headerActions, commonActions, planActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import { ReNew } from '../Doctor/ReNew';



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

        this.reNewShowHandle = this.reNewShowHandle.bind(this);
        this.reNewHideHandle = this.reNewHideHandle.bind(this);
        this.reNewhandleInputChange = this.reNewhandleInputChange.bind(this);
        this.reNewhandleSelectChange = this.reNewhandleSelectChange.bind(this);
        this.reNewSave = this.reNewSave.bind(this);
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addMedicalStoresShow: false,
            renew: {
              renewdata: {
                user_id: '',
                plan_id: '',
                payment_type: '',
                transaction_id: '',
                amount: ''
              }
            }
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
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    reNewShowHandle(data) {
      // console.log("data",data)
        const { dispatch }   = this.props;
        dispatch(planActions.getPlanList(1, 10, '', ''));

        this.setState({ reNewShow: true });
        const { renewdata }  = this.state.renew;
        this.setState({
            renew : {
              renewdata: {
                user_id: data.user_id,
                plan_id: data.plan_id,
                payment_type: '',
                transaction_id: '',
                amount: ''
              }
            }
        });
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
    reNewHideHandle() {
        this.setState({ reNewShow: false, doc_id: '' });
    }

    /**
     * @DateOfCreation        01 August 2018
     * @ShortDescription      This function is responsible to sending mail.
     * @return                Void
     */
    reNewhandleInputChange(event) {
      const { name, value }       = event.target;
        const { renewdata }  = this.state.renew;
        this.setState({
            renew : {
                renewdata : {
                    ...renewdata,
                    [name]: value
                  }
            }
        });
        
    }
    /**
     * @DateOfCreation        01 August 2018
     * @ShortDescription      This function is responsible to sending mail.
     * @return                Void
     */
    reNewhandleSelectChange(selectedOption, name) {
        const { renewdata }  = this.state.renew;
        if(name === 'plan_id'){
          this.setState({
              renew : {
                  renewdata : {
                      ...renewdata,
                      [name] : selectedOption.value,
                      'amount' : selectedOption.sale_price
                    }
              }
          });
        }else{
          this.setState({
              renew : {
                  renewdata : {
                      ...renewdata,
                      [name] : selectedOption.value
                  }
              }
          });  
        }
        
    }
    reNewSave(){
        const { renewdata }  = this.state.renew;
        // console.log("save",renewdata)
        const { dispatch } = this.props;
        dispatch(commonActions.renewPackage(renewdata));
    }

    /**
   * @DateOfCreation        28 June 2018
   * @ShortDescription      This function is responsible to close import model.
   * @return                Nothing
  */
    UNSAFE_componentWillReceiveProps(newProps) {
        console.log("newProps",newProps)
        if(newProps.status == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                dispatch(medicalStoresActions.resetMedicalStoresState())

                this.getMedicalStoresList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
        if(newProps.renewClose == true){
            setTimeout(function() { 
                this.reNewHideHandle();
                this.getMedicalStoresList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
                const { dispatch } = this.props;
                dispatch(commonActions.resetReNewState())
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
                                <h1 className="page-heading__title">Medical Stores</h1>
                            </div>
                            <div className="page-heading__btn-container">
                              <button className="page-heading__btn btn-sm" onClick={this.addMedicalStoresShowHandle}>Add New</button>
                            </div>
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
                                          Header    : 'Subscription',
                                          accessor  : 'plan_name',
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                        },
                                        {
                                          Header    : 'Subscription start date',
                                          accessor  : 'start_date',
                                          className : 'grid-header',
                                          filterable  : false,
                                          Cell: row => 
                                                      <div>
                                                          {
                                                            new Date(row.value).toLocaleDateString("en-US")
                                                          }
                                                      </div>  
                                        },
                                        {
                                          Header    : 'Subscription end date',
                                          accessor  : 'plan_expiry_date',
                                          className : 'grid-header',
                                          filterable  : false,
                                          Cell: row => 
                                                      <div>
                                                          {
                                                            new Date(row.value).toLocaleDateString("en-US")
                                                          }
                                                      </div>    
                                        },
                                        {
                                          Header    : 'Subscription amount',
                                          accessor  : 'amount',
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
                                                  <div className="">
                                                      <button type="button" className="btn-sm dropdown-toggle" data-toggle="dropdown" id={"dropdown-"+row.value}>
                                                        <span className="caret"></span>
                                                        <span>Action</span>
                                                      </button>
                                                      <ul className="dropdown-menu" role="menu">
                                                        <li><a href="#" onClick={() => this.reNewShowHandle(row.original)}>Renew Plan</a></li>
                                                        <Dropdown.Divider />
                                                        <li><a href="#">View</a></li>
                                                        <Dropdown.Divider />
                                                        <li><a href="#">Edit</a></li>
                                                        <Dropdown.Divider />
                                                        <li><a href="#">Delete</a></li>
                                                      </ul>
                                                    </div>
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
                      </main>
                      <AddMedicalStoresContainer
                        addMedicalStoresShow = {this.state.addMedicalStoresShow}
                        addMedicalStoresHideHandle = {this.addMedicalStoresHideHandle}
                      />
                      <ReNew
                        onClick = { this.state.reNewShow }
                        onClose = { this.reNewHideHandle }
                        payload = { this.state.renew }
                        planList = { this.props.planList }
                        handleInputChange = {this.reNewhandleInputChange}
                        handleSelectChange = {this.reNewhandleSelectChange}
                        reNewSave = {this.reNewSave}
                        type={3}
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
   const { medicalStoresList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status } = state.medicalStoresReducer;
   // console.log('medicalStoresList',medicalStoresList)
   const { statusClose, editClose, renewClose } = state.commonReducer;
   const { planList } = state.planReducer;
    return {
        medicalStoresList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status,
        planList,
        statusClose,
        editClose,
        renewClose
    };
}
const connectedMedicalStores = connect(mapStateToProps)(MedicalStores);
export { connectedMedicalStores as MedicalStores };
