import React from 'react';
import { connect } from 'react-redux';
import { HeaderContainer } from '../../components/Header';
import { DoctorSideMenu } from '../../components/SideMenu';
import { headerActions, commonActions } from '../../_actions';

import { format, subHours, startOfMonth } from 'date-fns';




class DoctorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      currentMonth: startOfMonth(new Date())

    }

    this.handleChange = this.handleChange.bind(this);

    
  }

  componentDidMount(){
    const { dispatch }  = this.props;
    dispatch(commonActions.getDashboard());
  }

  /**
     * @DateOfCreation        2import { Doughnut } from 'react-chartjs-2';

     6 July 2018
     * @ShortDescription      This function is responsible to redirect unauthorise users
     * @return                Redirect
     */
    componentDidUpdate(){
      const { dispatch }  = this.props;
      if(this.props.isUserNotValid){
         dispatch(headerActions.logout());
      }
  }

  handleChange (date){
    this.setState({currentMonth: startOfMonth(date)})
  }

  render() {
    const {dashboardList} = this.props
    

    
    return (
        <React.Fragment>
          <HeaderContainer />
          <div className="container-fluid">
            <div className="row">
              <DoctorSideMenu />
              <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <div className="row">
                    <div className="page-heading">
                      <div className="page-heading__title-container">
                          <h1 className="page-heading__title">Dashboard</h1>
                      </div>
                    </div>
                  


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
 * @ShortDescription      connect state to props on reducer and get state for user list
 * @return                user list and loader
 */

function mapStateToProps(state) {
  const { dashboardList, loader, isUserNotValid } = state.commonReducer;
  // console.log('====',dashboardList)
   return {
       dashboardList,
       isUserNotValid,
       loader,
   };
}
const connectedDoctorDashboard = connect(mapStateToProps)(DoctorDashboard);
export { connectedDoctorDashboard as DoctorDashboard };
