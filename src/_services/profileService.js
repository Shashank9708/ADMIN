import axios from 'axios'; 
import { configConstants } from '../_constants';
// import { AsyncStorage } from 'react-native';
import jwtdecode from 'jwt-decode'
/**
 * fixture
 *
 * @subpackage             fixture
 * @category               Service
 * @DateOfCreation         06 march 2020
 * @ShortDescription       This is responsible for calling API
 */
export const profileService = {
    updateSOS,
    updateProfilePic,
    getDoctorProfile,
    getPatientProfile,
    uploadPic,
    getCouncil,
    getWallet,
    getWalletHistory,
    sendOTP,
    verifyOTP,
};

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function updateSOS(data) {
    // console.log(configConstants.API_BASE_PATH + '/patient/updatesos/' + data.patient_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/patient/updatesos/' + data.patient_id,
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
function updateProfilePic(data) {

    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/editDoctorInformation',
        data    : data,
        // headers : {
        //     'Content-Type': 'multipart/form-data'
        // }
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
function getDoctorProfile() {
    let doc_id = JSON.parse(localStorage.user).doc_id
    // console.log(configConstants.API_BASE_PATH + '/doctor/complete-profile/'+doc_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/doctor/complete-profile/'+doc_id,
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
function getPatientProfile(user_id) {
    console.log(configConstants.API_BASE_PATH + '/patient/patientinfo/'+user_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/patient/patientinfo/'+user_id,
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
function uploadPic(data) {
    // console.log(configConstants.API_BASE_PATH + '/profile/updateprofilepatient/' + user_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/uploadDoctorDocument',
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
function getCouncil() {
    
    console.log(configConstants.API_BASE_PATH + '/auth/council')
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/auth/council',
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
function getWallet(data) {
    
    console.log(configConstants.API_BASE_PATH + '/wallet/mywallet/'+data)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/wallet/mywallet/'+data,
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
function getWalletHistory(data) {
    
    console.log(configConstants.API_BASE_PATH + '/wallet/wallethistory')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/wallet/wallethistory',
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
function sendOTP(contact_no) {
    let user_id = JSON.parse(localStorage.user).user_id
    let data = {contact_no: contact_no}
    // console.log(configConstants.API_BASE_PATH + '/profile/sendotp/'+user_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/profile/sendotp/'+user_id,
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
function verifyOTP(code, contact_no) {
    let user_id = JSON.parse(localStorage.user).user_id
    let data = {
            "user_id" : user_id,
            "otp" : code,
            "contact_no": contact_no
           }
    // console.log(configConstants.API_BASE_PATH + '/profile/varifymobileotp')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/profile/varifymobileotp',
        data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
