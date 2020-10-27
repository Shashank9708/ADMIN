import React from 'react';

import { Tabs, Tab} from 'react-bootstrap';
import {HeaderContainer} from '../Header';
import {SideMenu} from '../SideMenu';
import {AccountSetting} from './AccountSetting';
import {SchoolDetails} from './SchoolDetails';
import {ChangePassword} from './ChangePassword';

const accountSetting = (
  <h4> Account Setting </h4>
);
const schoolDetails = (
  <h4> School Details </h4>
);
const changePassword = (
  <h4> Change Password </h4>
);


export const Setting = (props) => {
    return(
      <div className="page-container">
          <SideMenu />
          <HeaderContainer />
            <div className="main-content">
              <div className="col-md-12">
                  <div className="wrap-inner-content">
                  <div className="inner-content">
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                      <Tab eventKey={1} title={accountSetting} >
                        <AccountSetting />
                      </Tab>
                      <Tab eventKey={2} title={schoolDetails}>
                        <SchoolDetails />
                      </Tab>
                      <Tab eventKey={3} title={changePassword}>
                        <ChangePassword />
                      </Tab>
                    </Tabs>
                  </div>
              </div>


            </div>
          </div>
      </div>

    );
}
