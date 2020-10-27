import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import {AddNotificationContainer} from './AddNotificationContainer';
import { notificationActions, headerActions, commonActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from "react-table";
// import "react-table/react-table.css";


class SendNotification extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.addNotificationShowHandle = this.addNotificationShowHandle.bind(this);
        this.addNotificationHideHandle = this.addNotificationHideHandle.bind(this);
        this.storeAndSaveNotification = this.storeAndSaveNotification.bind(this);

        this.getNotificationList        = this.getNotificationList.bind(this);
        this.notificationSearch         = this.notificationSearch.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addNotificationShow: false
        }
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addNotificationShowHandle() {
       this.setState({ addNotificationShow: true });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addNotificationHideHandle() {
       this.setState({ addNotificationShow: false });
     }

     /**
      * @DateOfCreation        26 July 2018
      * @ShortDescription      This function is responsible to refresh list
      * @return                refresh
      */
     storeAndSaveNotification() {
         this.getVehicleList(0, 10, this.state.sorted, this.state.filtered);
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to refresh list
     * @return                refresh
     */
    importOnSave() {
        this.getStaffAllocationList(0, 10, this.state.sorted, this.state.filtered);
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
    getNotificationList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(notificationActions.getNotificationList(page, pageSize, sorted, filtered));
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
        var fileSize = parseInt(configConstants.MAX_FILE_SIZE);
        return (
            <div className="page-container">
            <SideMenu/>
            <HeaderContainer />
                <AddNotificationContainer
                  addNotificationShow = {this.state.addNotificationShow}
                  addNotificationHideHandle = {this.addNotificationHideHandle}
                />
                <div className="main-content">
                    <div className="wrap-inner-content">
                        <div className="col-md-12">
                          <div className="inner-content">
                                <div className="row page-header">
                                    <div className="col-md-6">
                                        <h1 className="page-title">Notifications</h1>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <button className="blue btn text-btn" onClick={this.addNotificationShowHandle}>Add New</button>
                                    </div>
                                </div>
                                <div className="table-wrap">
                                  <div className="table-search">
                                          <input
                                              value={this.state.filterAll}
                                              onChange={this.notificationSearch}
                                              className="table-search-input"
                                              placeholder="Search"
                                          />
                                  </div>
                                  <ReactTable
                                      noDataText="No found !!"
                                      data={this.props.notificationList}
                                      filterable
                                      defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                      filtered={this.state.filtered}
                                      columns={[
                                          {
                                              Header      : "Notification ID",
                                              accessor    : "admin_notification_id",
                                              className   : "grid-header",
                                              filterable  : false,
                                              filterMethod: (filter, row) => {
                                                  return row[filter.id].includes(filter.value);
                                              }
                                          },
                                          {
                                              Header    : "Title",
                                              accessor  : "title",
                                              className : "grid-header",
                                              filterable  : false,
                                              filterMethod: (filter, row) => {
                                                  return row[filter.id].includes(filter.value);
                                              }
                                          },
                                          {
                                              Header    : "Description",
                                              accessor  : "description",
                                              className : "grid-header",
                                              filterable  : false,
                                              filterMethod: (filter, row) => {
                                                  return row[filter.id].includes(filter.value);
                                              }
                                          },
                                          {
                                              Header    : "User Type",
                                              accessor  : "sent_user_type",
                                              className : "grid-header",
                                              filterable  : false,
                                              filterMethod: (filter, row) => {
                                                  return row[filter.id].includes(filter.value);
                                              }
                                          },
                                          {
                                              Header    : "Date Created",
                                              accessor  : "created_at",
                                              className : "grid-header",
                                              filterable  : false,
                                              filterMethod: (filter, row) => {
                                                  return row[filter.id].includes(filter.value);
                                              }
                                          }
                                      ]}
                                      defaultSorted={[
                                          {
                                              id: "admin_notification_id",
                                              desc: false
                                          }
                                      ]}
                                      defaultPageSize={10}
                                      minRows= {this.props.notificationList}
                                      className="table table-bordered responsive"
                                      loading={this.state.loading}
                                      filterable
                                      Sorted
                                      pages={this.props.pages}
                                      showPagination={true}
                                      showPaginationTop={true}
                                      showPaginationBottom={false}
                                      pageSizeOptions={[10, 20, 50]}
                                      manual // For server side pagination
                                      onFetchData={(state, instance) => {
                                          this.getNotificationList(state.page, state.pageSize, state.sorted, state.filtered);
                                      }}
                                  />
                              </div>
                          </div>
                        </div>
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
   const { notificationList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid } = state.notificationReducer;

    return {
        notificationList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages
    };
}
const connectedSendNotification = connect(mapStateToProps)(SendNotification);
export { connectedSendNotification as SendNotification };
