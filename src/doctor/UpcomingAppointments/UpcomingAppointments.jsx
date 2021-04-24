import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import {AddUpcomingAppointmentsContainer} from './AddUpcomingAppointmentsContainer';
import {AddDigitalPrescription} from './AddDigitalPrescription';
import {ReferToDoctor} from './ReferToDoctor';
import { doctorActions, clinicActions, patientActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardComponent from '../../components/CardComponent/CardComponent';



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
        this.handleFileChange = this.handleFileChange.bind(this);
        

        this.addReferToDoctorShowHandle = this.addReferToDoctorShowHandle.bind(this);
        this.addReferToDoctorHideHandle = this.addReferToDoctorHideHandle.bind(this);
        this.handleSelectDoctor = this.handleSelectDoctor.bind(this);
        this.handleReferToDoctor = this.handleReferToDoctor.bind(this);
        

        this.completedApi = this.completedApi.bind(this);

        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addUpcomingAppointmentsShow: false,
            addDigitalPrescriptionShow: false,
            addReferToDoctorShow: false,
            startDate: new Date(), 
            endDate: new Date(),
            inputList: [{ medicine: "", days: "", whentotake: "" }],
            typing_area: '',
            appointment_id:  '',
            patient_id: '',
            doctor_id: JSON.parse(localStorage.user).doc_id,
            referData: '',
            referTOdoctor: ''

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
     addDigitalPrescriptionShowHandle(row) {
       this.setState({ addDigitalPrescriptionShow: true, patient_id: row.patient_id, appointment_id: row.appointment_id });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addDigitalPrescriptionHideHandle() {
       this.setState({ addDigitalPrescriptionShow: false, patient_id: '', appointment_id: ''  });
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
        this.state.inputList.filter((row) =>{
          if(row.days.label){
            row.days= row.days.value
          }
          if(row.whentotake.label){
            row.whentotake= row.whentotake.value
          }
        })

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

    handleFileChange(e) {
        const target = e.target.name;
        let file = e.target.files[0];
        let fileName = file.name;

            const formData = new FormData();
            formData.append('appointment_id', this.state.appointment_id)
            formData.append('patient_id', this.state.patient_id)
            formData.append('doctor_id', this.state.doctor_id)
            formData.append('details', "")
            formData.append('typing_area', "")
            formData.append('prescription', file);

            let url = '/admin/uploadprescription'
            const { dispatch } = this.props;
            dispatch(doctorActions.uploadPrescription(formData, url));

    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addReferToDoctorShowHandle(data) {
       this.setState({ addReferToDoctorShow: true, referData:  data });
       const { dispatch }   = this.props;
       dispatch(doctorActions.getfavorite());
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addReferToDoctorHideHandle() {
       this.setState({ addReferToDoctorShow: false, referData:  '' });
     }

     handleSelectDoctor(selectedOption, name){
        this.setState({[name]: selectedOption})
     }

     handleReferToDoctor(){
      let data = {
                      "referred_by": this.state.doctor_id,
                      "referred_to_id": this.state.referTOdoctor.doc_id,
                      "referred_to_name": this.state.referTOdoctor.name,
                      "patient_id": this.state.referData.patient_id
                  }
        // console.log(data)
        const { dispatch } = this.props;
        dispatch(doctorActions.referToDoctor(data));
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

    completedApi(appointment_id) {
        const { dispatch } = this.props;
        dispatch(doctorActions.completeAppointment(appointment_id));
        
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
                toast("Successfully")
                this.getUpcomingAppointmentsList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
        if(newProps.complete == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                dispatch(doctorActions.resetFirstState())
                toast("Complete Successfully")
                this.getUpcomingAppointmentsList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
        if(newProps.referStatus == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                dispatch(doctorActions.resetFirstState())
                toast("Referred  Successfully")
                this.addReferToDoctorHideHandle();
                this.getUpcomingAppointmentsList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
    }

    handleInputChange(name, date) {
        this.setState({
          [name] : date
        });
        if(name === 'endDate'){
          setTimeout(function() { 
            this.getUpcomingAppointmentsList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
          }.bind(this), 1000);
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
      console.log(this.state.endDate)
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
                          <h1 className="page-heading__title">Today's Appointments</h1>
                      </div>
                      
                      <div className="page-heading__btn-container">
                         <button className="page-heading__btn btn-sm" onClick={this.addUpcomingAppointmentsShowHandle}>Book New Appointment</button>
                      </div>
                      
                      <div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" className="btn btn-sm"><i className="fa fa-th" aria-hidden="true"></i></button>
                          <button type="button" className="btn btn-sm"><i className="fa fa-list" aria-hidden="true"></i></button>
                        </div>
                      </div>
                    </div>
   
                    <div className="page-filter">
                      <div className="page-filter__from-date">
                        <DatePicker
                          selected={startDate}
                          onChange={date => this.handleInputChange('startDate',date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                      <div className="page-filter__to-date">
                        <DatePicker
                          selected={endDate}
                          onChange={date => this.handleInputChange('endDate',date)}
                          selectsEnd
                          minDate={startDate}
                          startDate={startDate}
                          endDate={endDate}
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                      <div className="page-filter__searchbox">
                        <input type="text" placeholder="Search"/>
                      </div>
                      <div className="page-filter__others">
                        <div className="dropdown">
                          <button className="btn btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Status
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Booked</a>
                            <a className="dropdown-item" href="#">Cancelled</a>
                            <a className="dropdown-item" href="#">Completed</a>
                          </div>
                        </div>
                      </div>                    
                    </div>  
                    
                    <div className="row">
                      <div className="col-sm-6">
                        <CardComponent />
                      </div>
                      <div className="col-sm-6">
                        <CardComponent />
                      </div>
                      <div className="col-sm-6">
                        <CardComponent />
                      </div>
                      <div className="col-sm-6">
                        <CardComponent />
                      </div>                      
                    </div>                    
                    
                    <div className="page-heading">
                      <div className="page-heading__title-container">
                          <h1 className="page-heading__title">Patient Details</h1>
                      </div>
                      
                      <div className="page-heading__btn-container">
                        
                      </div>
                      
                      <div>
                      </div>
                    </div>
   
                    <div className="row">
                      <div className="col-md-12">
                        <div className="patient-details">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-body__profile-details-combo">                            
                              <div className="card-body__profile-details-combo__profile-section">
                                <div>
                                  <img className="profile-image" src="https://www.michiganlutheran.org/wp-content/uploads/2019/09/placeholder-profile-sq.jpg" />
                                </div>
                                <div>
                                  <button className="btn btn-sm" type="button">Refer To Doctor</button>
                                </div>
                              </div>
                              <div className="card-body__profile-details-combo__details-section">
                                <div>Name: Chetan Wagh</div>
                                <div>Age: 26</div>
                                <div>Health Problem: Thyroid</div>
                                <div>Appointment Date: 2021-04-13</div>
                                <div>Appointment Time: 11:30:00</div>
                                <div>Payment Mode: cash</div>
                                <div>Clinic Name: Agastya Clinic</div>
                              </div>
                            </div>
                            <div className="">
                              <div className="card-body__action-btn">
                                  <button className="btn btn-sm btn-block" type="button">Get Detail History</button>
                                  <button className="btn btn-sm btn-block" type="button">Upload Manual Prescription</button>
                                  <button className="btn btn-sm btn-block" type="button">Upload Digital Prescription</button>
                                  <button className="btn btn-sm btn-block" type="button">Mark As Complete</button>
                              </div>                          
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                      <div className="col-md-4">

                      </div>
                    </div>                    

                    <div className="row">
                      <div className="col-md-12">
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
                                    className : 'grid-header list-view-booking-status__container',
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
                                            <div className="list-view-action-btn__container">
                                                <i className="fa fa-times-circle" aria-hidden="true"></i>
                                            </div>
  
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
                   
                    <div className="page-heading">
                      <div className="page-heading__title-container">
                          <h1 className="page-heading__title">Upload Digital Prescription</h1>
                      </div>
                      
                      <div className="page-heading__btn-container">
                        
                      </div>
                      
                      <div>
                      
                      </div>
                    </div>                   
                   
                    <div className="row">
                      <div className="col-md-12">
                      
                        <div className="card">
                          <div className="card-body">
                          
                            <div className="row">
                              <div className="col-md-12">
                                <textarea name="description" className="form-control" placeholder="Please enter description" rows="5"></textarea>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-md-5">
                                <label for="AddMedicineName">Medicine Name</label>
                                <input type="text" placeholder="Enter Medicine Name" class="form-control" id="AddMedicineName"/>
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                  <label for="MedicineNumberOfDays">Select Days</label>
                                  <select className="form-control" id="MedicineNumberOfDays">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>10</option>
                                    <option>15</option>
                                    <option>20</option>
                                    <option>30</option>
                                  </select>
                                </div>                                
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                  <label for="MedicineIntake">Medicine Intake</label>
                                  <select className="form-control" id="MedicineIntake">
                                    <option>0-</option>
                                    <option>-0-</option>
                                    <option>--0</option>
                                    <option>00-</option>
                                    <option>-00</option>
                                    <option>0-0</option>
                                    <option>000</option>
                                  </select>
                                </div>                                 
                                
                              </div>                              
                              <div className="col-md-1">
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="text-center">
                                  <button className="btn btn-sm" type="button">Add</button>
                                </div>
                              </div>
                            </div>
                            <div className="card mt-3">
                            <div className="card-body">                            
                              <div className="row">
                                <div className="col-md-1">
                                  Sr. No
                                </div>                               
                                <div className="col-md-6">
                                  <div>Medicine</div>
                                </div>
                                <div className="col-md-2">
                                  Days
                                </div>
                                <div className="col-md-2">
                                  Medicine Taken
                                </div>
                                <div className="col-md-1">
                                  
                                </div>   
                              </div>
                              <div className="row">
                                <div className="col-md-1">
                                  1
                                </div>                               
                                <div className="col-md-6">
                                  <div>Allopurinol</div>
                                </div>
                                <div className="col-md-2">
                                  7
                                </div>
                                <div className="col-md-2">
                                  0-0
                                </div>
                                <div className="col-md-1">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </div>   
                              </div>
                              <div className="row">
                                <div className="col-md-1">
                                  2
                                </div>                               
                                <div className="col-md-6">
                                  <div>Alemtuzumab</div>
                                </div>
                                <div className="col-md-2">
                                  10
                                </div>
                                <div className="col-md-2">
                                  -0-
                                </div>
                                <div className="col-md-1">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </div>   
                              </div>
                              <div className="row">
                                <div className="col-md-1">
                                  3
                                </div>                               
                                <div className="col-md-6">
                                  <div>Alemtuzumab</div>
                                </div>
                                <div className="col-md-2">
                                  10
                                </div>
                                <div className="col-md-2">
                                  -0-
                                </div>
                                <div className="col-md-1">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </div>   
                              </div>
                                                                                    
                            </div>
                          </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="text-center">
                                  <button className="btn btn-sm btn-block" type="button">Submit</button>
                                </div>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                        
                        
                      </div>
                    </div>
                   
                  
                  </main>
                  
                    <AddUpcomingAppointmentsContainer
                      addUpcomingAppointmentsShow = {this.state.addUpcomingAppointmentsShow}
                      clinicList = {this.props.clinicList}
                      healthProblem = {this.props.healthProblem}
                      addUpcomingAppointmentsHideHandle = {this.addUpcomingAppointmentsHideHandle}
                      getUpcomingAppointmentsList = {this.getUpcomingAppointmentsList}
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
                      handleFileChange = {this.handleFileChange}
                    />

                    <ReferToDoctor
                      addReferToDoctorShow = {this.state.addReferToDoctorShow}
                      favoriteList = {this.props.favoriteList}
                      handleClose = {this.addReferToDoctorHideHandle}
                      handleSelectDoctor = {this.handleSelectDoctor}
                      handleReferToDoctor = {this.handleReferToDoctor}
                    />
                </div>
                <ToastContainer />
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
    const { doctorAppoinementList, favoriteList,pages,referStatus,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status, complete } = state.doctorReducer;
    const { clinicList } = state.clinicReducer;
    const { healthProblem } = state.patientReducer;
    return {
        doctorAppoinementList,
        favoriteList,
        isUserNotValid,
        loader,
        clinicList,
        healthProblem,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status,
        complete,
        referStatus
    };
}
const connectedUpcomingAppointments = connect(mapStateToProps)(UpcomingAppointments);
export { connectedUpcomingAppointments as UpcomingAppointments };