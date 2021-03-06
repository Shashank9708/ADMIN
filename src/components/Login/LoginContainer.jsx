import React from 'react';
import { connect } from 'react-redux';
// import 'react-select/dist/react-select.css';
import { Login } from './Login';
import { userLoginActions } from '../../_actions';
import { userLoginValidator } from '../../_validator';
import { utilityHelper } from '../../_helpers';
import { Cookies } from 'react-cookie';
/**
 * LoginContainer
 *
 * @package                ARKAdmin
 * @subpackage             LoginContainer
 * @category               Container Component
 * @DateOfCreation         16 July 2018
 * @ShortDescription       This component is reponsible for logic in Login Page
 */

const cookies = new Cookies();

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                user: {
                    contact_no      : '',
                    password      : '',
                    device_id  : 'FCMToken'
                },
                userValidate: {
                    contact_no      : {isValid: true, message: ''},
                    password      : {isValid: true, message: ''}
                }
            }
        };

        // Bind the events to the current class
        this.handle_input_change = this.handle_input_change.bind(this);
        this.handle_login_submit = this.handle_login_submit.bind(this);
        this.handle_enter_press_submit = this.handle_enter_press_submit.bind(this);
    }

    /**
    * @DateOfCreation        16 July 2018
    * @ShortDescription      This function is responsible to clear the state on load
    * @return                Nothing
    */
    componentDidMount() {
       const { dispatch }  = this.props;
       dispatch(userLoginActions.updateState());
    }

    /**
    * @DateOfCreation        16 July 2018
    * @ShortDescription      This function is responsible to handle changes in input state
    * @param                 Event Object
    * @return                Nothing
    */
    handle_input_change(event) {
        const { name, value }       = event.target;
        const { user }              = this.state.login;
        const { userValidate }      = this.state.login;
        this.setState({
            login : {
                userValidate:{
                    ...userValidate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
                user : {
                    ...user,
                    [name]: value
                }
            }
        });
    }

    /**
    * @DateOfCreation        16 July 2018
    * @ShortDescription      This function is responsible to Submit the login Form with Handle Enter key
    * @return                Nothing
    */
    handle_enter_press_submit(event){
        if(event.key == 'Enter'){
            this.handle_login_submit();
        }
    }

    /**
    * @DateOfCreation        16 July 2018
    * @ShortDescription      This function is responsible to Submit the login Form
    * @return                Nothing
    */
    handle_login_submit() {
        if(userLoginValidator.isLoginValid(this)){
            const { dispatch }  = this.props;
            const { user }      = this.state.login;
            //Call the action function with dispatch
            dispatch(userLoginActions.loginSubmit(user))
            // .then((res)=>{
            //     if(res.status ===200){
            //         if(res.user.role === 0){
            //             this.props.history.push('/dashboard');
            //         }else if(res.user.role === 1){
            //             this.props.history.push('/ddashboard');
            //         }else{
            //             this.props.history.push('/login');
            //         }
            //     }
            // });
        }
    }
    /**
    * @DateOfCreation        16 July 2018
    * @ShortDescription      This function is responsible to check the login is completed or not
    * @return                Redirect
    */

    componentDidUpdate(){
        if(this.props.authenticated && !utilityHelper.isObjectEmpty(this.props.user)){
            var userinfo = this.props.user;
            console.log('userinfo',userinfo)
            // if(userinfo.role === 0){
            //     // console.log('-->>>--',userinfo)
            //     this.props.history.push('/dashboard');
            // }else{
            //     this.props.history.push('/ddashboard');
            // }
            if(userinfo.role === 0){
                this.props.history.push('/home');
            }else if(userinfo.role === 1){
                this.props.history.push('/dashboard');
            }else{
                this.props.history.push('/login');
            }
        }
    }


    /**
    * @DateOfCreation        16 July 2018
    * @ShortDescription      This function is responsible to show Login form
    * @return                View
    */
    render() {
        return (
            <React.Fragment>
                <Login
                    submitted         = {this.props.submitted}
                    error_message       = {this.props.error_message}
                    handle_login_submit = {this.handle_login_submit}
                    handle_input_change = {this.handle_input_change}
                    handle_enter_press_submit = {this.handle_enter_press_submit}
                    payload           = {this.state.login}
                />
            </React.Fragment>
        );
    }
}

/**
* @DateOfCreation        16 July 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { is_login_done, submitted, error_message } = state.userLogin;
    return {
        is_login_done,
        submitted,
        error_message,
        user: state.session.user,
        authenticated: state.session.authenticated
    };
}

// Connection with State
const connectedLoginContainer = connect(mapStateToProps)(LoginContainer);
export { connectedLoginContainer as LoginContainer };