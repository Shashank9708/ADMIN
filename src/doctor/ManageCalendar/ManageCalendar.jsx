import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import { clinicActions, clinicSlotActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import {DropdownButton, Dropdown} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'
import { utilityHelper } from '../../_helpers';


class ManageCalendar extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        
        this.getClinicList         = this.getClinicList.bind(this);
        this.getClinicSlot = this.getClinicSlot.bind(this);
        this.getClinicSlotbyDate         = this.getClinicSlotbyDate.bind(this);
        this.dateToggleStatus         = this.dateToggleStatus.bind(this);
        this.onSelectSlot         = this.onSelectSlot.bind(this);
        this.slotStatusChange         = this.slotStatusChange.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            doc_id: JSON.parse(localStorage.user).doc_id,
            clinic_id: '',
            date: new Date().toJSON().slice(0,10),
            days: [],
            slots: [],
            clinicSlotManage: [],
            dateStatus: '',
            currentDate: [],
            selectDateData: ''
        }
    }

    componentDidMount(){
      this.getClinicList()        
    } 

    getClinicList () {
      const { dispatch }   = this.props;
        dispatch(clinicActions.getClinicList(this.state.doc_id));
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
    getClinicSlot(selectedOption, name) {
        // console.log('selectedOption',selectedOption, name)
          this.setState({
              clinic_id: selectedOption.value
          });
            let data = {
                    clinic_id: selectedOption.value,
                    date: new Date().toISOString().substr(0, 10)
                  }

            const { dispatch } = this.props;
            dispatch(clinicSlotActions.getClinicSlotDate(data));
            dispatch(clinicSlotActions.getClinicSlotManage(data));
      }

    getClinicSlotbyDate (row) {
      if(row.active === 0){
        return false
      }
        this.setState({date: row.day, selectDateData: row});
        let data = {
                  clinic_id: this.state.clinic_id,
                  date: row.day
                }
        // console.log("data",data)
        const { dispatch } = this.props;
        dispatch(clinicSlotActions.getClinicSlotDate(data));
        dispatch(clinicSlotActions.getClinicSlotManage(data));
    }

    dateToggleStatus (value) {
      
      let status = 'inactive'
      let statusValue = 0
      if(value === 1){
          status = 'active'
          statusValue = 1
      }
      let data = {
                clinic_id: this.state.clinic_id,
                status: status,
                inactive_date: this.state.date,
                doc_id: this.state.doc_id,
                slots: [] 
            }
      let changeStatus = {"active": statusValue, "day": this.state.date}      
      // console.log('======>>> ', data)
      this.setState({dateStatus: value, selectDateData: changeStatus})
      const { dispatch } = this.props;
      dispatch(clinicSlotActions.slotTimeStatusChange(data));

    }

    onSelectSlot (index, slot, active) {
        let value = 0
        if(active === 1){
          value = 0
        }else{
          value = 1
        }
        let clinicSlotManage = Object.assign(this.state.clinicSlotManage); // Pull the entire clinicSlotManage object out. Using object.assign is a good idea for objects.
        clinicSlotManage[index].active = value; // update the clinicSlotManage object as needed
        this.setState({ clinicSlotManage });
        

        let {slots} = this.state

        if(slots.indexOf(slot) !== -1){
          var indexId = slots.indexOf(slot);//get  "car" index
          //remove car from the colors array
          slots.splice(indexId, 1); // colors = ["red","blue","green"]
          console.log("Value exists!")
        } else{
          slots.push(slot)
          console.log("Value does not exists!")
        }
        this.setState({slots})
    }

    slotStatusChange (status) {
        let data = {
                clinic_id: this.state.clinic_id,
                status: status,
                inactive_date: this.state.date,
                doc_id: this.state.doc_id,
                slots: this.state.slots 
            }
        const { dispatch } = this.props;
        dispatch(clinicSlotActions.slotTimeStatusChange(data));
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      // console.log("nextProps",nextProps.timeSlot)
        if(nextProps.timeSlot){
            this.setState({clinicSlotManage: nextProps.clinicSlotManage})            
            const { dispatch } = this.props;
            dispatch(clinicSlotActions.resetClinicSlotState())
        }
        if(nextProps.dateSlot){
            this.setState({days: nextProps.clinicSlotDate})            
            if(this.state.selectDateData === ''){
              this.setState({selectDateData: nextProps.clinicSlotDate[0]})
            }
            const { dispatch } = this.props;
            dispatch(clinicSlotActions.resetClinicSlotState())
        }
        if(nextProps.statusClinicTimeSlot){
            setTimeout(function(){
              Alert.alert(nextProps.statusMsg, '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(clinicSlotActions.resetClinicSlotState())
              this.getClinicSlot(this.state.clinic_id);
            }.bind(this),1500);
        }
    }


    render() {
      // console.log("slot",this.state.selectDateData)
        return (
          <React.Fragment>
            <HeaderContainer />
            <div className="container-fluid">
               <div className="row">
                  <DoctorSideMenu/>
                  <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                  
                    <div className="page-heading">
                      <div className="page-heading__title-container">
                          <h1 className="page-heading__title">Manage Calendar</h1>
                      </div>
                    </div>

                    <Select
                        placeholder = "Select clinic"
                        onChange={ (value, name) => this.getClinicSlot(value, 'clinic_id') }
                        options={this.props.clinicList}
                        name='clinic_id'
                    />
                    
                    <div className="">
                      <label className="mt-3">Select Date ({utilityHelper.formatDate(this.state.date)})</label>
                      <div className="row manage-calendar-date-selection-row">
                        {this.state.days.length > 0 ?  
                          this.state.days.map((item)=>{
                            let select = false
                            if(item.day === this.state.date){  
                               select = true
                            }  
                            let dayName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(item.day).getDay()]
                            var day = utilityHelper.formatDate(item.day)

                            return <div className="col-md-2" >
                                <span 
                                  className={(item.active === 1) ? select ? "timeslot" : "timeslot-selected" :  "timeslot-not-selected"} 
                                  onClick={() => this.getClinicSlotbyDate(item)}>
                                  {dayName+" "+day}
                                </span>
                              </div>
                          })
                          :
                          <div className="col-md-12">
                            <div className="mb-3">
                              No date available
                            </div>
                          </div>
                        }
                      </div>
                    </div> 

                    <div className='custom-control custom-switch'>
                          <input
                            type='checkbox'
                            className='custom-control-input'
                            id='customSwitches'
                            readOnly
                            checked={(this.state.selectDateData.active === 0) ? true : false}
                            onChange={() => this.dateToggleStatus((this.state.selectDateData.active === 0) ? 1 : 0)}
                          />
                          <label className='custom-control-label' htmlFor='customSwitches'>
                            {(this.state.selectDateData.active === 1) ? "Day ON" : "Day OFF"} 
                          </label>
                        </div>

                    <div className="">
                      <label className="mt-3">Select Slot</label>
                      <div className="row">
                        {this.state.clinicSlotManage.length > 0 ?  
                          this.state.clinicSlotManage.map((item,index)=>{
                            let select = false
                            if(item.active === 1){  
                               select = true
                            }
                            return <div className="col-md-2" >
                              <span className={!select ? "timeslot" : "timeslot-not-selected"} 
                                onClick={() => this.onSelectSlot(index, item.start, item.active)}>
                                  {utilityHelper.formatTime(item.start)}</span>
                              </div>
                          })
                          :
                          <div className="col-md-12">
                            <div className="mb-3">
                              No date available
                            </div>
                          </div>
                        }
                      </div>
                    </div> 
                            
                    <div className="mt-3">
                      <div className="row">
                        <div className="col-md-12">
                          <button className="btn-sm" onClick={() => this.slotStatusChange('active')}>Active</button> 
                          <button className="btn-sm" onClick={() => this.slotStatusChange('inactive')}>Inactive</button>
                        </div>
                      </div>
                    </div>        
                            
                            
                            
                  </main>
                  
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
  
    const { clinicList, loader } = state.clinicReducer;
    const { clinicSlotManage, clinicSlotDate, sendingRequest, statusClinicTimeSlot, statusMsg, timeSlot, dateSlot } = state.clinicSlotReducer;

    return {
        clinicList,
        clinicSlotManage,
        clinicSlotDate,
        loader,
        sendingRequest,
        statusClinicTimeSlot,
        statusMsg,
        timeSlot,
        dateSlot
    };
}
const connectedManageCalendar = connect(mapStateToProps)(ManageCalendar);
export { connectedManageCalendar as ManageCalendar };