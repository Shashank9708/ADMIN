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
        <React.Fragment>
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="sidebar-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item"><Link className="nav-link" to="/ddashboard"> <i className="fa fa-home" aria-hidden="true"></i> Dashboard</Link></li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="doctorAppointments" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-address-book" aria-hidden="true"></i> Appointments
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="doctorAppointments">
                              <Link className="dropdown-item" to="/upcoming-appointments"> <i className="fa fa-address-book" aria-hidden="true"></i> Today's Appointments</Link>
                              <div className="dropdown-divider"></div>
                              <Link className="dropdown-item" to="/all-appointments"> <i className="fa fa-address-book" aria-hidden="true"></i> All Appointments</Link>
                            </div>
                        </li>                         
                        
                        <li className="nav-item"><Link className="nav-link" to="/my-patients"><i className="fa fa-stethoscope" aria-hidden="true"></i> My Patients</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/doctor-referral"><i className="fa fa-share-alt" aria-hidden="true"></i> Referral Patients</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/doctor-referred"><i className="fa fa-handshake" aria-hidden="true"></i> Referred Patients</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/doctor-favorite"><i className="fa fa-user-md" aria-hidden="true"></i> Colleagues</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/doctor-profile"><i className="fa fa-user" aria-hidden="true"></i> Profile</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/manage-calendar"><i className="fa fa-calendar" aria-hidden="true"></i> Manage Calendar</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/ddashboard"><i className="fa fa-medkit" aria-hidden="true"></i> Health Tips</Link></li>
                        
                       
                        
                    </ul>
                </div>
            </nav>    
        </React.Fragment>
      );
    }
}
