import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { sessionService } from './_packages/redux-react-session';
import { store } from './_helpers';
import { App } from './app';

// import firebase from "firebase";
// import { initializePush } from './push-notification';

var config = {
   // messagingSenderId: "674925598222"
};


// Init the session service
const options = { driver: 'COOKIES'};
sessionService.initSessionService(store, options);

ReactDOM.render((  
    <Provider store={store}>
        <App />
    </Provider>

), document.getElementById('index'));
// firebase.initializeApp(config);
// initializePush();