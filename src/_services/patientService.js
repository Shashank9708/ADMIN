import axios from 'axios'; 
import { configConstants } from '../_constants';


/**
 * patient
 *
 * @subpackage             patient
 * @category               Service
 * @DateOfCreation         06 march 2020
 * @ShortDescription       This is responsible for calling API
 */
export const patientService = {
    getPatientHistory,
    getPrescription,
    getMyPatientsList,
    getReferralsDoctorList,
    getHealthProblem
};


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getPatientHistory(patient_id) {
    console.log(configConstants.API_BASE_PATH +  '/patient/patienthistory/'+ patient_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/patient/patienthistory/'+patient_id,
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
function getPrescription(data) {
    

    console.log(configConstants.API_BASE_PATH +  '/patient/getprescription/'+ patient_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/patient/getprescription/'+ patient_id,
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
function getMyPatientsList() {
    
    let doc_id = JSON.parse(localStorage.user).doc_id

    // console.log(configConstants.API_BASE_PATH + '/doctor/patientlist/'+ doc_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/patientlist/'+ doc_id,
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
function getReferralsDoctorList() {
    
    console.log(configConstants.API_BASE_PATH + '/patient/referrals/'+ patient_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/patient/referrals/'+ patient_id,
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
function getHealthProblem() {
    console.log(configConstants.API_BASE_PATH + '/auth/healthproblem')
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/auth/healthproblem',
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
