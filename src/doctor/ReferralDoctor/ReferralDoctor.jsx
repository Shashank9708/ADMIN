import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import { doctorActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import UserProfileComponent from "../../components/UserProfileComponent/UserProfileComponent";


class ReferralDoctor extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        
        this.getReferralList        = this.getReferralList.bind(this);
        this.SearchFilterFunction         = this.SearchFilterFunction.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addAppointmentsShow: false,
            text: '',
            doctorReferral: [],
            filterList: [],
            getCat: false
        }
    }

    SearchFilterFunction(event){
      let searchInput = event.target.value;

      let { filterList } = this.state;
      let filteredData = filterList.filter(value => {
      return (
          value.referred_doc_name.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.en_spec.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.patient_name.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.health_problem_title.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.status.toLowerCase().includes(searchInput.toLowerCase())
          // value.status
          //   .toString()
          //   .toLowerCase()
          //   .includes(searchInput.toLowerCase())
        );
      });

      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        doctorReferral: filteredData,
        text: searchInput,
      });
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
    getReferralList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(doctorActions.getDoctorReferrals(page, pageSize, sorted, filtered));
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      // console.log(nextProps.categroyList.data) 
      if (nextProps.doctorReferral !== prevState.doctorReferral && !prevState.getCat) {
        if(nextProps.doctorReferral.length > 0){
          return ({ 
            doctorReferral: nextProps.doctorReferral,
            filterList: nextProps.doctorReferral,
            getCat: true
          })
        } 
      }
      return null
    }

    render() {
        // var fileSize = parseInt(configConstants.MAX_FILE_SIZE);
        return (
            <React.Fragment>
                <HeaderContainer />
                <div className="container-fluid">
                    <div className="row">
                        <DoctorSideMenu/>
                      
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                            <div className="page-heading">
                              <div className="page-heading__title-container">
                                  <h1 className="page-heading__title">Referral Patients</h1>
                              </div>
                              <div className="page-heading__searchbox">
                                    <input type="text" placeholder="Search" onChange={this.SearchFilterFunction}/>
                              </div>                              
                            </div>                            
                            
                            <div className="row">
                              <ReactTable
                                  noDataText="No found !!"
                                  data={this.state.doctorReferral}
                                  filterable
                                  defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                  filtered={this.state.filtered}
                                  columns={[
                                      {
                                          Header: 'Refer By Doctor',
                                          accessor  : "referred_doc_name",
                                          className : 'grid-header',
                                          filterable  : false,
                                          Cell: row => 
                                            <div className="">
                                                <UserProfileComponent 
                                                  name = {row.original.referred_doc_name}
                                                  display_pic = {row.original.refer_display_pic}
                                                  contact_no = {row.original.refer_contact_no}
                                                />
                                            </div>
                                      },
                                      {
                                          Header: 'Spec',
                                          accessor  : "en_spec",
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header: 'Patient Name',
                                          accessor  : "patient_name",
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Health Problem",
                                          accessor  : "health_problem_title",
                                          className : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Status",
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
                                  minRows= {this.state.doctorReferral}
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
                                      this.getReferralList(state.page, state.pageSize, state.sorted, state.filtered);
                                  }}
                              />
                            </div>
                        </main>
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
   const { doctorReferral,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid } = state.doctorReducer;
   // console.log('doctorReferral',doctorReferral)
    return {
        doctorReferral,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages
    };
}
const connectedReferralDoctor = connect(mapStateToProps)(ReferralDoctor);
export { connectedReferralDoctor as ReferralDoctor };
