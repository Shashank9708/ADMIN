import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import { doctorActions, headerActions } from '../../_actions';
import { Doughnut } from 'react-chartjs-2';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import './ClinicReport.scss';
import Table from 'react-bootstrap/Table';
import ReactTable from 'react-table-v6';

class ClinicReport extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);

        this.state = this.initialState;
    }

    get initialState() {
        return {
            Clinic: '',


        }
    }


    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to redirect unauthorise users
     * @return                Redirect
     */
    componentDidUpdate() {
        const { dispatch } = this.props;
        if (this.props.isUserNotValid) {
            dispatch(headerActions.logout());
        }
    }


    render() {

        return (
            <React.Fragment>
                <HeaderContainer />
                <div className="container-fluid">
                    <div className="row">
                        <DoctorSideMenu />
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">

                            <div className="page-heading">
                                <div className="page-heading__title-container">
                                    <h1 className="page-heading__title">Clinic Report</h1>
                                </div>
                            </div>
                            {/* 1st Row Start */}
                            <div className="row">
                                <div className="col-md-4">
                                    <div className={'form-group'}>
                                        <Select
                                            placeholder="Select Clinic"
                                            options={[
                                                { label: 'CHL', value: 'CHL' },
                                                { label: 'Greater Kailash', value: 'Greater kailash' },
                                                { label: 'City Life', value: 'City Life' }
                                            ]}
                                            name='council_id'
                                            className="common-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="">
                                        <input name="clinic-fee" type="text" className="form-control" placeholder="Clinic fee" />
                                    </div>
                                </div>
                                <div className="col-md-4">

                                </div>
                                <div className="col-md-4">
                                </div>
                            </div>
                            {/* 1st Row End  */}

                            {/* 2nd Row Start */}
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="">
                                            <div className="report-card report-card-type-orange">
                                                <div className="report-card__heading">Collection</div>
                                                <div className="report-card__value">Rs. 5000</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="">
                                            <div className="report-card report-card-type-dark-green">
                                                <div className="report-card__heading">Completed Appoinment</div>
                                                <div className="report-card__value">20</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="">
                                            <div className="report-card report-card-type-red">
                                                <div className="report-card__heading">Cancel Appoinment</div>
                                                <div className="report-card__value">5</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="">
                                            <div className="report-card report-card-type-green">
                                                <div className="report-card__heading">New Patient</div>
                                                <div className="report-card__value">5</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 2nd Row End  */}

                            {/* 3rd Row Start */}
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="page-heading__title mt-3 mb-3">Appoinment Details</h1>
                                </div>
                            </div>
                            {/* 3rd Row Start */}
                            
                            {/* 4th Row Start */}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            Data Table Here
                                        </div>
                                    </div>                                
                                
                                </div>
                            </div>
                            {/* 4th Row Start */}                            
                            
                            
                            {/* 5th Row Start */}
                            <div className="row">
                                <div className="col-md-6">
                                    <h1 className="page-heading__title mt-3 mb-3">Clinic Balance Report</h1>
                                </div>
                            </div>
                            {/* 5th Row Start */}
                            
                            
                            {/* 6th Row Start */}
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="clinic-balance-repor-card">
                                                <Table bordered size="sm">
                                                  <tbody>
                                                    <tr>
                                                      <td>Opening Balance</td>
                                                      <td><input name="OpeningBalance" type="text" className="form-control" placeholder="Rs." /></td>
                                                    </tr>
                                                    <tr>
                                                      <td>Purchase Amount</td>
                                                      <td><input name="PurchaseAmount" type="text" className="form-control" placeholder="Rs." /></td>
                                                    </tr>
                                                    <tr>
                                                      <td>Closing Balance</td>
                                                      <td><input name="ClosingBalance" type="text" className="form-control" placeholder="Rs." /></td>
                                                    </tr>
                                                    <tr>
                                                      <td>Total</td>
                                                      <td><input name="Total" type="text" className="form-control" placeholder="Rs." /></td>
                                                    </tr>                                                
                                                  </tbody>
                                                </Table>
                                                <div className="text-center">
                                                    <button className="btn-sm mr-2">Save</button> 
                                                    <button className="btn-sm">Cancel</button>
                                                </div>                                                

                                            </div>
                                        </div>
                                    </div>                                 
                                </div>
                                <div className="col-md-7">
                                    <div className="card">
                                        <div className="card-body">
                                            Data Table Here
                                        </div>
                                    </div>                                   
                                </div>                                
                            </div>
                            {/* 6th Row Start */}                            


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
