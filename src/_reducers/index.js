import { combineReducers } from 'redux';
import { sessionReducer } from '../_packages/redux-react-session';
import { userLogin } from './userLoginReducer';
import { forgotPass } from './forgotPassReducer';
import { headerReducer } from './headerReducer'; 
import { ImportReducer } from '../components/Import/ImportReducer'; 
import { commonReducer } from './commonReducer'; 
import { staffReducer } from './staffReducer'; 
import { userReducer } from './userReducer'; 
import { driverReducer } from './driverReducer'; 
import { tripReducer } from './tripReducer'; 
import { chatReducer } from './chatReducer'; 
import { viewProfileReducer } from './viewProfileReducer'; 

import { vehicleReducer } from './vehicleReducer'; 
import { LiveMapReducer } from '../components/LiveMap/LiveMapReducer'; 
import { notificationReducer } from './notificationReducer';

const appReducer = combineReducers({
	session: sessionReducer,
	userLogin,
	forgotPass,
	headerReducer,
	ImportReducer,
	commonReducer,
	staffReducer,
	userReducer,
	driverReducer,
	chatReducer,
	tripReducer,
	viewProfileReducer,

	vehicleReducer,
	LiveMapReducer,
	notificationReducer
});

const rootReducer = ( state, action ) => {
	if ( action.type === 'LOGOUT_SUCCESS' ) {
		state = undefined;
	}

	return appReducer(state, action)
}

export default rootReducer;