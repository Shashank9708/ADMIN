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
        <React.Fragment>
          <HeaderContainer />
          <div className="container-fluid">
            <div className="row">
              <DoctorSideMenu />
              <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <div className="row">
                    <div className="page-heading">
                      <div className="page-heading__title-container">
                          <h1 className="page-heading__title">Dashboard</h1>
                      </div>
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
