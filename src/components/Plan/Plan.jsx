import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import {AddPlanContainer} from './AddPlanContainer';
import { planActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'


class Plan extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        this.addPlanShowHandle = this.addPlanShowHandle.bind(this);
        this.addPlanHideHandle = this.addPlanHideHandle.bind(this);

        this.getPlansList        = this.getPlansList.bind(this);
        this.statusShowHandle = this.statusShowHandle.bind(this);
        this.notificationSearch         = this.notificationSearch.bind(this);
        this.deletePlan         = this.deletePlan.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addPlanShow: false
        }
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addPlanShowHandle() {
       this.setState({ addPlanShow: true });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addPlanHideHandle() {
       this.setState({ addPlanShow: false });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    deletePlan(id) {
        var json = {'id':id}
        const { dispatch } = this.props;
        dispatch(planActions.deletePlan(json));

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
    getPlansList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(planActions.getPlanList(page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    statusShowHandle(id, status) {
        var json = {'id':id,'status':status}
        const { dispatch } = this.props;
        dispatch(planActions.statusChange(json));

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
                dispatch(planActions.resetPlanState())

                this.getPlansList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
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
                                <h1 className="page-heading__title">Plan Management</h1>
                            </div>
                            <div className="page-heading__btn-container">
                              <button className="page-heading__btn btn-sm" onClick={this.addPlanShowHandle}>Add New</button>
                            </div>
                          </div>
                          <div className="row">
                              <ReactTable
                                  noDataText="No found !!"
                                  data={this.props.planList}
                                  filterable
                                  defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                  filtered={this.state.filtered}
                                  columns={[
                                      {
                                          Header      : "Plan ID",
                                          accessor    : "id",
                                          className   : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Plan Name",
                                          accessor  : "plan_name",
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
                                          Header    : "User Type",
                                          accessor  : "type",
                                          className : "grid-header",
                                          filterable  : false,
                                          Cell: row => {
                                                return  (
                                                    <div>
                                                    {
                                                      row.value === 1 ?
                                                      <>Doctor</>
                                                      :
                                                      row.value === 3 ?
                                                      <>Medical</>
                                                      :
                                                      <>Pathology</>
                                                    }
                                                    </div>
                                                )}
                                      },
                                      {
                                          Header    : "Days",
                                          accessor  : "days",
                                          className : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Price",
                                          accessor  : "price",
                                          className : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Sale Price",
                                          accessor  : "sale_price",
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
                                                    <li><a href="#" onClick={ this.deletePlan.bind(null,row.original.id) }>Delete</a></li>
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
                                  minRows= {this.props.planList}
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
                                      this.getPlansList(state.page, state.pageSize, state.sorted, state.filtered);
                                  }}
                              />
                          </div>
                      </main>
                      <AddPlanContainer
                        addPlanShow = {this.state.addPlanShow}
                        addPlanHideHandle = {this.addPlanHideHandle}
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
   const { planList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status } = state.planReducer;
   // console.log('planList',planList)
    return {
        planList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status
    };
}
const connectedPlan = connect(mapStateToProps)(Plan);
export { connectedPlan as Plan };
