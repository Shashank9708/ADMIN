import axios from 'axios'; 
import { configConstants } from '../_constants';

/**
 * Clinic
 *
 * @subpackage             Clinic
 * @category               Service
 * @DateOfCreation         06 march 2020
 * @ShortDescription       This is responsible for calling API
 */
export const clinicService = {
    getClinicList,
    addClinicProfile,
    updateClinicProfile,
    deleteClinicProfile,
    clinicStatusChange,
    getCityList
};

/**
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getClinicList(id) {
    // console.log(configConstants.API_BASE_PATH + '/clinic/list-clinic/'+id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/clinic/list-clinic/'+id
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function addClinicProfile(data) {
    // console.log(configConstants.API_BASE_PATH + '/clinic/create-clinic')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/clinic/create-clinic',
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
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function updateClinicProfile(data) {
    // console.log(configConstants.API_BASE_PATH + '/patient/updatesos/' + data.patient_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/clinic/update-clinic/'+data.clinic_id,
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
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function deleteClinicProfile(id) {
    // console.log(configConstants.API_BASE_PATH + '/clinic/delete-clinic/'+id)
    return axios({
        method  : 'delete',
        url     : configConstants.API_BASE_PATH + '/clinic/delete-clinic/'+id
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
/**
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function clinicStatusChange(data) {
    // console.log(configConstants.API_BASE_PATH + '/patient/updatesos/' + data.patient_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/clinic/delete-clinic/'+id,
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
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getCityList(id) {
    // console.log(configConstants.API_BASE_PATH + '/clinic/list-clinic/'+id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/auth/getCities/'+id
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}