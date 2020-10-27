import React from 'react';

import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import { headerActions, tripActions } from '../../_actions';
import { Complaint } from './Complaint';
import { Liability } from './Liability';

const complaintList = (
  <h4> Compliance </h4>
);
const liability = (
  <h4> Liability </h4>
);


class Complaints extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.state               = this.initialState;
        this.statusShowHandle = this.statusShowHandle.bind(this);
    }

    get initialState() {
        return {
           liability: []
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(tripActions.complaintlist());
        dispatch(tripActions.liabilitylist());

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
    componentWillReceiveProps(nextProps) {

      const { dispatch } = this.props;
      if(nextProps.is_liability == true){
        dispatch(tripActions.resetLiability());
        this.setState({ liability:nextProps.liability });
      }
    }
    statusShowHandle(row){
        var data = {"_id": row._id, "liability": 0}
        const { dispatch } = this.props;
        dispatch(tripActions.liability(data));

        var liability = this.state.liability;

        const newCartList = liability.filter(function(x) { 
          if(x._id != row._id){
            return x
          }
        });
        //console.log("=============",newCartList)
        this.setState({
          liability: newCartList,
        })
    }
    
    render() {
       
        return (
            <div className="page-container">
            <SideMenu/>
            <HeaderContainer />
            
              <div className="main-content">
                <div className="col-md-12">
                  <div className="wrap-inner-content">
                    <div className="inner-content">
                        <div className="row">
                            <div className="col-sm-3 col-xs-6">
                                <div className="tile-stats red-bg">
                                    <div className="icon"></div>
                                    <h3>Total Flag</h3>
                                    <div className="num"  data-postfix="" data-duration="1000" data-delay="0">{this.props.complaint.length}</div>
                                </div>
                            </div>
                            <div className="col-sm-3 col-xs-6">
                                <div className="tile-stats green-bg">
                                    <div className="icon"></div>
                                    <h3>Liability</h3>
                                    <div className="num" data-postfix="" data-duration="1000" data-delay="500">{this.state.liability.length}</div>
                                </div>
                            </div>
                        </div>
                      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title={complaintList} >
                          <Complaint 
                            complaint = {this.props.complaint}
                          />
                        </Tab>
                        <Tab eventKey={2} title={liability}>
                          <Liability
                            liabilitylist = {this.state.liability}
                            statusShowHandle = {this.statusShowHandle}
                          />
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for staff list
 * @return                staff list and loader
 */

function mapStateToProps(state) {
   const { complaint, isUserNotValid, liability, is_liability } = state.tripReducer;
   
    return {
        complaint,
        isUserNotValid,
        liability,
        is_liability
    };
}
const connectedComplaints = connect(mapStateToProps)(Complaints);
export { connectedComplaints as Complaints };