import React from 'react';
import {Button} from 'react-bootstrap';
import {HeaderContainer} from '../Header';
import {SideMenu} from '../SideMenu';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
}

  render() {
    return (
        <div className="page-container">
            
            <HeaderContainer />
            <section className="adminpanel">
                <div className="group"> 
                    <button className="buttonone">USERS</button>
                    <button className="buttontwo">DOCTORS</button>
                    <button className="buttonthree">MEDICAL STORES</button>
                    <button className="buttonfour">PATHOLOGY CENTERS</button>
                    <button className="buttonfive">REGISTRATION REQUEST</button>
                    <button className="buttonsix">APPOINTMENTS</button>
                   
                </div>
                <SideMenu />
            </section>  
        </div>
      );
    }
  }
