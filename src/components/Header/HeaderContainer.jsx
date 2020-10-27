import React from 'react';
import { connect } from 'react-redux';
// import 'react-select/dist/react-select.css';
import { Header } from './Header'
import { headerActions } from '../../_actions';
import { utilityHelper } from '../../_helpers';

/**
 * HeaderContainer
 *
 * @package                TruckAdmin
 * @subpackage             HeaderContainer
 * @category               Container Component
 * @DateOfCreation         22 May 2018
 * @ShortDescription       This component is reponsible for logic in header
 */
class HeaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        
        // Bind the events to the current class
        this.handle_logout = this.handle_logout.bind(this);
        this.handle_profile = this.handle_profile.bind(this);
    }

    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to handle the logout event
    * @return                Nothing
    */
    handle_logout() { 
        utilityHelper.doLogout()
    }

    handle_profile() { 
        
    }

    
        
    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to show header
    * @return                View
    */
    render() {
        return (
            <div >    
                <Header 
                    handle_logout = {this.handle_logout}
                    handle_profile = {this.handle_profile}
                    logged_in_user_name = { this.props.user.name }
                    user_image = { this.props.user.user_image }
                />
            </div>
        );
    }
}

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { is_logout_done, success_message, error_message } = state.headerReducer;
    return {
        is_logout_done,
        success_message,
        error_message,
        user: state.session.user,
        authenticated: state.session.authenticated
    };
}

// Connection with State 
const connectedHeaderContainer = connect(mapStateToProps)(HeaderContainer);
export { connectedHeaderContainer as HeaderContainer }; 

