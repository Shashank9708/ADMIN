import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import { tripActions, headerActions, commonActions } from '../../_actions';
import { utilityHelper } from '../../_helpers';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table';
// import 'react-table/react-table.css';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import { ViewMap } from './ViewMap';

class Activity extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);

        this.handleSelectChange = this.handleSelectChange.bind(this);
        
        this.getTripsList = this.getTripsList.bind(this);
        this.tripSearch  = this.tripSearch.bind(this);
        this.state        = this.initialState;
        this.showmapHandle = this.showmapHandle.bind(this);
        this.hidemapHandle = this.hidemapHandle.bind(this);
    }

    get initialState() {
        return {
            vehicle_id : '',
            loading : false,
            pages  : 0,
            importShow: false,
            filtered: [],
            dataTrip: [],
            filterAll: '',
            displayView: false 
        }
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    importShowHandle() {
        this.setState({ importShow: true });
    }
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
    importHideHandle() {
        this.setState({ importShow: false });
    } 
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to refresh list
     * @return                refresh
     */
    importOnSave() {
        this.getTripsList(0, 10, this.state.sorted, this.state.filtered);
    }
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to exportCSV.
     * @return                Nothing
     */ 
    exportCSV() {
        const { dispatch } = this.props;
        dispatch(commonActions.export_studentAllocation());
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
    * @DateOfCreation        11 June 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(selectedOption, name) {
        this.setState({
              [name] : selectedOption.value,
        });
        let vehicle_id = selectedOption.value;
        this.getTripsList(0, 10, this.state.sorted, this.state.filtered, vehicle_id);
    }

    /**
    * @DateOfCreation        26 July 2018
    * @ShortDescription      This function is responsible to get the list of studentAllocation from API
    * @return                Nothing
    */
    getTripsList(page, pageSize, sorted, filtered, vehicle_id){
        const { dispatch }   = this.props;
        dispatch(tripActions.getTripsList(page, pageSize, sorted, filtered, vehicle_id));
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle load filtered studentAllocation list
     * @return                Nothing
    */
    tripSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
    }

     /**
     * @DateOfCreation        04 March 2019
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    showmapHandle(data) {
      
        const { dispatch }   = this.props;
        dispatch(tripActions.polyline(data._id))

        this.setState({ displayView: true, "dataTrip": data });
        
    }

    /**
     * @DateOfCreation        04 March 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
    hidemapHandle() {

        this.setState({ displayView: false });
    }

    createDate(date) {
      if(date == null){
        return '';
      }else{
        return  new Date(date).toLocaleString();  
      }      
    }
    getAddress(lat,long){
      //console.log(lat,long)
      var data = utilityHelper.getAddress(lat,long);
    }
    render() {
        var fileSize = parseInt(configConstants.MAX_FILE_SIZE);
        return (
            <div className="page-container">
            <SideMenu/>
            <HeaderContainer />
            <ViewMap
                onClose = { this.hidemapHandle }
                displayView = {this.state.displayView}
                dataTrip = {this.state.dataTrip}
                polyline = {this.props.polyline}
            />
              <div className="main-content">
                    <div className="wrap-inner-content">
                        <div className="col-md-12">
                            <div className="inner-content">
                                <div className="row page-header">
                                    <div className="col-md-3">
                                        <h1 className="page-title">Activity</h1>
                                        </div>
                                    
                                  
                                </div>
                                <div className="table-wrap">
                                  
                                  <ReactTable
                                      noDataText="No found !!"
                                      data={this.props.tripList}
                                      filterable
                                      defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                      filtered={this.state.filtered}
                                      columns={[
                                          {
                                              Header: 'User Name',
                                              accessor  : "user",
                                              filterable  : false,
                                              headerClassName: 'grid-header-action',
                                              className :"",
                                              Cell: row =>{
                                                return (
                                                 <div style={{'whiteSpace': 'normal'}}>
                                                     {row.original.user.name}
                                                </div>)
                                              }
                                          },
                                          {
                                              Header: 'Problem List',
                                              accessor  : "problemList",
                                              filterable  : false,
                                              headerClassName: 'grid-header-action',
                                              className :"",
                                              Cell: row =>{
                                                return (
                                                 <div style={{'whiteSpace': 'normal'}}>
                                                     {row.original.problemList.locksmith == 0 ? '': ' Locksmith' }
                                            
                                                     {row.original.problemList.battery == 0 ? '': ' Battery'}
                                                  
                                                     {row.original.problemList.mechanical == 0 ? '': ' Mechanical'}
                                               
                                                     {row.original.problemList.oil == 0 ? '': ' Oil'}
                                                    
                                                     {row.original.problemList.tyre == 0 ? '': ' Tyre'}
                                                    
                                                     {row.original.problemList.gas == 0 ? '': ' Gas'}
                                                </div>)
                                              }
                                          },
                                          {
                                              Header: 'Location',
                                              accessor  : "locationName",
                                              filterable  : false,
                                              headerClassName: 'grid-header-action',
                                              className :"",
                                              Cell: row =>{
                                                return (
                                                 <div style={{'whiteSpace': 'normal'}}>
                                                     {row.original.locationName}
                                                </div>)
                                              }
                                          },
                                          {
                                              Header: 'Driver Name',
                                              accessor  : "driver",
                                              filterable  : false,
                                              headerClassName: 'grid-header-action',
                                              className :"",
                                              Cell: row =>{
                                                return (
                                                 <div style={{'whiteSpace': 'normal'}}>
                                                     { row.original.driver == undefined ?
                                                      '' :
                                                      row.original.driver.name
                                                     }
                                                </div>)
                                              }
                                          },
                                          {
                                              Header    : 'Status',
                                              accessor  : 'status',
                                              className : 'grid-header',
                                              filterable  : false,
                                              filterMethod: (filter, row) => {
                                                  return row[filter.id].includes(filter.value);
                                              }
                                          },
                                          {
                                              Header: 'Start Time',
                                              accessor  : "created_date",
                                              filterable  : false,
                                              headerClassName: 'grid-header-action',
                                              className :"",
                                              Cell: row =>{
                                                return (
                                                 <div style={{'whiteSpace': 'normal'}}>
                                                     {this.createDate(row.value)}
                                                </div>)
                                              }
                                          },
                                          {
                                              Header: 'End Time',
                                              accessor  : "completed_date",
                                              filterable  : false,
                                              headerClassName: 'grid-header-action',
                                              className :"",
                                              Cell: row =>{
                                                return (
                                                 <div style={{'whiteSpace': 'normal'}}> 
                                                     {this.createDate(row.value)}
                                                </div>)
                                              }
                                          },
                                          {
                                              Header: 'End by',
                                              accessor  : "tripEndBy",
                                              filterable  : false,
                                              headerClassName: 'grid-header-action',
                                              className :"",
                                              Cell: row =>{
                                                return (
                                                 <div style={{'whiteSpace': 'normal'}}> 
                                                     {row.original.tripEndBy}
                                                </div>)
                                              }
                                          }

                                      ]}
                                      defaultPageSize={10}
                                      minRows= {this.props.tripList}
                                      className="table table-bordered responsive"
                                      loading={this.state.loading}
                                      filterable
                                      Sorted
                                      showPagination={true}
                                      showPaginationTop={true}
                                      showPaginationBottom={false}
                                      pageSizeOptions={[10, 20, 50]}
                                      automatic // For server side pagination
                                      onFetchData={(state, instance) => {
                                          this.getTripsList(state.page, state.pageSize, state.sorted, state.filtered, null);
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
 * @ShortDescription      connect state to props on reducer and get state for studentAllocation list
 * @return                studentAllocation list and loader
 */

function mapStateToProps(state) {   
   const { tripList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid,polyline } = state.tripReducer;
  
    return {
        tripList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,        
        errorMsg,
        pages,
        polyline
    };    
}
const connectedActivity = connect(mapStateToProps)(Activity);
export { connectedActivity as Activity }; 