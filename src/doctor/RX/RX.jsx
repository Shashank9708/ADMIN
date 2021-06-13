import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import {AddRXContainer} from './AddRXContainer';
import { rxActions, headerActions, doctorActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'


class RX extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        this.addRXShowHandle = this.addRXShowHandle.bind(this);
        this.addRXHideHandle = this.addRXHideHandle.bind(this);

        this.editSpecializationShowHandle         = this.editSpecializationShowHandle.bind(this);
        this.removeSpecializationShowHandle         = this.removeSpecializationShowHandle.bind(this);

        this.getRXList        = this.getRXList.bind(this);
        this.statusShowHandle = this.statusShowHandle.bind(this);
        this.notificationSearch         = this.notificationSearch.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addRXShow: false,
            payload: '',
            flag: false,
            index: ''
        }
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addRXShowHandle() {
            const { dispatch }   = this.props;
       dispatch(doctorActions.getAllMedicine());
       this.setState({ addRXShow: true });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addRXHideHandle() {

       this.setState({ addRXShow: false, payload: '', flag: false, index: '' });
     }

     /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     editSpecializationShowHandle(data, index) {
       this.setState({ addRXShow: true, payload: data, flag:true, index: index });
     }

     /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     removeSpecializationShowHandle(data, index) {
        let arg = []
        if(this.props.rxList.length > 0){
          arg = this.props.rxList[0].medsdata
        }
        arg.splice(index, 1)
        let medsdata = { medsdata: arg }
        const { dispatch } = this.props;
        dispatch(rxActions.saveRX(medsdata, this.props.rxList));
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
    getRXList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(rxActions.getRXList());
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    statusShowHandle(healthtips_category_id, status) {
        var json = {'healthtips_category_id':healthtips_category_id,'status':status}
        const { dispatch } = this.props;
        dispatch(rxActions.statusChange(json));

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
                dispatch(rxActions.resetRXState())

                this.getRXList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
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
                      <DoctorSideMenu/>
                      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                          <div className="page-heading">
                            <div className="page-heading__title-container">
                                <h1 className="page-heading__title">RX</h1>
                            </div>
                            <div className="page-heading__btn-container">
                              <button className="page-heading__btn btn-sm" onClick={this.addRXShowHandle}>Add New</button>
                            </div>
                          </div>
                          <div className="row">
                              <ReactTable
                                  noDataText="No found !!"
                                  data={this.props.rxList.length > 0 ? this.props.rxList[0].medsdata : []}
                                  filterable
                                  defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                  filtered={this.state.filtered}
                                  columns={[
                                      {
                                          Header: 'Name',
                                          accessor  : "name",
                                          className : 'grid-header',
                                          filterable  : false,
                                          Cell: row =>
                                            <span>{row.value ? row.value.value ? row.value.value : row.value : row.value}</span>
                                      },
                                      {
                                          Header      : "Brand",
                                          accessor    : "brand",
                                          className   : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Dosage",
                                          accessor  : "dosage",
                                          className : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Dosage Form",
                                          accessor  : "dosage_from",
                                          className : "grid-header",
                                          filterable  : false,
                                          Cell: row =>
                                            <span>{row.value ? row.value.value ? row.value.value : row.value : row.value}</span>
                                      },
                                      {
                                          Header    : "Instructions",
                                          accessor  : "instructions",
                                          className : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header: 'Actions',
                                          accessor  : "healthtips_category_id",
                                          filterable  : false,
                                          
                                          className : 'grid-header',
                                          Cell: row => 
                                                <div className="">
                                                  <button type="button" className="btn-sm dropdown-toggle" data-toggle="dropdown" id={"dropdown-"+row.value}>
                                                    <span className="caret"></span>
                                                    <span>Action</span>
                                                  </button>
                                                  <ul className="dropdown-menu" role="menu">
                                                    <li><a href="#" onClick={() => this.removeSpecializationShowHandle(row.original, index)}>Remove</a></li>
                                                  </ul>
                                                </div>
                                      }
                                      
                                  ]}
                                  defaultSorted={[
                                      {
                                          id: "healthtips_category_id",
                                          desc: false
                                      }
                                  ]}
                                  defaultPageSize={10}
                                  minRows= {this.props.rxList}
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
                                      this.getRXList(state.page, state.pageSize, state.sorted, state.filtered);
                                  }}
                              />
                          </div>
                      </main>
                      <AddRXContainer
                        addRXShow = {this.state.addRXShow}
                        addRXHideHandle = {this.addRXHideHandle}
                        payload = {this.state.payload}
                        medicineList = {this.props.medicineList}
                        flag = {this.state.flag}
                        index = {this.state.index}
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
   const { rxList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status } = state.rxReducer;
   // console.log('rxList',rxList)
    const { medicineList} = state.doctorReducer;

    return {
        rxList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        medicineList,
        errorMsg,
        pages,
        status
    };
}
const connectedRX = connect(mapStateToProps)(RX);
export { connectedRX as RX };
