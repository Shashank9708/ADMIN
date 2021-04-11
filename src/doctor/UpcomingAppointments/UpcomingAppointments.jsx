import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import {AddUpcomingAppointmentsContainer} from './AddUpcomingAppointmentsContainer';
import {AddDigitalPrescription} from './AddDigitalPrescription';
import { doctorActions, clinicActions, patientActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class UpcomingAppointments extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        this.addUpcomingAppointmentsShowHandle = this.addUpcomingAppointmentsShowHandle.bind(this);
        this.addUpcomingAppointmentsHideHandle = this.addUpcomingAppointmentsHideHandle.bind(this);

        this.getUpcomingAppointmentsList        = this.getUpcomingAppointmentsList.bind(this);
        this.statusShowHandle = this.statusShowHandle.bind(this);
        this.notificationSearch         = this.notificationSearch.bind(this);
        this.handleInputChange         = this.handleInputChange.bind(this);
        this.cancelAll         = this.cancelAll.bind(this);

        this.addDigitalPrescriptionShowHandle = this.addDigitalPrescriptionShowHandle.bind(this);
        this.addDigitalPrescriptionHideHandle = this.addDigitalPrescriptionHideHandle.bind(this);
        this.handleSaveDigitalPrescription = this.handleSaveDigitalPrescription.bind(this);
        this.handleTextChangeDP = this.handleTextChangeDP.bind(this);
        this.handleInputChangeDP = this.handleInputChangeDP.bind(this);
        this.handleSelectChangeDP = this.handleSelectChangeDP.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);

        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addUpcomingAppointmentsShow: false,
            addDigitalPrescriptionShow: false,
            startDate: new Date(), 
            endDate: new Date(),
            inputList: [{ medicine: "", days: "", whentotake: "" }],
            typing_area: '',
            appointment_id:  '',
            patient_id: '',
            doctor_id: JSON.parse(localStorage.user).doc_id

        }
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addUpcomingAppointmentsShowHandle() {
       this.setState({ addUpcomingAppointmentsShow: true });
       const { dispatch }   = this.props;
       dispatch(clinicActions.getClinicList(this.state.doctor_id));
       dispatch(patientActions.getHealthProblem());
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addUpcomingAppointmentsHideHandle() {
       this.setState({ addUpcomingAppointmentsShow: false });
     }

     /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addDigitalPrescriptionShowHandle() {
       this.setState({ addDigitalPrescriptionShow: true });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addDigitalPrescriptionHideHandle() {
       this.setState({ addDigitalPrescriptionShow: false });
     }

    // handle input change
    handleInputChangeDP (e, index){
      const { name, value } = e.target;
      this.setState({[name]: value})
    };

    // handle input change
    handleTextChangeDP (e, index){
      const { name, value } = e.target;
      const { inputList } = this.state;
      const list = [...inputList];
      list[index][name] = value;
      this.setState({inputList: list})
    };

    // handle input change
    handleSelectChangeDP (selectedOption, name, index){
      const { inputList } = this.state;
      const list = [...inputList];
      list[index][name] = selectedOption;
      this.setState({inputList: list})
    };
   
    // handle click event of the Remove button
    handleRemoveClick (index){
      const { inputList } = this.state;
      inputList.splice(index, 1);
      this.setState(inputList);
    };
   
    // handle click event of the Add button
    handleAddClick () {
      const { inputList } = this.state;
      inputList.push({ medicine: "", days: "", whentotake: "" })
      this.setState({inputList: inputList});
    };


    handleSaveDigitalPrescription(){
        // if(this.state.inputList.length > 0){

          let url = '/doctor/uploadprescription'
          const formData = new FormData();
          formData.append('appointment_id', this.state.appointment_id)
          formData.append('patient_id', this.state.patient_id)
          formData.append('doctor_id', this.state.doctor_id)
          formData.append('details', JSON.stringify(this.state.inputList))
          formData.append('prescription', '');
          formData.append('typing_area', this.state.typing_area);
          
          const { dispatch } = this.props;
          dispatch(doctorActions.uploadPrescription(formData, url));
          
        // }
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
    getUpcomingAppointmentsList(page, pageSize, sorted, filtered){
        let data = {
                      state_date: this.state.startDate.toISOString().substr(0, 10),
                      end_date: this.state.endDate.toISOString().substr(0, 10)
                  }

        const { dispatch }   = this.props;
        dispatch(doctorActions.doctorAppointmentList(data));
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
    statusShowHandle(health_tip_id, status) {
        var json = {'health_tip_id':health_tip_id,'status':status}
        const { dispatch } = this.props;
        dispatch(healthTipsActions.statusChange(json));

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
                // dispatch(healthTipsActions.resetUpcomingAppointmentsState())

                this.getUpcomingAppointmentsList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
    }

    handleInputChange(name, date) {
        this.setState({
          [name] : date
        });
        if(name === 'endDate'){
          this.getUpcomingAppointmentsList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
        }
    }

    cancelAll(row){
      // console.log(row)
        let data = {appointment_ids: [row.appointment_id]}
        const { dispatch } = this.props;
        dispatch(doctorActions.cancleByDoctorAppointment(data));
      // }
        // this.hideAlert();
    }

    


    render() {
      const {startDate, endDate} = this.state
        // var fileSize = parseInt(configConstants.MAX_FILE_SIZE);
        return (
            <div className="page-container">
                <HeaderContainer />
                <div className="container-fluid">
                   <div className="row">
                      <div className="col-md-2.5">
                        <DoctorSideMenu/>
                      </div>
                      <div className="col-md-9">
                        <div className="main-content">
                          <div className="wrap-inner-content">
                            <div className="col-md-12">
                              <div className="inner-content">
                                      <div className="row page-header">
                                          <div className="col-md-6">
                                              <h1 className="page-title">Upcoming Appointments</h1>
                                          </div>
                                          <div className="col-md-6 text-right">
                                             <button className="blue btn text-btn" onClick={this.addUpcomingAppointmentsShowHandle}>Add New</button>
                                          </div>
                                      </div>
                                      <div className="table-wrap">
                                      <DatePicker
                                        selected={startDate}
                                        onChange={date => this.handleInputChange('startDate',date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="dd/MM/yyyy"
                                      />
                                      <DatePicker
                                        selected={endDate}
                                        onChange={date => this.handleInputChange('endDate',date)}
                                        selectsEnd
                                        minDate={startDate}
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="dd/MM/yyyy"
                                      />
                                      {/*<div className="table-search">
                                              <input
                                                  value={this.state.filterAll}
                                                  onChange={this.notificationSearch}
                                                  className="table-search-input"
                                                  placeholder="Search"
                                              />

                                      </div>*/}
                                      {/*
                                                  Header: 'Image',
                                                  accessor  : "image",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  Cell: row =>
                                                    <div><img src={'data:image/png;base64,'+row.value} width="50px" height="50px"/></div>
                                                    
                                              */}
                                      <ReactTable
                                          noDataText="No found !!"
                                          data={this.props.doctorAppoinementList}
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
                                                  Header: 'Health Problem',
                                                  accessor  : "health_problem_title",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Appointment Date',
                                                  accessor  : "appointment_date",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Appointment Time',
                                                  accessor  : "appointment_time",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Payment Mode',
                                                  accessor  : "appointment_type",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Clinic Name',
                                                  accessor  : "clinic_name",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                              },
                                              {
                                                  Header: 'Status',
                                                  accessor  : "status",
                                                  className : 'grid-header',
                                                  filterable  : false,
                                                  filterMethod: (filter, row) => {
                                                      return row[filter.id].includes(filter.value);
                                                  }
                                                },
                                                {
                                                    Header: 'Actions',
                                                    accessor  : "appointment_id",
                                                    filterable  : false,
                                                    
                                                    className : 'grid-header',
                                                    Cell: row => 
                                                          <DropdownButton id={"dropdown-"+row.value} title="Action" menuAlign="right">
                                                              <Dropdown.Item onClick={() => this.cancelAll(row.original)}>Cancel</Dropdown.Item>
                                                              <Dropdown.Item onClick={() => this.addDigitalPrescriptionShowHandle()}>Digital Prescription</Dropdown.Item>
                                                              <Dropdown.Item >Manual Prescription</Dropdown.Item>
                                                              <Dropdown.Item >Refer to Doctor</Dropdown.Item>
                                                              <Dropdown.Item >Complete Appointment</Dropdown.Item>
                                                          </DropdownButton>
                                                }
                                              
                                          ]}
                                          defaultSorted={[
                                              {
                                                  id: "appointment_id",
                                                  desc: false
                                              }
                                          ]}
                                          defaultPageSize={10}
                                          minRows= {this.props.doctorAppoinementList}
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
                                              this.getUpcomingAppointmentsList(state.page, state.pageSize, state.sorted, state.filtered);
                                          }}
                                      />
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <AddUpcomingAppointmentsContainer
                        addUpcomingAppointmentsShow = {this.state.addUpcomingAppointmentsShow}
                        clinicList = {this.props.clinicList}
                        healthProblem = {this.props.healthProblem}
                        addUpcomingAppointmentsHideHandle = {this.addUpcomingAppointmentsHideHandle}
                      />

                      <AddDigitalPrescription
                        addDigitalPrescriptionShow = {this.state.addDigitalPrescriptionShow}
                        handleClose = {this.addDigitalPrescriptionHideHandle}
                        handleSaveDigitalPrescription = {this.handleSaveDigitalPrescription}
                        inputList = {this.state.inputList}
                        handleTextChange = {this.handleTextChangeDP}
                        handleInputChange = {this.handleInputChangeDP}
                        handleSelectChange = {this.handleSelectChangeDP}
                        handleRemoveClick = {this.handleRemoveClick}
                        handleAddClick = {this.handleAddClick}
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
    const { doctorAppoinementList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status } = state.doctorReducer;
    const { clinicList } = state.clinicReducer;
    const { healthProblem } = state.patientReducer;
    return {
        doctorAppoinementList,
        isUserNotValid,
        loader,
        clinicList,
        healthProblem,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status
    };
}
const connectedUpcomingAppointments = connect(mapStateToProps)(UpcomingAppointments);
export { connectedUpcomingAppointments as UpcomingAppointments };