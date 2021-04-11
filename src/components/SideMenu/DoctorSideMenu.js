import React from 'react';
import {Link} from 'react-router-dom';
import { utilityHelper } from '../../_helpers';
// import firebase from "firebase";

// const  messaging = firebase.messaging();
export class DoctorSideMenu extends React.Component {
  /**
   * @DateOfCreation        11 June 2018
   * @ShortDescription      Contructor is responsible to function declaration and define intial state
   * @param                 props
   * @return                Nothing
   */
    constructor(props) {
        super(props);

        this.state = this.initialState;

        //FCM
        // messaging.onMessage(payload => {
        //     var data = payload.data
        //     var json = JSON.parse(data.body)
        //     if(json.user_type == "user"){
        //         this.setState({
        //             usercount: this.state.usercount+1
        //         })
        //     }else{
        //         this.setState({
        //             drivercount: this.state.drivercount+1
        //         })
        //     }
        // });
    }
    
    get initialState() {
        return {
            usercount: 0,
            drivercount: 0,
        }
    }

    render() {

      return (
        <section className="sidemenu-part">
            <div className="container-fluid">
            <div className="=row">      
                <div className="sidebar">
                <ul className="box">
                    <li><Link className="button" to="/ddashboard">DashBoard</Link></li>
                    <li><Link className="button" to="/upcoming-appointments">Upcoming Appointments</Link></li>
                    <li><Link className="button" to="/my-patients">My Patients</Link></li>
                    <li><Link className="button" to="/doctor-referral">Referral Patients</Link></li>
                    <li><Link className="button" to="/doctor-referred">Referred Patients</Link></li>
                    <li><Link className="button" to="/doctor-favorite">Personal Doctor</Link></li>
                    <li><Link className="button" to="/doctor-profile">Profile</Link></li>
                    <li><Link className="button" to="/manage-calendar">Manage Calendar</Link></li>
                    {/*<li><Link className="button" to="/#">Medical History</Link></li>*/}
                    <li><Link className="button" to="/health-tips">Health Tips</Link></li>
                    
                </ul>
                </div>       
                
            </div>
            </div>
        </section>
        
      );
    }
}
