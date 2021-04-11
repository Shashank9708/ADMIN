import React from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import { headerActions, commonActions } from '../../_actions';
import { Doughnut } from 'react-chartjs-2';



class DoctorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      data: {
        datasets: [{
          data: [10, 20, 30],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }],
        labels: [
          'Red',
          'Yellow',
          'Blue'
        ]
      }
    }
  }

  componentDidMount(){
    const { dispatch }  = this.props;
    dispatch(commonActions.getDashboard());
  }

  /**
     * @DateOfCreation        2import { Doughnut } from 'react-chartjs-2';

     6 July 2018
     * @ShortDescription      This function is responsible to redirect unauthorise users
     * @return                Redirect
     */
    componentDidUpdate(){
      const { dispatch }  = this.props;
      if(this.props.isUserNotValid){
         dispatch(headerActions.logout());
      }
  }

  render() {
    const {dashboardList} = this.props
    var data = {}
    var dataP = {}
    var dataD = {}
    var dataM = {}
    var dataL = {}
    if(dashboardList){
      var total =  dashboardList.userCount + dashboardList.doctorCount + dashboardList.medicalCount + dashboardList.labCount
      data = {
          labels: [
            'PATIENTS',
            'DOCTORS',
            'MEDICAL STORES',
            'PATHOLOGY',
          ],
          datasets: [{
            data: [dashboardList.userCount, dashboardList.doctorCount, dashboardList.medicalCount, dashboardList.labCount],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#d68274'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#d68274'
            ]
          }],
          text: '20%'
        };
      dataP = {
          labels: [
            'PATIENTS',
            'ALL'
          ],
          datasets: [{
            data: [dashboardList.userCount, 500000 - dashboardList.userCount],
            backgroundColor: [
            '#FF6384',
            '#FFFFFF'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB'
            ]
          }],
          text: '20%'
        }; 
      dataD = {
          labels: [
            'DOCTORS',
            'ALL'
          ],
          datasets: [{
            data: [dashboardList.doctorCount, 40000 - dashboardList.doctorCount],
            backgroundColor: [
            '#36A2EB',
            '#FFFFFF'
            ],
            hoverBackgroundColor: [
            '#36A2EB',
            '#FFCE56'
            ]
          }],
          text: '20%'
        };
      dataM = {
          labels: [
            'MEDICAL STORES',
            'ALL',
          ],
          datasets: [{
            data: [dashboardList.medicalCount, 40000 - dashboardList.medicalCount],
            backgroundColor: [
            '#FFCE56',
            '#FFFFFF'
            ],
            hoverBackgroundColor: [
            '#FFCE56',
            '#d68274'
            ]
          }],
          text: '20%'
        };
      dataL = {
          labels: [
            'PATHOLOGY',
            'ALL'
          ],
          datasets: [{
            data: [dashboardList.labCount, 40000 - dashboardList.labCount],
            backgroundColor: [
            '#d68274',
            '#FFFFFF'
            ],
            hoverBackgroundColor: [
            '#d68274',
            '#FFCE56'
            ]
          }],
          text: '20%'
        };
    }
    
    return (
        <div className="page-container main-panel">
            
            <HeaderContainer />
            <div className="container-fluid content-wrapper">
                <div className="row">
                    <div className="col-md-2.5">
                      <DoctorSideMenu />
                    </div>
                    
                    <div className="col-md-9">
                      <section className="adminpanel">
                        <div class="group row">
                          <div class="col-md-4 stretch-card grid-margin">
                            <div class="card bg-gradient-danger card-img-holder text-white">
                              <div class="card-body">
                                <img src="src/assets/images/circle.svg" class="card-img-absolute" alt="circle-image" />
                                <h4 class="font-weight-normal mb-3">Upcoming appointments <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{dashboardList.userCount || '-'}</h2>
                                
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4 stretch-card grid-margin">
                            <div class="card bg-gradient-info card-img-holder text-white">
                              <div class="card-body">
                                <img src="src/assets/images/circle.svg" class="card-img-absolute" alt="circle-image" />
                                <h4 class="font-weight-normal mb-3">Referrals <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{dashboardList.doctorCount || '-'}</h2>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="row">
                          {/*<div className="col-md-12">
                            <label className="dashboard-text">ALL USERS</label>
                            <Doughnut 
                              data={data}
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
                            <label className="dashboard-text">PATIENTS</label>
                            <Doughnut 
                              data={dataP}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: true,
                                  legend: {
                                    position: "right",
                                    labels: {
                                        fontColor: '#b66dff'
                                    }
                                  }
                                }}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="dashboard-text">DOCTORS</label>
                            <Doughnut 
                              data={dataD}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: true,
                                  legend: {
                                    position: "right",
                                    labels: {
                                        fontColor: '#b66dff'
                                    }
                                  }
                                }}
                            />
                          </div>  
                          <div className="col-md-6">
                            <label className="dashboard-text">MEDICAL</label>
                            <Doughnut 
                              data={dataM}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: true,
                                  legend: {
                                    position: "right",
                                    labels: {
                                        fontColor: '#b66dff'
                                    }
                                  }
                                }}
                            />
                          </div>  
                          <div className="col-md-6">
                            <label className="dashboard-text">PATHOLOGY</label>
                            <Doughnut 
                              data={dataL}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: true,
                                  legend: {
                                    position: "right",
                                    labels: {
                                        fontColor: '#b66dff'
                                    }
                                  }
                                }}
                            />
                          </div>*/}  
                        </div>
                      </section> 
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
  const { dashboardList, loader, isUserNotValid } = state.commonReducer;
  // console.log('====',dashboardList)
   return {
       dashboardList,
       isUserNotValid,
       loader,
   };
}
const connectedDoctorDashboard = connect(mapStateToProps)(DoctorDashboard);
export { connectedDoctorDashboard as DoctorDashboard };
