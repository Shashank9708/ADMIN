import React from 'react';
import {Link} from 'react-router-dom';
import { utilityHelper } from '../../_helpers';
// import firebase from "firebase";

// const  messaging = firebase.messaging();
export class SideMenu extends React.Component {
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
                        <li className="nav-item"><Link className="nav-link" to="/dashboard"> <i className="fa fa-home" aria-hidden="true"></i> Dashboard</Link></li>
                        
                        <li className="nav-item"><Link className="nav-link" to="/users"><i className="fa fa-home" aria-hidden="true"></i> Users</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/health-problem"><i className="fa fa-home" aria-hidden="true"></i> Health Problems</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/doctor-categories"><i className="fa fa-home" aria-hidden="true"></i> Doctor Categories</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/doctors"><i className="fa fa-home" aria-hidden="true"></i> Doctor</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/council"><i className="fa fa-home" aria-hidden="true"></i> Council</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/appointments"><i className="fa fa-home" aria-hidden="true"></i> Appointments</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/referred"><i className="fa fa-home" aria-hidden="true"></i> Referred Details</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/health-tips-categories"><i className="fa fa-home" aria-hidden="true"></i> Health Tips Categories</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/health-tips"><i className="fa fa-home" aria-hidden="true"></i> Health Tips</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/medical-store"><i className="fa fa-home" aria-hidden="true"></i> Medical Stores</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/medicine-order"><i className="fa fa-home" aria-hidden="true"></i> Medicine Order List</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/pathology-center"><i className="fa fa-home" aria-hidden="true"></i> Pathology Centers</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/plan"><i className="fa fa-home" aria-hidden="true"></i> Plan Management</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/product-categories"><i className="fa fa-home" aria-hidden="true"></i> Product Categories</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/product"><i className="fa fa-home" aria-hidden="true"></i> Products</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/vendor-categories"><i className="fa fa-home" aria-hidden="true"></i> Best Deals Vendor Categories</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#"><i className="fa fa-home" aria-hidden="true"></i> Vendor</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#"><i className="fa fa-home" aria-hidden="true"></i> Invitations Sends</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#"><i className="fa fa-home" aria-hidden="true"></i> Transactions</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#"><i className="fa fa-home" aria-hidden="true"></i> Orders</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#"><i className="fa fa-home" aria-hidden="true"></i> Notifications</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#"><i className="fa fa-home" aria-hidden="true"></i> Promotional Activity</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#"><i className="fa fa-home" aria-hidden="true"></i> Patient Notifications</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#"><i className="fa fa-home" aria-hidden="true"></i> Registration Request</Link></li>
                       
                        
                    </ul>
                </div>
            </nav>    
        </React.Fragment>        
      );
    }
}
