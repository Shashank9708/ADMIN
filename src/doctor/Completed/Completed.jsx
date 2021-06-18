import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import { patientActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import CardComponent from '../CardComponent/CardComponent';
import PatientDetail from '../PatientDetail/PatientDetail';



class Completed extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        
        // this.getPatientList        = this.getPatientList.bind(this);
        this.SearchFilterFunction         = this.SearchFilterFunction.bind(this);
        this.patientDetailActive = this.patientDetailActive.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addAppointmentsShow: false,
            active: false,
            patientDetail: '',
            patientsList: [],
            filterList: [],
            getCat: false,
            startDate: new Date(), 
            endDate: new Date(),
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
        patientsList: filteredData,
        // text: searchInput,
      });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      // console.log(nextProps.categroyList.data) 
      if (nextProps.patientsList !== prevState.patientsList && !prevState.getCat) {
        if(nextProps.patientsList.length > 0){
          return ({ 
            patientsList: nextProps.patientsList,
            filterList: nextProps.patientsList,
            getCat: true
          })
        } 
      }
      return null
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
      let data = {
                  start_date: this.state.startDate.toISOString().substr(0, 10),
                  end_date: this.state.endDate.toISOString().substr(0, 10),
                  doc_id : JSON.parse(localStorage.user).doc_id
              }
        const { dispatch }   = this.props;
        dispatch(patientActions.getCompletedsList(data));
    }

    patientDetailActive(data) {

      this.setState({active: data.appointment_id, patientDetail:data})

      const { dispatch } = this.props;
      dispatch(patientActions.getPatientHistory(data.patient_id));   
    }

    render() {

        return (
            <React.Fragment>
                <HeaderContainer />
                <div className="container-fluid">
                    <div className="row">
                        <DoctorSideMenu/>
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                        
                            <div className="page-heading">
                              <div className="page-heading__title-container">
                                  <h1 className="page-heading__title">Completed Appointment</h1>
                              </div>
                              <div className="page-heading__searchbox">
                                    <input type="text" placeholder="Search" onChange={this.SearchFilterFunction}/>
                              </div>
                              
                            </div>
                            <div className="row">
                              <div className="col-md-5">
                                {this.state.patientsList.length > 0 &&  
                                  this.state.patientsList.map((row) => 
                                    <CardComponent 
                                      appointment = {row}
                                      handleClick = {() => {}}
                                      // cancelAll = {this.cancelAll}
                                      active = {this.state.active}
                                      actionButton={true}
                                    />
                                  )
                                }
                              </div>
                              <div className="col-md-7">
                                <PatientDetail 
                                  patientDetail = {this.state.patientDetail}
                                  actionButton={true}
                                  patientHistory = {this.props.patientHistory}
                                /> 
                              </div>
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
   const { patientsList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid } = state.patientReducer;
   // console.log('patientsList',patientsList)
   const { patientHistory } = state.patientReducer;
    return {
        patientsList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        patientHistory
    };
}
const connectedCompleted = connect(mapStateToProps)(Completed);
export { connectedCompleted as Completed };
