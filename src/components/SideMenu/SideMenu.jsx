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
        <section className="sidemenu-part">
            <div className="container-fluid">
            <div className="=row">      
                <div className="sidebar">
                <ul className="box">
                    <li><Link className="button" to="/dashboard">DashBoard</Link></li>
                    <li><Link className="button" to="/users">Users</Link></li>
                    <li><Link className="button" to="/doctors">Doctor</Link></li>
                    <li><Link className="button" to="/doctor-categories">Doctor Categories</Link></li>
                    <li><Link className="button" to="/appointments">Appointments</Link></li>
                    <li><Link className="button" to="/referred">Referred Details</Link></li>
                    <li><Link className="button" to="/health-tips-categories">Health Tips Categories</Link></li>
                    <li><Link className="button" to="/health-tips">Health Tips</Link></li>
                    <li><Link className="button" to="/medical-store">Medical Stores</Link></li>
                    <li><Link className="button" to="/pathology-center">Pathology Centers</Link></li>
                    <li><Link className="button" to="/health-problem">Health Problems</Link></li>
                    <li><Link className="button" to="/council">Council</Link></li>

                    <li><Link className="button" to="/product-categories">Product Categories</Link></li>
                    <li><Link className="button" to="/product">Products</Link></li>
                    

                    <li><Link className="button" to="#">Invitations Sends</Link></li>
                    <li><Link className="button" to="#">Transactions</Link></li>
                    
                    <li><Link className="button" to="#">Orders</Link></li>
                    
                    
                    <li><Link className="button" to="#">Best deals in tows</Link></li>
                    
                    <li><Link className="button" to="#">Notifications</Link></li>
                    <li><Link className="button" to="#">Promotional Activity</Link></li>
                    <li><Link className="button" to="#">Patient Notifications</Link></li>
                    <li><Link className="button" to="#">Registration Request</Link></li>
        
                </ul>
                </div>       
                
            </div>
            </div>
        </section>
        
      );
    }
}
