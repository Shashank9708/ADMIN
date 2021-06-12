import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import {AddUpcomingAppointmentsContainer} from './AddUpcomingAppointmentsContainer';
import {AddDigitalPrescription} from './AddDigitalPrescription';
import {ReferToDoctor} from './ReferToDoctor';
import { doctorActions, clinicActions, patientActions, headerActions, videoActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardComponent from '../CardComponent/CardComponent';
import PatientDetail from '../PatientDetail/PatientDetail';
import axios from 'axios';


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

        this.statusShowHandle = this.statusShowHandle.bind(this);
        this.SearchFilterFunction         = this.SearchFilterFunction.bind(this);
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
        this.patientDetailActive = this.patientDetailActive.bind(this);
        
        this._onCreate_Room = this._onCreate_Room.bind(this);
        this.getRoomIDWebCall = this.getRoomIDWebCall.bind(this);
        this.getRoomTokenWebCall = this.getRoomTokenWebCall.bind(this);
        this.navigateToVideo = this.navigateToVideo.bind(this);



        this.getUpcomingAppointmentsList = this.getUpcomingAppointmentsList.bind(this);
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
            inputList: [{ medicine: "", days: "", whentotake: "", instructions: "" }],
            typing_area: '',
            purpose: '',
            appointment_id:  '',
            patient_id: '',
            doctor_id: JSON.parse(localStorage.user).doc_id,
            referData: '',
            referTOdoctor: '',
            active: false,
            patientDetail: '',
            doctorAppoinementList: [],
            filterList: [],

        }
    }

    SearchFilterFunction(event){
      let searchInput = event.target.value;

      let { filterList } = this.state;
      let filteredData = filterList.filter(value => {
      return (
          value.name.toLowerCase().includes(searchInput.toLowerCase()) 
        );
      });

      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        doctorAppoinementList: filteredData,
        text: searchInput,
      });
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
       dispatch(doctorActions.getAllMedicine());
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
      inputList.push({ medicine: "", days: "", whentotake: "", instructions: "" })
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
          formData.append('typeing_area', this.state.typing_area);
          formData.append('purpose', this.state.purpose);
          
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
        
        if(newProps.doctorAppoinement == true){
            setTimeout(function() { 
              this.setState({
                doctorAppoinementList: newProps.doctorAppoinementList,
                filterList: newProps.doctorAppoinementList,
              })
                const { dispatch } = this.props;
                dispatch(doctorActions.resetFirstState())
            }.bind(this), 1500);
        }

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

    _onCreate_Room (row) {
      // return false;
     
        this.getRoomIDWebCall(row);
    };
    getRoomIDWebCall (row)  {

        const { dispatch } = this.props;
        dispatch(videoActions.createRoom()).then(data=>{
          console.log("data",data)
          this.setState({room_id:data.room.room_id});
          
          let parama = {
                      "room_id" : data.room.room_id,
                      "receiver_id" : row.patient_id,
                      "appointment_id" : row.appointment_id,
                      "user_id": row.doc_id,
                      "name": this.state.doc_name,
                      "profile_url": utilityHelper.ProfilePic(this.state.display_pic)
                    }

          this.setState({
            videoCall: {
                      "roomId" : data.room.room_id,
                      "user_ref" : row.patient_id,
                      "appointment_id" : row.appointment_id,
                      "name": row.name,
                      // "role": "participant"
                      "role": "moderator"
                    }
          })
          // const { dispatch } = this.props;
          // dispatch(videoActions.sendVideoCallByServer(parama));
          // Chetan following line is printing room id you have to pass this to server using API developed by Vikas ji
          // console.log("Room Id", data.room.room_id);
          // this.getRoomTokenWebCall();
        })

          
      }
      getRoomTokenWebCall() {
      //  console.log("DoctorRoomId",this.state.videoCall.roomId);
        var header = (kTry) ? { "x-app-id" : kAppId , "x-app-key" : kAppkey} : {};
        const options = {
          headers: header
        };
        let token = axios
          .post(kBaseURL+"createToken/", {
            name: this.state.videoCall.name,
            role: this.state.videoCall.role,
            user_ref: this.state.videoCall.user_ref,
            roomId: this.state.videoCall.roomId
          },options)
          .then(function(response) {
            return  response.data;         
          })
          .catch(function(error) {
            // console.log("axiosCreateTokenCatch", error);
          });
          // console.log("token Jai RAM",token)
          this.setState({res_token:token.token});

          // await this.navigateToVideo();
      }
      navigateToVideo() {
         // const { navigate } = this.props.navigation;
          // // console.log("this.state.res_token",this.state.res_token)
          // try {
          //   if (this.state.res_token) {
          //     this.props.navigation.navigate('EnxConferenceScreen', {
          //       username: this.state.videoCall.name,
          //       token: this.state.res_token
               
          //      });
          //   } else {
          //     // console.log(res_token.error);
          //   }
          // } catch (error) {
          //   // console.log("navigationError", error);
          // }
      }


    render() {
      const {startDate, endDate} = this.state

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

                      <div className="page-heading__btn-container">
                        <div className="page-heading__searchbox">
                            <input type="text" placeholder="Search" onChange={this.SearchFilterFunction}/>
                        </div>   
                      </div>
                      
                      <div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" className="btn btn-sm"><i className="fa fa-th" aria-hidden="true"></i></button>
                          <button type="button" className="btn btn-sm"><i className="fa fa-list" aria-hidden="true"></i></button>
                        </div>
                      </div>
                    </div>  
   
                    <div className="row">
                      <div className="col-md-5">
                        {this.state.doctorAppoinementList.length > 0 &&  
                          this.state.doctorAppoinementList.map((row) => 
                            <CardComponent 
                              appointment = {row}
                              handleClick = {this.patientDetailActive}
                              // cancelAll = {this._onCreate_Room}
                              cancelAll = {this.cancelAll}
                              active = {this.state.active}
                            />
                          )
                        }
                      </div>
                      <div className="col-md-7">
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
                      prescriptionURL = {this.props.uploaded_url}
                      medicineList = {this.props.medicineList}
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
    const { doctorAppoinementList, doctorAppoinement, medicineList, favoriteList,pages,referStatus,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status, complete, uploaded_url } = state.doctorReducer;
    const { clinicList } = state.clinicReducer;
    const { healthProblem, patientHistory } = state.patientReducer;
    return {
        doctorAppoinementList,
        doctorAppoinement,
        favoriteList,
        medicineList,
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
        referStatus,
        uploaded_url,
        patientHistory
    };
}
const connectedUpcomingAppointments = connect(mapStateToProps)(UpcomingAppointments);
export { connectedUpcomingAppointments as UpcomingAppointments };


