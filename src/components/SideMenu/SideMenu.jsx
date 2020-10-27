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
        <section>
            <div className="container-fluid">
            <div className="=row">      
                <div className="sidebar">
                <ul className="box">
                    <li><Link className="button" to="/dashboard">Dash Board</Link></li>
                    <li><Link className="button" to="/users">Users</Link></li>
                    <li><Link className="button" to="/doctors">Doctor</Link></li>
                    <li><a className="button" href="/appointments">Appointments</a></li>
                    <li><a className="button" href="/categories">Categories</a></li>
                    <li><a className="button" href="/medicalstores">Medical Stores</a></li>
                    <li><a className="button" href="/orders">Orders</a></li>
                    <li><a className="button" href="/transaction">Transactions</a></li>
                    <li><a className="button" href="/pathologycenters">Pathology Centers</a></li>
                    <li><a className="button" href="/healthtips">Health Tips</a></li>
                    <li><a className="button" href="/about">Best deals in tows</a></li>
                    <li><a className="button" href="/products">Invitations Sends</a></li>
                    <li><a className="button" href="/home">Notifications</a></li>
                    <li><a className="button" href="/about">Promotional Activity</a></li>
                    <li><a className="button" href="/products">Patient Notifications</a></li>
                    <li><a className="button" href="/products">Registration Request</a></li>
        
                </ul>
                </div>       
                
            </div>
            </div>
        </section>
        
      );
    }
}
