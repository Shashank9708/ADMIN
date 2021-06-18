import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import { doctorActions, headerActions } from '../../_actions';
import { Doughnut } from 'react-chartjs-2';


class ClinicReport extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            Clinic: ''
        }
    }


    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to redirect unauthorise users
     * @return                Redirect
     */
    componentDidUpdate(){
        const { dispatch }  = this.props;
        if(this.props.isUserNotValid){
           dispatch(headerActions.logout());
        }
    }


    render() {
     
        return (
            <React.Fragment>
                <HeaderContainer />
                <div className="container-fluid">
                    <div className="row">
                        <DoctorSideMenu/>
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                        
                            <div className="page-heading">
                              <div className="page-heading__title-container">
                                  <h1 className="page-heading__title">Clinic Report</h1>
                              </div>
                            </div>
                            <div className="row">
                              
                            </div> 
                        </main>
                    </div>
                </div>    
            </React.Fragment>
        );
    }
}
/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for notification list
 * @return                notification list and loader
 */

function mapStateToProps(state) {
   // console.log('patientsList',patientsList)
   const { isUserNotValid } = state.headerReducer;
    return {
        isUserNotValid
    };
}
const connectedClinicReport = connect(mapStateToProps)(ClinicReport);
export { connectedClinicReport as ClinicReport };
