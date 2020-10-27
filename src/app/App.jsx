/**
 * App
 *
 * @package                TruckAdmin
 * @subpackage             App
 * @category               Component
 * @DateOfCreation         17 July 2018
 * @ShortDescription       This is the parent most component for full app
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { createBrowserHistory } from "history";

// import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.css';
import "../assets/css/style.css";


const browserHistory = createBrowserHistory();

const Loading = () =>
    <div className="showbox">
      <div className="loader">
        <svg className="circular" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
        </svg>
      </div>
    </div>
;

const LoginContainer = Loadable({
    loader: () => import('../components/Login').then(object => object.LoginContainer),
    loading: Loading
});

const ForgotPasswordContainer = Loadable({
    loader: () => import('../components/ForgotPassword').then(object => object.ForgotPasswordContainer),
    loading: Loading
});

const Dashboard = Loadable({
    loader: () => import('../components/Dashboard').then(object => object.Dashboard),
    loading: Loading
});


//Master
const UserContainer = Loadable({
    loader: () => import('../components/User').then(object => object.UserContainer),
    loading: Loading
});


const SettingContainer = Loadable({
    loader: () => import('../components/Setting').then(object => object.SettingContainer),
    loading: Loading
});


const AdminRoute = Loadable({
    loader: () => import('./AdminRoute').then(object => object.AdminRoute),
    loading: Loading
});

const SendNotificationContainer = Loadable({
    loader: () => import('../components/SendNotification').then(object => object.SendNotificationContainer),
    loading: Loading
});

//Privacy Policy url
const PrivacyPolicy = Loadable({
    loader: () => import('../components/Privacy').then(object => object.PrivacyPolicy),
    loading: Loading
});


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router basename={process.env.BASENAME} >
                { this.props.checked &&
                    <Switch>
                        <Route exact path='/' component={LoginContainer} />
                        <Route exact path='/forgotpassword' component={ForgotPasswordContainer} />
                        <Route exact path='/privacy-policy' component={PrivacyPolicy} />

                        <Route exact path='/dashboard' component={Dashboard} authenticated={this.props.authenticated} allowuser={[0]}/>
                        <AdminRoute exact path='/users' component={UserContainer} authenticated={this.props.authenticated} allowuser={[0]} />

                        {/*<AdminRoute exact path='/dashboard' component={Dashboard} authenticated={this.props.authenticated} allowuser={[0]} />
                        <AdminRoute exact path='/operator' component={StaffContainer} authenticated={this.props.authenticated} allowuser={['admin']} />
                        
                        <AdminRoute exact path='/driver' component={DriverContainer} authenticated={this.props.authenticated} allowuser={['admin', 'operator']} />
                        <AdminRoute exact path='/live-map' component={LiveMapContainer} authenticated={this.props.authenticated} allowuser={['admin', 'operator']} />
                        <AdminRoute exact path='/energy-map' component={EnergyMapContainer} authenticated={this.props.authenticated} allowuser={['admin', 'operator']} />
                        <AdminRoute exact path='/trip' component={TripContainer} authenticated={this.props.authenticated} allowuser={['admin', 'operator']} />
                        <AdminRoute exact path='/chat-user' component={ChatsContainer} authenticated={this.props.authenticated} allowuser={['admin', 'operator']} />
                        <AdminRoute exact path='/chat-driver' component={ChatTruckContainer} authenticated={this.props.authenticated} allowuser={['admin', 'operator']} />
                        <AdminRoute exact path='/setting' component={SettingContainer} authenticated={this.props.authenticated} allowuser={['admin', 'operator']} />
                        <AdminRoute exact path='/activity' component={ActivityContainer} authenticated={this.props.authenticated} allowuser={['admin', 'operator']} />
                        <AdminRoute exact path='/compliance' component={ComplaintsContainer} authenticated={this.props.authenticated} allowuser={['admin', 'operator']} />
                        <AdminRoute exact path='/manager' component={Manager} authenticated={this.props.authenticated} allowuser={['admin', 'operator']} />
                        <AdminRoute exact path='/profile' component={ViewProfile} authenticated={this.props.authenticated} allowuser={['admin', 'operator']} />
                        */}
                    </Switch>
                }
            </Router>
        );
    }
}

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

// Connection with State
const connectedApp = connect(mapState)(App);
export { connectedApp as App };