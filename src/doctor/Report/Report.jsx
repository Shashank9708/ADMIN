import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import { doctorActions, headerActions } from '../../_actions';
import { Doughnut } from 'react-chartjs-2';


class Report extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            graph: {},
            graph1: {},
            selectedSlice: {
              label: '',
              value: ''
            },
            selectedSlice1: {
              label1: '',
              value1: ''
            },
            labelWidth: 0,
            labelWidth1: 0,
            values: [],
            totalAppointment: 0,
            totalReferred: 0,
        }
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
        const { dispatch }   = this.props;
        dispatch(doctorActions.appointmentReport()).then((res) => {
            if(res.status === 200){
                this.setState({graph: res.data, totalAppointment: res.data.total})
            }
        })
        dispatch(doctorActions.referredReport()).then((res) => {
            // console.log(res)
            if(res.status === 200){
                this.setState({graph1: res.data, totalReferred: res.data.total_referred})
            }
        })
    }


    render() {
      var dataA = {}
      var dataR = {}
      if(this.state.graph){

        dataA = {
          labels: [
            'Completed', 'Cancelled', 'Pending'
          ],
          datasets: [{
            data: [this.state.graph.completed, this.state.graph.cancelled, this.state.graph.booked],
            backgroundColor: [
            '#63cfc4', '#eb8181', '#fca503'
            ],
            hoverBackgroundColor: [
            '#63cfc4', '#eb8181', '#fca503'
            ]
          }],
          text: '20%'
        };

      }
      if(this.state.graph1){

        dataR = {
          labels: [
            'Completed', 'Pending'
          ],
          datasets: [{
            data: [this.state.graph1.completed, this.state.graph1.total_referred - this.state.graph1.completed],
            backgroundColor: [
            '#63cfc4', '#fcf39f'
            ],
            hoverBackgroundColor: [
            '#63cfc4', '#fcf39f'
            ]
          }],
          text: '20%'
        };

      }

        return (
            <React.Fragment>
                <HeaderContainer />
                <div className="container-fluid">
                    <div className="row">
                        <DoctorSideMenu/>
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                        
                            <div className="page-heading">
                              <div className="page-heading__title-container">
                                  <h1 className="page-heading__title">Report</h1>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label className="dashboard-text">Appointments ({this.state.totalAppointment})</label>
                                <Doughnut 
                                  data={dataA}
                                    options={{
                                      responsive: true,
                                      maintainAspectRatio: true,
                                      legend: {
                                        position: "right",
                                        fullWidth: true,
                                        labels: {
                                            fontColor: '#b66dff'
                                        }
                                      }
                                    }}
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="dashboard-text">Referred ({this.state.totalReferred})</label>
                                <Doughnut 
                                  data={dataR}
                                    options={{
                                      responsive: true,
                                      maintainAspectRatio: true,
                                      legend: {
                                        position: "right",
                                        fullWidth: true,
                                        labels: {
                                            fontColor: '#b66dff'
                                        }
                                      }
                                    }}
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
   // console.log('patientsList',patientsList)
   const { isUserNotValid } = state.headerReducer;
    return {
        isUserNotValid
    };
}
const connectedReport = connect(mapStateToProps)(Report);
export { connectedReport as Report };
