import React from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-bootstrap';
import {HeaderContainer} from '../Header';
import {DoctorSideMenu} from '../SideMenu';
import { headerActions, commonActions } from '../../_actions';


class DoctorDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { dispatch }  = this.props;
    dispatch(commonActions.getDashboard());
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

  render() {
    const {dashboardList} = this.props
    return (
        <div className="page-container">
            
            <HeaderContainer />
            <div className="container-fluid">
               <div className="row">
                  <div className="sections">
                    <DoctorSideMenu />
                  </div>
                  <div className="">
                    <section className="adminpanel">
                      <div className="group"> 
                          <button className="buttonone">USERS <br/> {dashboardList.userCount || '-'}</button>
                          <button className="buttontwo">DOCTORS <br/> {dashboardList.doctorCount || '-'}</button>
                          <button className="buttonthree">MEDICAL STORES <br/> {dashboardList.medicalCount || '-'}</button>
                          <button className="buttonfour">PATHOLOGY CENTERS <br/> {dashboardList.labCount || '-'}</button>
                          <button className="buttonfive">REGISTRATION REQUEST <br/> {dashboardList.regRequestCount || '-'}</button>
                          <button className="buttonsix">APPOINTMENTS <br/> {dashboardList.appointmentCount || '-'}</button>
                        
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
