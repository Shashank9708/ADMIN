import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import {AddUpcomingAppointmentsContainer} from '../UpcomingAppointments/AddUpcomingAppointmentsContainer';
import {AddDigitalPrescription} from '../UpcomingAppointments/AddDigitalPrescription';
import {ReferToDoctor} from '../UpcomingAppointments/ReferToDoctor';
import { doctorActions, clinicActions, patientActions, headerActions, rxActions } from '../../_actions';
import { configConstants } from '../../_constants';
import {DropdownButton, Dropdown} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardComponent from '../CardComponent/CardComponent';
import PatientDetail from '../PatientDetail/PatientDetail';
import { utilityHelper } from '../../_helpers';

// import { format, subHours, startOfMonth } from 'date-fns';


import { Calendar, momentLocalizer, dateFnsLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// const localizer = momentLocalizer(moment)

import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
const locales = {
  'en-US': require('date-fns/locale/en-US'),
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


class DoctorDashboard extends React.Component {
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

        this.statusShowHandle = this.statusShowHandle.bind(this);
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
        this.handleSelectDP = this.handleSelectDP.bind(this);



        this.addReferToDoctorShowHandle = this.addReferToDoctorShowHandle.bind(this);
        this.addReferToDoctorHideHandle = this.addReferToDoctorHideHandle.bind(this);
        this.handleSelectDoctor = this.handleSelectDoctor.bind(this);
        this.handleReferToDoctor = this.handleReferToDoctor.bind(this);
        

        this.completedApi = this.completedApi.bind(this);
        this.patientDetailActive = this.patientDetailActive.bind(this);
        

        this.getUpcomingAppointmentsList = this.getUpcomingAppointmentsList.bind(this);
        this.getUpcomingAppointments = this.getUpcomingAppointments.bind(this);
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
            inputList: [{ medicine: "", days: "", whentotake: "", dosage: "", dosage_form: "", instructions: "" }],
            typing_area: '',
            symptoms:  '',
            purpose:  '',
            blood_pressure:  '',
            heart_rate:  '',
            oxygen_level:  '',
            appointment_id:  '',
            test:  '',
            followup_date: '',
            signature: 0,
            patient_id: '',
            doctor_id: JSON.parse(localStorage.user).doc_id,
            referData: '',
            referTOdoctor: '',
            active: false,
            patientDetail: '',
            showModal: false,
            events: ''
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
       const { dispatch }   = this.props;
       // dispatch(doctorActions.getAllMedicine());
       dispatch(rxActions.getRXList());
       dispatch(doctorActions.getAllSymtoms());
       dispatch(doctorActions.getAllTestCat());
       this.setState({ addDigitalPrescriptionShow: true, patient_id: row.patient_id, appointment_id: row.appointment_id, purpose: row.purpose });
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
      if(name === "medicine"){
        list[index].dosage = selectedOption.value.dosage || '';
        list[index].instructions = selectedOption.value.instructions || '';
        list[index].dosage_form = {label: selectedOption.value.dosage_form, value: selectedOption.value.dosage_form} || '';
      }
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
      inputList.push({ medicine: "", days: "", whentotake: "", dosage: "", dosage_form: "", instructions: "" })
      this.setState({inputList: inputList});
    };

    // handle input change
    handleSelectDP (selectedOption, name){
      this.setState({[name]: selectedOption})
      // if(name === 'test_category'){
      //   const { dispatch }   = this.props;
      //   dispatch(doctorActions.getAllTestByCat(selectedOption.value));
      // }
    };
    handleSaveDigitalPrescription(){
        // if(this.state.inputList.length > 0){
        this.state.inputList.filter((row) =>{
          if(row.days.label){
            row.days= row.days.value
          }
          if(row.medicine.label){
            row.medicine= row.medicine.value.name ? row.medicine.value.name: row.medicine.value
          }
          if(row.whentotake.label){
            row.whentotake= row.whentotake.value
          }
          if(row.dosage_form.label){
            row.dosage_form= row.dosage_form.value
          }
        })

          let url = '/doctor/uploadprescription'
          const formData = new FormData();
          formData.append('appointment_id', this.state.appointment_id)
          formData.append('patient_id', this.state.patient_id)
          formData.append('doctor_id', this.state.doctor_id)
          formData.append('prescription', '');

          formData.append('details', JSON.stringify(this.state.inputList))
          formData.append('purpose', this.state.purpose);
          let symptoms = []
          if(this.state.symptoms.length > 0){
            this.state.symptoms.map(row=> {
              symptoms.push(row.value)
             }
            )
          }
          formData.append('symptoms', symptoms);
          formData.append('blood_pressure', this.state.blood_pressure);
          formData.append('heart_rate', this.state.heart_rate);
          formData.append('oxygen_level', this.state.oxygen_level);
          formData.append('typing_area', this.state.typing_area);
          formData.append('followup_date', this.state.followup_date ? format(new Date(this.state.followup_date), 'yyyy-MM-dd') : '');
          formData.append('signature', this.state.signature);
          let test = []
          if(this.state.test.length > 0){
            this.state.test.map(row=> {
              test.push(row.value)
             }
            )
          }
          formData.append('test', test);

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
            formData.append('purpose', "")
            formData.append('symptoms', "")
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
       
       const { dispatch } = this.props;
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
    componentDidMount(){
        this.getUpcomingAppointmentsList()
    }
    /**
    * @DateOfCreation        26 July 2018
    * @ShortDescription      This function is responsible to get the list of notification from API
    * @return                Nothing
    */
    getUpcomingAppointmentsList(){
        let data = {
                      start_date: this.state.startDate.toISOString().substr(0, 10),
                      end_date: this.state.endDate.toISOString().substr(0, 10)
                  }

        const { dispatch }   = this.props;
        dispatch(doctorActions.doctorAppointmentList(data));
    }

    getUpcomingAppointments(start_date, end_date){
      

      let data = {
                      start_date: format(new Date(start_date), 'yyyy-MM-dd'),
                      end_date: format(new Date(end_date), 'yyyy-MM-dd')
                  }

        const { dispatch }   = this.props;
        dispatch(doctorActions.doctorAppointmentList(data));
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

    patientDetailActive(data) {

      this.setState({active: data.appointment_id, patientDetail:data})
      const { dispatch } = this.props;
      dispatch(patientActions.getPatientHistory(data.patient_id));         
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
                this.getUpcomingAppointmentsList();
                this.addDigitalPrescriptionHideHandle();
            }.bind(this), 1500);
        }
        if(newProps.complete == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                dispatch(doctorActions.resetFirstState())
                toast("Complete Successfully")
                this.setState({active: false, patientDetail:''})
                this.getUpcomingAppointmentsList();
            }.bind(this), 1500);
        }
        if(newProps.referStatus == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                dispatch(doctorActions.resetFirstState())
                toast("Referred  Successfully")
                this.addReferToDoctorHideHandle();
                this.getUpcomingAppointmentsList();
            }.bind(this), 1500);
        }
    }

    handleInputChange(name, date) {
        this.setState({
          [name] : date
        });
        if(name === 'endDate'){
          setTimeout(function() { 
            this.getUpcomingAppointmentsList();
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
        // var fileSize = parseInt(configConstants.MAX_FILE_SIZE);
        var minutesToAdd=30;
        this.props.doctorAppoinementList.length > 0 && this.props.doctorAppoinementList.filter((row) => {
            row.start = new Date(row.appointment_date + " " + row.appointment_time)
            row.end = new Date(row.start.getTime() + minutesToAdd*60000)
            row.purpose = row.purpose ? row.purpose : ''
            row.title = row.name +" purpose: "+ row.purpose
        })

        return (
          <React.Fragment>
            <HeaderContainer />
            <div className="container-fluid">
               <div className="row">
                  <DoctorSideMenu/>
                  <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                  
                    <div className="page-heading">
                      <div className="page-heading__title-container">
                          <h1 className="page-heading__title">Dashboard</h1>
                      </div>
                      
                      <div className="page-heading__btn-container">
                         <button className="page-heading__btn btn-sm" onClick={this.addUpcomingAppointmentsShowHandle}>Book New Appointment</button>
                      </div>
                      
                      <div>
                        {/*<div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" className="btn btn-sm"><i className="fa fa-th" aria-hidden="true"></i></button>
                          <button type="button" className="btn btn-sm"><i className="fa fa-list" aria-hidden="true"></i></button>
                        </div>*/}
                      </div>
                    </div>  
   
                    <div className="row" >
                      <div className="col-md-7">
                      <Calendar
                        selectable
                        popup={false}
                        // onShowMore={(events, date) => {
                        //     console.log("-----------",events, date)
                        //     this.setState({ showModal: true, events })
                        //   }
                        // }
                        step={15}
                        timeslots={2}
                        localizer={localizer}
                        events={this.props.doctorAppoinementList}
                        defaultView="day"
                        views={["day", "week", "month"]}
                        defaultDate={moment().toDate()}                        
                        startAccessor="start"
                        endAccessor="end"
                        resizable
                        style={{ height: "120vh" }}
                        onSelectEvent={event => this.patientDetailActive(event)}
                        // onSelectSlot={slotInfo => console.log("slotInfo======",slotInfo)}
                        onRangeChange={(slotInfo) => {
                            // console.log("slotInfo",slotInfo)
                          if(slotInfo.length === 1){
                            this.getUpcomingAppointments(slotInfo[0], slotInfo[0])
                          }else if(slotInfo.length === 7){
                            this.getUpcomingAppointments(slotInfo[0], slotInfo[6])
                          }else if(slotInfo.start){
                            this.getUpcomingAppointments(slotInfo.start, slotInfo.end)
                          }
                          }
                        }

                        // components={{
                        //     event: CustomEvent,
                        // }}
                        // onNavigate={date => {
                        //   // console.log("slotInfo======",date)
                        //   this.getUpcomingAppointments(date, date)
                        // }}

                      />  
                    </div> 
                    <div className="col-md-5"> 
                      <PatientDetail 
                        patientDetail = {this.state.patientDetail}
                        addReferToDoctorShowHandle = {this.addReferToDoctorShowHandle}
                        completedApi = {this.completedApi}
                        addDigitalPrescriptionShowHandle = {this.addDigitalPrescriptionShowHandle}
                        patientHistory = {this.props.patientHistory}
                      /> 
                    </div>  
                  </div>  
   
                  </main>
                  
                    {this.state.showModal && <Modal events={this.state.events}/>}

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
                      handleSelectDP = {this.handleSelectDP}
                      prescriptionURL = {this.props.uploaded_url}
                      medicineList = {this.props.rxList.length > 0 ? this.props.rxList[0] : [] }
                      symtomsList = {this.props.symtomsList}
                      testByCatList = {this.props.testCatList}
                      payload = {this.state}

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
    const { doctorAppoinementList, favoriteList, symtomsList, testCatList, pages, referStatus,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status, complete, uploaded_url } = state.doctorReducer;
    const { clinicList } = state.clinicReducer;
    const { rxList } = state.rxReducer;
    const { healthProblem, patientHistory } = state.patientReducer;
    // console.log("testCatList",testCatList)
    return {
        doctorAppoinementList,
        favoriteList,
        isUserNotValid,
        loader,
        rxList,
        symtomsList,
        testCatList,
        clinicList,
        healthProblem,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status,
        complete,
        referStatus,
        uploaded_url,
        patientHistory
    };
}
const connectedDoctorDashboard = connect(mapStateToProps)(DoctorDashboard);
export { connectedDoctorDashboard as DoctorDashboard };




export default class CustomEvent extends React.Component {
    render() {
        return (
        <div>
            {this.props.title}
        </div>
        );
    }
}