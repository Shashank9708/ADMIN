import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import { EditView } from './EditView';
import { Status } from './Status';
import { Clinic } from './Clinic';
import { Appointment } from './Appointment';
import { ImportContainer } from '../Import/ImportContainer';
import { userActions, headerActions, commonActions, clinicActions, doctorActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import Countdown from 'react-countdown-now';
import {DropdownButton, Dropdown} from 'react-bootstrap'



class Doctor extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);

        this.importShowHandle = this.importShowHandle.bind(this);
        this.importHideHandle = this.importHideHandle.bind(this);
        this.importOnSave     = this.importOnSave.bind(this);
        this.exportCSV        = this.exportCSV.bind(this);

        this.getDoctorList    = this.getDoctorList.bind(this);
        this.userSearch       = this.userSearch.bind(this);
        this.state            = this.initialState;

        this.statusShowHandle = this.statusShowHandle.bind(this);
        this.statusHideHandle = this.statusHideHandle.bind(this);
        this.statusCheck      = this.statusCheck.bind(this);

        this.editShowHandle   = this.editShowHandle.bind(this);
        this.editHideHandle   = this.editHideHandle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.editSave = this.editSave.bind(this);

        this.clinicShowHandle = this.clinicShowHandle.bind(this);
        this.clinicHideHandle = this.clinicHideHandle.bind(this);
        this.reNewPackage = this.reNewPackage.bind(this);
        this.reNewSave = this.reNewSave.bind(this);

    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            importShow: false,
            statusShow: false,
            editShow: false,
            clinicShow: false,
            AppointmentShow: false,
            filtered: [],
            filterAll: '',
            payload: {
              data:{
                doc_id: '',
                status: ''
              }
            },
            edit: {
              editdata:{
                user_id: '',
                first_name: '',
                last_name: '',
                email: '',
                mobile: '',
                password:'',
                vehicle_registration1: '',
                vehicle_mac1: '',
                vehicle_model1: '',
                vehicle_registration2: '',
                vehicle_mac2: '',
                vehicle_model2: '',
                vehicle_registration3: '',
                vehicle_mac3: '',
                vehicle_model3: '',
                vehicle_registration4: '',
                vehicle_mac4: '',
                vehicle_model4: ''
              }
            },
            displayView: '',
            renew: {
              renewdata: {
                user_id: '',
                package_type: '',
                status: 'active'
              }
            },
            clinics: [],
            appointments: [],
            doc_id: ''
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
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    statusShowHandle(id, name) {
        this.setState({ statusShow: true });
        const { data }  = this.state.payload;
        this.setState({
            payload : {
                data : {
                    ...data,
                    doc_id: id,
                    status: name
                }
            }
        }, function(){
          
        });
    }
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
    statusHideHandle() {
        this.setState({ statusShow: false });
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    clinicShowHandle(id, package_type) {
        this.setState({ clinicShow: true });
        const { renewdata }  = this.state.renew;
        this.setState({
            renew : {
                renewdata : {
                    ...renewdata,
                    user_id: id,
                    package_type: package_type
                }
            }
        });
    }

    /**
     * @DateOfCreation        01 August 2018
     * @ShortDescription      This function is responsible to sending mail.
     * @return                Void
     */
    reNewPackage(event) {
        const { renewdata }  = this.state.renew;
        this.setState({
            renew : {
                renewdata : {
                    ...renewdata,
                    package_type: event.target.value
                  }
            }
        });
        
    }
    reNewSave(){
        const { renewdata }  = this.state.renew;
        var json = {'user_id':renewdata.user_id,'status':'active','package_type':renewdata.package_type}
        const { dispatch } = this.props;
        dispatch(commonActions.renewPackage(json));
    }
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    editShowHandle(json, view) {
      
        this.setState({ editShow: true, displayView: view });
        const { editdata }  = this.state.edit;
        this.setState({
            edit : {
                editdata : {
                    user_id: json.id,
                    first_name: json.first_name,
                    last_name: json.last_name,
                    email: json.email,
                    mobile: json.mobile,
                    password: json.password,
                    vehicle_registration1: json.vehicle_registration1,
                    vehicle_mac1: json.vehicle_mac1,
                    vehicle_model1: json.vehicle_model1,
                    vehicle_registration2: json.vehicle_registration2,
                    vehicle_mac2: json.vehicle_mac2,
                    vehicle_model2: json.vehicle_model2,
                    vehicle_registration3: json.vehicle_registration3,
                    vehicle_mac3: json.vehicle_mac3,
                    vehicle_model3: json.vehicle_model3,
                    vehicle_registration4: json.vehicle_registration4,
                    vehicle_mac4: json.vehicle_mac4,
                    vehicle_model4: json.vehicle_model4,
                }
            }
        });
    }
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
    editHideHandle() {

        this.setState({ editShow: false });
    }
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to refresh list
     * @return                refresh
     */
    importOnSave() {
        this.getDoctorList(0, 10, this.state.sorted, this.state.filtered);
    }
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to exportCSV.
     * @return                Nothing
     */
    exportCSV() {
        const { dispatch } = this.props;
        dispatch(commonActions.exportFile('export_user'));
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
    * @ShortDescription      This function is responsible to get the list of user from API
    * @return                Nothing
    */
    getDoctorList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(userActions.getDoctorList(page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle load filtered user list
     * @return                Nothing
    */
    userSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
    }

    renderer ({ days, hours, minutes, seconds, completed }){
        if (completed) {
          // Render a complete state
          return <span>Suspended!</span>
        } else {
          // Render a countdown
          return <span>{days}:{hours}:{minutes}:{seconds}</span>;
        }
    };


    createDate(date) {
      return  Date.parse(new Date(date));
    }

    /**
     * @DateOfCreation        01 August 2018
     * @ShortDescription      This function is responsible to sending mail.
     * @return                Void
     */
    statusCheck(event) {
        const { data }  = this.state.payload;
        this.setState({
            payload : {
                data : {
                    ...data,
                    status: event.target.value
                  }
            }
        });
        var json = {'doc_id':this.state.payload.data.doc_id,'is_approved':event.target.value}
        const { dispatch } = this.props;
        dispatch(commonActions.statusCheck(json));
    }

    /**
    * @DateOfCreation        11 June 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleInputChange(event) {
        const { name, value }       = event.target;
        const { editdata }  = this.state.edit;
        this.setState({
            edit : {
                editdata : {
                    ...editdata,
                    [name]: value
                }
            }
        });
    }

    editSave(){
        const { editdata }  = this.state.edit;
        const { dispatch } = this.props;
        dispatch(commonActions.editPut(editdata));
    }

    makePractioner(doc_id, practioner){
        const { dispatch } = this.props;
        dispatch(userActions.makePractitinor(doc_id, practioner)).then((res) => {
          if(res.status === 200){

            // console.log('makePractioner',res)
            this.getDoctorList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered)
          }
        })
    }

    viewClinic(row){
      this.setState({ clinicShow: true, doc_id: row.doc_id });

        const { dispatch } = this.props;
        dispatch(clinicActions.getClinicList(row.doc_id)).then((res) => {
            // console.log('viewClinic',res)
          if(res.status === 200){
            let clinics = res.data
            if(clinics.length > 0){
              let displayClinic = []
              clinics.map((row) => {
                displayClinic.push({
                  clinic_id: row.id,
                  name: row.clinic_name,
                  number: row.clinic_number,
                  fees: row.clinic_fees,
                  patient_attend_time: row.patient_attend_time,
                  address: row.clinic_address,
                  city: row.clinic_city_id, 
                  state: row.clinic_state_id, 
                  pincode: row.clinic_pincode, 
                  status: row.status,
                  action: 'Appointments',
                })
              })
              this.setState({clinics: displayClinic})
            }
                    
          }
        })

    }


    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
    clinicHideHandle() {
        this.setState({ clinicShow: false, clinics: [], doc_id: '' });
    }

    viewAppointments(clinic_id){
      let data = {
                      state_date: "",
                      end_date: "",
                      clinic_id: clinic_id
                  }
      this.setState({ AppointmentShow: true });

        const { dispatch } = this.props;
        dispatch(doctorActions.doctorAppointmentList(data, this.state.doc_id)).then((res) => {
            // console.log('viewAppointments',res)
          if(res.status === 200){
            let appointment = res.data
            if(appointment.length > 0){
              let displayAppointment = []
              // appointment.map((row) => {
              //   displayAppointment.push({
              //     name: row.clinic_name,
              //     number: row.clinic_number,
              //     fees: row.clinic_fees,
              //     patient_attend_time: row.patient_attend_time,
              //     address: row.clinic_address,
              //     city: row.clinic_city_id, 
              //     state: row.clinic_state_id, 
              //     pincode: row.clinic_pincode, 
              //     status: row.status
              //   })
              // })
              this.setState({appointments: displayAppointment})
            }else{
              this.setState({appointments: []})
            }
          }
        })
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
    appointmentsHideHandle() {
        this.setState({ AppointmentShow: false, appointments: [] });
    }

    /**
     * @DateOfCreation        06 Mar 2021
     * @ShortDescription      This function is responsible to handle delete doctor
     * @return                Nothing
     */
    deleteDoctor(row){

        const { dispatch } = this.props;
        dispatch(doctorActions.DoctorRemove(row.user_id)).then((res) => {
            console.log('DoctorRemove',res)
          if(res.status === 200){
              // this.setState({appointments: displayAppointment})
          }
        })
    }
    /**
     * @DateOfCreation        28 June 2018
     * @ShortDescription      This function is responsible to close import model.
     * @return                Nothing
    */
    UNSAFE_componentWillReceiveProps(newProps) {
        if(newProps.statusClose == true){
            setTimeout(function() { 
                this.statusHideHandle();
                this.importOnSave();
                const { dispatch } = this.props;
                dispatch(commonActions.resetStatusState())
            }.bind(this), 1500);
        }
        if(newProps.editClose == true){
            setTimeout(function() { 
                this.editHideHandle();
                this.importOnSave();
                const { dispatch } = this.props;
                dispatch(commonActions.resetEditState())
            }.bind(this), 1500);
        }
        if(newProps.renewClose == true){
            setTimeout(function() { 
                this.clinicHideHandle();
                this.importOnSave();
                const { dispatch } = this.props;
                dispatch(commonActions.resetReNewState())
            }.bind(this), 1500);
        }
    }


    render() {
        // var fileSize = parseInt(configConstants.MAX_FILE_SIZE);
        return (
            <div className="page-container">
            <HeaderContainer />
            <div class="container-fluid"> 
               <div class="row">
                  <div class="col-md-2.5">
                    <SideMenu/>
                  </div>
                  <div class="col-md-9">
                    <Status
                        onClick = { this.state.statusShow }
                        onClose = { this.statusHideHandle }
                        payroll = { this.state.payload.data }
                        onChange = {this.statusCheck}
                    />
                    <EditView
                        onClick = { this.state.editShow }
                        onClose = { this.editHideHandle }
                        payroll = { this.state.edit }
                        handleInputChange = {this.handleInputChange}
                        onSave = {this.editSave}
                        displayView = {this.state.displayView}
                    />
                    <Clinic
                        onClick = { this.state.clinicShow }
                        onClose = { this.clinicHideHandle }
                        clinics = { this.state.clinics }
                    />
                    <Appointment
                        onClick = { this.state.appointmentShow }
                        onClose = { this.appointmentsHideHandle }
                        appointments = { this.state.appointments }
                    />
                  <div className="main-content">
                    <div className="wrap-inner-content">
                        <div className="col-md-12">
                          <div className="inner-content">
                                <div className="row page-header">
                                    <div className="col-md-12">
                                        <h1 className="page-title">Doctor</h1>
                                    </div>
                                </div>
                                <div className="table">
                                  
                                  <ReactTable
                                      noDataText="No found !!"
                                      data={this.props.doctorList}
                                      filterable
                                      defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                      filtered={this.state.filtered}
                                      columns={[
                                          
                                          {
                                              Header    : 'Name',
                                              accessor  : 'name',
                                              className : 'grid-header',
                                              filterable  : false,
                                              filterMethod: (filter, row) => {
                                                  return row[filter.id].includes(filter.value);
                                              }
                                          },
                                          {
                                            Header    : 'UIN',
                                            accessor  : 'user_id',
                                            className : 'grid-header',
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                          },
                                          {
                                              Header    : 'Mobile',
                                              accessor  : 'contact_no',
                                              className : 'grid-header',
                                              filterable  : false,
                                              filterMethod: (filter, row) => {
                                                  return row[filter.id].includes(filter.value);
                                              }
                                          },
                                          {
                                            Header    : 'Email ID',
                                            accessor  : 'email',
                                            className : 'grid-header',
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                          },
                                          {
                                            Header    : 'Specialization',
                                            accessor  : 'en_spec',
                                            className : 'grid-header',
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                          },
                                          {
                                            Header    : 'Reg. Number',
                                            accessor  : 'registratration_number',
                                            className : 'grid-header',
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                          },
                                          {
                                            Header    : 'Reg. Year',
                                            accessor  : 'registration_year',
                                            className : 'grid-header',
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                          },
                                          {
                                            Header    : 'Reg. Proof',
                                            accessor  : 'registraion_proof',
                                            className : 'grid-header',
                                            filterable  : false,
                                            Cell: row => 
                                                        <div>
                                                          {row.value &&
                                                            <a href={process.env.STATIC_IMAGE_BASE_PATH+row.value} 
                                                              className="btn"
                                                              target="_blank"
                                                              >
                                                              <img src={process.env.STATIC_IMAGE_BASE_PATH+row.value} width={80}/>
                                                            </a>
                                                          }
                                                        </div>
                                          },
                                          {
                                            Header    : 'ID Proof',
                                            accessor  : 'id_proof',
                                            className : 'grid-header',
                                            filterable  : false,
                                            Cell: row => 
                                                        <div>
                                                        {row.value &&
                                                          <a href={process.env.STATIC_IMAGE_BASE_PATH+row.value} 
                                                            className="btn"
                                                            target="_blank"
                                                            >
                                                            <img src={process.env.STATIC_IMAGE_BASE_PATH+row.value} width={80}/>
                                                          </a>
                                                        }
                                                        </div>
                                          },
                                          {
                                            Header    : 'Subscription start date',
                                            accessor  : 'subscription',
                                            className : 'grid-header',
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                          },
                                          {
                                            Header    : 'Subscription end date',
                                            accessor  : 'subscription',
                                            className : 'grid-header',
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                          },
                                          {
                                            Header    : 'Plan',
                                            accessor  : 'subscription',
                                            className : 'grid-header',
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                          },
                                          {
                                            Header    : 'Subscription amount',
                                            accessor  : 'subscription',
                                            className : 'grid-header',
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                          },
                                          {
                                            Header: 'Status',
                                            accessor  : "is_approved",
                                            filterable  : false,
                                            
                                            className : 'grid-header',
                                            Cell: row => 
                                                        <div>
                                                          <a href="javascript:void(0)" 
                                                            className="btn"
                                                            onClick={ this.statusShowHandle.bind(null,row.original.doc_id,row.original.is_approved) } 
                                                            disabled={ this.props.submitted ? true : false }>
                                                            {
                                                              row.value === 1 ?
                                                              <span className="btn btn-success">Approved</span> :
                                                              <span className="grey btn">Unapproved</span>
                                                            }
                                                          </a>
                                                        </div>
                                          },
                                          {
                                            Header: 'Practitioner',
                                            accessor  : "practioner",
                                            filterable  : false,
                                            
                                            className : 'grid-header',
                                            Cell: row => 
                                                        <div>
                                                        {
                                                          row.value === 0 ?
                                                          <a href="javascript:void(0)" 
                                                            className="btn"
                                                            onClick={()  => this.makePractioner(row.original.doc_id, row.value) } 
                                                            disabled={ this.props.submitted ? true : false }>
                                                              <span className="btn btn-success">Make</span>
                                                          </a>
                                                          : 
                                                            <a href="javascript:void(0)" 
                                                              className="btn"
                                                              onClick={()  => this.makePractioner(row.original.doc_id, row.value) } 
                                                              disabled={ this.props.submitted ? true : false }>
                                                                <span className="btn btn-success">Remove</span>
                                                            </a>
                                                        }
                                                        </div>
                                          },
                                          {
                                              Header: 'Actions',
                                              accessor  : "doc_id",
                                              filterable  : false,
                                              
                                              className : 'grid-header',
                                              Cell: row => 
                                                        <DropdownButton id={"dropdown-"+row.value} title="Action" menuAlign="right">
                                                            <Dropdown.Item onClick={() => this.viewClinic(row.original)}>View Clinic</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.viewAppointments(row.original)}>Appointment</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.deleteDoctor(row.original)}>Delete</Dropdown.Item>
                                                        </DropdownButton>
                                          }
                                      ]}
                                      defaultSorted={[
                                          {
                                              id: 'name',
                                              desc: false
                                          }
                                      ]}
                                      defaultPageSize={10}
                                      minRows= {this.props.doctorList}
                                      className="react-table-cell -striped -highlight"
                                      loading={this.state.loading}
                                      filterable
                                      Sorted
                                      pages={this.props.pages}
                                      showPagination={true}
                                      showPaginationTop={false}
                                      showPaginationBottom={true}
                                      pageSizeOptions={[10, 20, 50]}
                                      automatic // For server side pagination
                                      onFetchData={(state, instance) => {
                                          this.getDoctorList(state.page, state.pageSize, state.sorted, state.filtered);
                                      }}
                                  />
                              </div>
                          </div>
                        </div>
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
 * @ShortDescription      connect state to props on reducer and get state for user list
 * @return                user list and loader
 */

function mapStateToProps(state) {
   const { doctorList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid,submitted } = state.userReducer;
   const { statusClose, editClose, renewClose } = state.commonReducer;
    return {
        statusClose,
        editClose,
        renewClose,
        doctorList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        submitted
    };
}
const connectedDoctor = connect(mapStateToProps)(Doctor);
export { connectedDoctor as Doctor };
