/**
 * App
 *
 * @package                ARKAdmin
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
import axios from "axios";
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

const DoctorContainer = Loadable({
    loader: () => import('../components/Doctor').then(object => object.DoctorContainer),
    loading: Loading
});

const SpecializationContainer = Loadable({
    loader: () => import('../components/Specialization').then(object => object.SpecializationContainer),
    loading: Loading
});

const AppointmentsContainer = Loadable({
    loader: () => import('../components/Appointments').then(object => object.AppointmentsContainer),
    loading: Loading
});

const ReferredContainer = Loadable({
    loader: () => import('../components/Referred').then(object => object.ReferredContainer),
    loading: Loading
});

const HealthTipsContainer = Loadable({
    loader: () => import('../components/HealthTips').then(object => object.HealthTipsContainer),
    loading: Loading
});

const MedicalStoresContainer = Loadable({
    loader: () => import('../components/MedicalStores').then(object => object.MedicalStoresContainer),
    loading: Loading
});

const PathologyCentersContainer = Loadable({
    loader: () => import('../components/PathologyCenters').then(object => object.PathologyCentersContainer),
    loading: Loading
});

const HealthTipsCategoriesContainer = Loadable({
    loader: () => import('../components/HealthTipsCategories').then(object => object.HealthTipsCategoriesContainer),
    loading: Loading
});

const HealthProblemContainer = Loadable({
    loader: () => import('../components/HealthProblem').then(object => object.HealthProblemContainer),
    loading: Loading
});

const CouncilContainer = Loadable({
    loader: () => import('../components/Council').then(object => object.CouncilContainer),
    loading: Loading
});

const ProductsCategoriesContainer = Loadable({
    loader: () => import('../components/ProductsCategories').then(object => object.ProductsCategoriesContainer),
    loading: Loading
});

const ProductsContainer = Loadable({
    loader: () => import('../components/Products').then(object => object.ProductsContainer),
    loading: Loading
});

const VendorCategoriesContainer = Loadable({
    loader: () => import('../components/VendorCategories').then(object => object.VendorCategoriesContainer),
    loading: Loading
});

const PlanContainer = Loadable({
    loader: () => import('../components/Plan').then(object => object.PlanContainer),
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

const DoctorRoute = Loadable({
    loader: () => import('./DoctorRoute').then(object => object.DoctorRoute),
    loading: Loading
});

const DoctorDashboard = Loadable({
    loader: () => import('../doctor/Dashboard').then(object => object.DoctorDashboard),
    loading: Loading
});

const UpcomingAppointments = Loadable({
    loader: () => import('../doctor/UpcomingAppointments').then(object => object.UpcomingAppointments),
    loading: Loading
});

const MyPatient = Loadable({
    loader: () => import('../doctor/MyPatient').then(object => object.MyPatient),
    loading: Loading
});

const ReferredDoctor = Loadable({
    loader: () => import('../doctor/ReferredDoctor').then(object => object.ReferredDoctor),
    loading: Loading
});

const ReferralDoctor = Loadable({
    loader: () => import('../doctor/ReferralDoctor').then(object => object.ReferralDoctor),
    loading: Loading
});

const FavoriteDoctor = Loadable({
    loader: () => import('../doctor/FavoriteDoctor').then(object => object.FavoriteDoctor),
    loading: Loading
});

const ViewProfile = Loadable({
    loader: () => import('../doctor/ViewProfile').then(object => object.ViewProfile),
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
        (function () {
             const token = localStorage.getItem("accessToken");
             if (token) {
              axios.defaults.headers.common["Authorization"] = token;
             } else {
              axios.defaults.headers.common["Authorization"] = null;
              /*if setting null does not remove `Authorization` header then try     
                      delete axios.defaults.headers.common['Authorization'];
              */
             }
            })();
        return (
            <Router basename={process.env.BASENAME} >
                { this.props.checked &&
                    <Switch>
                        <Route exact path='/' component={LoginContainer} />
                        <Route exact path='/forgotpassword' component={ForgotPasswordContainer} />
                        <Route exact path='/privacy-policy' component={PrivacyPolicy} />

                        <AdminRoute exact path='/dashboard' component={Dashboard} authenticated={this.props.authenticated} allowuser={[0]}/>
                        <AdminRoute exact path='/users' component={UserContainer} authenticated={this.props.authenticated} allowuser={[0]} />
                        <AdminRoute exact path='/doctors' component={DoctorContainer} authenticated={this.props.authenticated} allowuser={[0]} />
                        <AdminRoute exact path='/doctor-categories' component={SpecializationContainer} authenticated={this.props.authenticated} allowuser={[0]} />
                        <AdminRoute exact path='/appointments' component={AppointmentsContainer} authenticated={this.props.authenticated} allowuser={[0]} />
                        <AdminRoute exact path='/referred' component={ReferredContainer} authenticated={this.props.authenticated} allowuser={[0]} />
                        <AdminRoute exact path='/health-tips' component={HealthTipsContainer} authenticated={this.props.authenticated} allowuser={[0, 1]} />
                        <AdminRoute exact path='/health-tips-categories' component={HealthTipsCategoriesContainer} authenticated={this.props.authenticated} allowuser={[0, 1]} />
                        <AdminRoute exact path='/medical-store' component={MedicalStoresContainer} authenticated={this.props.authenticated} allowuser={[0]} />
                        <AdminRoute exact path='/pathology-center' component={PathologyCentersContainer} authenticated={this.props.authenticated} allowuser={[0]} />
                        <AdminRoute exact path='/health-problem' component={HealthProblemContainer} authenticated={this.props.authenticated} allowuser={[0]} />
                        <AdminRoute exact path='/council' component={CouncilContainer} authenticated={this.props.authenticated} allowuser={[0]} />
                        
                        <AdminRoute exact path='/product-categories' component={ProductsCategoriesContainer} authenticated={this.props.authenticated} allowuser={[0, 1]} />
                        <AdminRoute exact path='/product' component={ProductsContainer} authenticated={this.props.authenticated} allowuser={[0, 1]} />
                        <AdminRoute exact path='/vendor-categories' component={VendorCategoriesContainer} authenticated={this.props.authenticated} allowuser={[0, 1]} />
                        <AdminRoute exact path='/plan' component={PlanContainer} authenticated={this.props.authenticated} allowuser={[0, 1]} />

                        <DoctorRoute exact path='/ddashboard' component={DoctorDashboard} authenticated={this.props.authenticated} allowuser={[1]} />
                        <DoctorRoute exact path='/upcoming-appointments' component={UpcomingAppointments} authenticated={this.props.authenticated} allowuser={[1]} />
                        <DoctorRoute exact path='/my-patients' component={MyPatient} authenticated={this.props.authenticated} allowuser={[1]} />
                        <DoctorRoute exact path='/doctor-referred' component={ReferredDoctor} authenticated={this.props.authenticated} allowuser={[1]} />
                        <DoctorRoute exact path='/doctor-referral' component={ReferralDoctor} authenticated={this.props.authenticated} allowuser={[1]} />
                        <DoctorRoute exact path='/doctor-favorite' component={FavoriteDoctor} authenticated={this.props.authenticated} allowuser={[1]} />
                        <DoctorRoute exact path='/doctor-profile' component={ViewProfile} authenticated={this.props.authenticated} allowuser={[1]} />



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