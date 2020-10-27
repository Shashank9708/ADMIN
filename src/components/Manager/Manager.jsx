import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import { headerActions, staffActions } from '../../_actions';
import { utilityHelper } from '../../_helpers';

class Manager extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.state               = this.initialState;
        this.handleInputChange   = this.handleInputChange.bind(this);
        this.handleSave   = this.handleSave.bind(this);
    }

    get initialState() {
        return {
            payload: {
              data:{
                id: '',
                manager_email: '',
                operator_id: ''
              }
            }
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(staffActions.getManagerList());

        var getUserInfo = utilityHelper.getUserInfo();
        const { data }  = this.state.payload;
          this.setState({
              payload : {
                  data : {
                      ...data,
                      operator_id: getUserInfo._id
                  }
              }
          });
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

    handleInputChange(event) {
        const { name, value }       = event.target;
        const { data }  = this.state.payload;
        this.setState({
            payload : {
                data : {
                    ...data,
                    [name]: value
                }
            }
        });
    }
    handleSave(){
      const { data }  = this.state.payload;
      const { dispatch } = this.props;
      dispatch(staffActions.insertManagerList(data));

    }
    componentWillReceiveProps(nextProps){

      if(nextProps.is_Manager_loaded == true){
        
        if(nextProps.managerList.length > 0){
          const { data }  = this.state.payload;
          this.setState({
              payload : {
                  data : {
                      ...data,
                      id: nextProps.managerList[0].id,
                      manager_email: nextProps.managerList[0].manager_email,
                      operator_id: nextProps.managerList[0].operator_id
                  }
              }
          });
        }
      }
    }
    render() {
       
        return (
            <div className="page-container">
            <SideMenu/>
            <HeaderContainer />
            
                <div className="main-content">
                    <div className="wrap-inner-content">
                        <div className="col-md-12">
                          <div className="inner-content">
                                <div className="row page-header">
                                    <div className="col-md-6">
                                        <h1 className="page-title">Manager</h1>
                                    </div>
                                    
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                               
                                    <input type="text" name="manager_email"
                                     value={this.state.payload.data.manager_email}  className="form-control" placeholder="demoemail@email.com" onChange = { this.handleInputChange } />
                                    <label className="control-label">Email</label>
                                  </div>
                                </div>
                                <br />
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <button className="btn text-btn green"
                                     onClick={this.handleSave}>Update</button>
                                  </div>
                                </div>
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
   const { is_Manager_loaded, managerList, isUserNotValid } = state.staffReducer;
    return {
        is_Manager_loaded,
        managerList,
        isUserNotValid
    };
}
const connectedManager = connect(mapStateToProps)(Manager);
export { connectedManager as Manager };