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
        <section class="sidemenu-part">
            <div className="container-fluid">
            <div className="=row">      
                <div className="sidebar">
                <ul className="box">
                    <li><Link className="button" to="/dashboard">Dash Board</Link></li>
                    <li><Link className="button" to="/users">Users</Link></li>
                    <li><Link className="button" to="/doctors">Doctor</Link></li>
                    <li><Link className="button" to="/appointments">Appointments</Link></li>
                    <li><Link className="button" to="/categories">Categories</Link></li>
                    <li><Link className="button" to="/medicalstores">Medical Stores</Link></li>
                    <li><Link className="button" to="/orders">Orders</Link></li>
                    <li><Link className="button" to="/transaction">Transactions</Link></li>
                    <li><Link className="button" to="/pathologycenters">Pathology Centers</Link></li>
                    <li><Link className="button" to="/healthtips">Health Tips</Link></li>
                    <li><Link className="button" to="/about">Best deals in tows</Link></li>
                    <li><Link className="button" to="/products">Invitations Sends</Link></li>
                    <li><Link className="button" to="/home">Notifications</Link></li>
                    <li><Link className="button" to="/about">Promotional Activity</Link></li>
                    <li><Link className="button" to="/products">Patient Notifications</Link></li>
                    <li><Link className="button" to="/products">Registration Request</Link></li>
        
                </ul>
                </div>       
                
            </div>
            </div>
        </section>
        
      );
    }
}
