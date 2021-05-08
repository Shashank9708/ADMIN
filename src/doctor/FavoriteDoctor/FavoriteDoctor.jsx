import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import {AddFavoriteDoctorContainer} from './AddFavoriteDoctorContainer';
import { doctorActions, specializationActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserProfileComponent from "../../components/UserProfileComponent/UserProfileComponent";


class FavoriteDoctor extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        this.addFavoriteDoctorShowHandle = this.addFavoriteDoctorShowHandle.bind(this);
        this.addFavoriteDoctorHideHandle = this.addFavoriteDoctorHideHandle.bind(this);

        this.getFavoriteDoctorList        = this.getFavoriteDoctorList.bind(this);
        this.notificationSearch         = this.notificationSearch.bind(this);
        this.deleteFavoriteDoctor         = this.deleteFavoriteDoctor.bind(this);
        this.getDoctor         = this.getDoctor.bind(this);
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
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addFavoriteDoctorShowHandle() {
       this.setState({ addFavoriteDoctorShow: true });
       const { dispatch }   = this.props;
       dispatch(specializationActions.getSpecializationList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered));
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addFavoriteDoctorHideHandle() {
       this.setState({ addFavoriteDoctorShow: false });
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
    getFavoriteDoctorList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(doctorActions.getfavorite());
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
    deleteFavoriteDoctor(health_tip_id) {
        var json = {'health_tip_id':health_tip_id}
        const { dispatch } = this.props;
        dispatch(healthTipsActions.deleteHealthTip(json));

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
                dispatch(doctorActions.resetFirstState())

                this.getFavoriteDoctorList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
        if(newProps.closeForm == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                dispatch(doctorActions.resetFirstState())

                this.getFavoriteDoctorList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
    }

    getDoctor(value){
      let user_id = JSON.parse(localStorage.user).user_id
      let url = `/doctor/getdoctorsbyspecialization/${user_id}?specialization=${value}`
      const { dispatch } = this.props;
      dispatch(doctorActions.getDoctorsBySpecializationD(url));
    }
    removeFavorite(row){
        const { dispatch } = this.props;
        dispatch(doctorActions.removefavorite(row.favorite_id));
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
                              <h1 className="page-heading__title">Colleagues</h1>
                          </div>
                          
                          <div className="page-heading__btn-container">
                            <div className="page-heading__searchbox">
                                <input type="text" placeholder="Search"/>
                            </div>   
                          </div>
                          
                          <div className="page-heading__btn-container">
                            <button className="page-heading__btn btn-sm" onClick={this.addFavoriteDoctorShowHandle}>Add New</button>
                          </div>
                        </div>                        
                        
                        
                            <div className="row">
                                <ReactTable
                                  noDataText="No found !!"
                                  data={this.props.favoriteList}
                                  filterable
                                  defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                  filtered={this.state.filtered}
                                  columns={[
                                      
                                      
                                    {
                                          Header: 'Doctor Name',
                                          accessor  : "name",
                                          filterable  : false,
                                          className : 'grid-header',
                                          Cell: row => 
                                            <div className="">
                                                <UserProfileComponent 
                                                  name = {row.original.name}
                                                  display_pic = {row.original.display_pic}
                                                  contact_no = {row.original.contact_no}
                                                />
                                            </div>
                                        },
                                      
                                      
                                    //   {
                                    //       Header: 'Doctor Name',
                                    //       accessor  : "name",
                                    //       className : 'grid-header',
                                    //       filterable  : false,
                                    //       filterMethod: (filter, row) => {
                                    //           return row[filter.id].includes(filter.value);
                                    //       }
                                    //   },
                                      {
                                          Header: 'Specialization',
                                          accessor  : "en_spec",
                                          className : 'grid-header',
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      
                                      {
                                          Header: 'City',
                                          accessor  : "city_id",
                                          filterable  : false,
                                          className : 'grid-header',
                                          Cell: row => 
                                            <div className="">
                                                Indore
                                            </div>
                                        },
                                        {
                                          Header: 'No Of Referral',
                                          accessor  : "city_id",
                                          filterable  : false,
                                          className : 'grid-header',
                                          Cell: row => 
                                            <div className="no-of-referral">
                                                12
                                            </div>
                                        },                                                                            
                                      
                                      
                                      {
                                          Header: 'Actions',
                                          accessor  : "favorite_id",
                                          filterable  : false,
                                          className : 'grid-header',
                                          Cell: row => 
                                            <div className="action-column-container">
                                                <i class="fa fa-trash" aria-hidden="true"></i> <i class="fa fa-share-alt" aria-hidden="true"></i>
                                            
                                              {/* <button type="button" className="btn-sm dropdown-toggle" data-toggle="dropdown" id={"dropdown-"+row.value}>
                                                <span className="caret"></span>
                                                <span>Action</span>
                                              </button>
                                              <ul className="dropdown-menu" role="menu">
                                                <li><a href="#" onClick={() => this.removeFavorite(row.original)}>Remove</a></li>
                                                    <Dropdown.Divider />
                                                <li><a href="#">Cancel</a></li>
                                              </ul> */}
                                            </div>
                                          
                                                // <DropdownButton id={"dropdown-"+row.value} title="Action" menuAlign="right">
                                                //     <Dropdown.Item onClick={() => this.removeFavorite(row.original)}>Remove</Dropdown.Item>
                                                // </DropdownButton>
                                          
                                                // <span><i id={"dropdown-"+row.value} class="fa fa-times-circle" aria-hidden="true" onClick={() => this.removeFavorite(row.original)}></i></span>
                                                
                                      }
                                      
                                  ]}
                                  defaultSorted={[
                                      {
                                          id: "favorite_id",
                                          desc: false
                                      }
                                  ]}
                                  defaultPageSize={10}
                                  minRows= {this.props.favoriteList}
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
                                      this.getFavoriteDoctorList(state.page, state.pageSize, state.sorted, state.filtered);
                                  }}
                                />
                            </div>
                        </main>
                      <AddFavoriteDoctorContainer
                        addFavoriteDoctorShow = {this.state.addFavoriteDoctorShow}
                        getDoctor={this.getDoctor}
                        categoryList = {this.props.categoryList}
                        doctorList = {this.props.doctorList}
                        addFavoriteDoctorHideHandle = {this.addFavoriteDoctorHideHandle}
                      />
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
   const { favoriteList,doctorList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status, closeForm } = state.doctorReducer;
   const { categoryList  } = state.notificationReducer;
    return {
        favoriteList,
        doctorList,
        isUserNotValid,
        loader,
        categoryList,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status,
        closeForm
    };
}
const connectedFavoriteDoctor = connect(mapStateToProps)(FavoriteDoctor);
export { connectedFavoriteDoctor as FavoriteDoctor };
