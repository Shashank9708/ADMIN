import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import { doctorActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'


class Referred extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        
        this.getAppointmentsList        = this.getAppointmentsList.bind(this);
        this.notificationSearch         = this.notificationSearch.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addAppointmentsShow: false
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
    getAppointmentsList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        // dispatch(doctorActions.getAppointmentList(page, pageSize, sorted, filtered));
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
                                <h1 className="page-heading__title">Referred</h1>
                            </div>
                          </div>
                          <div className="row">
                              <ReactTable
                                  noDataText="No found !!"
                                  data={this.props.appointmentList}
                                  filterable
                                  defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                  filtered={this.state.filtered}
                                  columns={[
                                      {
                                          Header: 'Referred By',
                                          accessor  : "name",
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header: 'Spec',
                                          accessor  : "doctorName",
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header      : "Referred To",
                                          accessor    : "health_problems",
                                          className   : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header: 'Spec',
                                          accessor  : "doctorName",
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header: 'Patient Name',
                                          accessor  : "doctorName",
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Referred Date",
                                          accessor  : "appointment_date",
                                          className : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Referred Time",
                                          accessor  : "appointment_time",
                                          className : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Referred Type",
                                          accessor  : "appointment_type",
                                          className : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Referred Status",
                                          accessor  : "status",
                                          className : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      }
                                      
                                  ]}
                                  defaultSorted={[
                                      {
                                          id: "id",
                                          desc: false
                                      }
                                  ]}
                                  defaultPageSize={10}
                                  minRows= {this.props.appointmentList}
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
                                      this.getAppointmentsList(state.page, state.pageSize, state.sorted, state.filtered);
                                  }}
                              />
                          </div>
                      </main>
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
   const { appointmentList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid } = state.doctorReducer;
   // console.log('appointmentList',appointmentList)
    return {
        appointmentList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages
    };
}
const connectedReferred = connect(mapStateToProps)(Referred);
export { connectedReferred as Referred };
