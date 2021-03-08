import axios from 'axios'; 
import { configConstants } from '../_constants';
// import { AsyncStorage } from 'react-native';
import jwtdecode from 'jwt-decode'

/**
 * doctor
 *
 * @subpackage             doctor
 * @category               Service
 * @DateOfCreation         06 march 2020
 * @ShortDescription       This is responsible for calling API
 */
export const doctorService = {
    getSpecialization,
    getDoctorsBySpecialization,
    getDoctorsDetail,
    bookDoctorAppointment,
    myDoctorAppointment,
    cancleMyDoctorAppointment,
    doctorAppointmentList,
    cancleByDoctorAppointment,
    uploadPrescription,
    completeAppointment,
    getDoctorReferrals,
    getDoctorReferred,
    referToDoctor,
    DoctorRemove
};



/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getSpecialization(url) {
    console.log(axios.defaults.headers.common['Authorization'])
    // console.log(configConstants.API_BASE_PATH +  '/auth/categories')
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/auth/categories',
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getDoctorsBySpecialization(url) {
    // console.log(axios.defaults.headers.common['Authorization'])
    // console.log(configConstants.API_BASE_PATH +  '/doctor/getdoctorsbyspecialization?' + url)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/getdoctorsbyspecialization?' + url,
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getDoctorsDetail(url) {
    console.log(configConstants.API_BASE_PATH +  '/doctor/' + url)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/' + url
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function bookDoctorAppointment(data) {
    // console.log(configConstants.API_BASE_PATH +  '/patient/bookAppointment')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/patient/bookAppointment',
        data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function myDoctorAppointment() {
    let userToken;
    let patient_id = '';
    userToken = null;
    // try {
    //     userToken = await AsyncStorage.getItem('userToken');
    //     patient_id = jwtdecode(userToken).patient_id
    // } catch(e) {
    //     console.log(e);
    // }
    console.log(configConstants.API_BASE_PATH +  '/patient/appointments/' + patient_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/patient/appointments/' + patient_id
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function cancleMyDoctorAppointment(data) {
    // console.log(configConstants.API_BASE_PATH +  '/patient/appointments/',data)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/patient/appointments/'+data,
        data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doctorAppointmentList(data, doc_id) {
    // console.log(configConstants.API_BASE_PATH +  '/doctor/appointmentlist/' + doc_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/doctor/appointmentlist/' + doc_id,
        data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function cancleByDoctorAppointment(data) {
    console.log(configConstants.API_BASE_PATH +  '/doctor/cancelappointments/',data)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/cancelappointments/'+data,
        // data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function uploadPrescription(data, url) {
    // console.log(axios.defaults.headers.common['Authorization']).  
    console.log(configConstants.API_BASE_PATH + url)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + url,
        data    : data,
        
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getDoctorReferrals(data) {
    let doc_id = '';
    let userToken = null;
    // try {
    //     userToken = await AsyncStorage.getItem('userToken');
    //     console.log(jwtdecode(userToken))
    //     doc_id = jwtdecode(userToken).doc_id
    // } catch(e) {
    //     console.log(e);
    // }
    console.log(configConstants.API_BASE_PATH +  '/doctor/getrefferedtome/' + doc_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/getrefferedtome/' + doc_id,
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getDoctorReferred(data) {
    let doc_id = '';
    let userToken = null;
    // try {
    //     userToken = await AsyncStorage.getItem('userToken');
    //     console.log(jwtdecode(userToken))
    //     doc_id = jwtdecode(userToken).doc_id
    // } catch(e) {
    //     console.log(e);
    // }

    console.log(configConstants.API_BASE_PATH +  '/doctor/getrefferedbyme/' + doc_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/getrefferedbyme/' + doc_id,
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function referToDoctor(data) {
    console.log(configConstants.API_BASE_PATH +  '/doctor/refer')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/doctor/refer',
        data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function completeAppointment(id) {
    console.log(configConstants.API_BASE_PATH +  '/doctor/completeappointment/'+ id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/doctor/completeappointment/' + id
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function DoctorRemove(user_id) {
    console.log(configConstants.API_BASE_PATH +  '/admin/deleteDoctor/'+ user_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/admin/deleteDoctor/' + user_id
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}