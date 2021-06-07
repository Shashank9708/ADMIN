import axios from 'axios'; 
import { configConstants } from '../_constants';

/**
 * fixture
 *
 * @subpackage             fixture
 * @category               Service
 * @DateOfCreation         06 march 2020
 * @ShortDescription       This is responsible for calling API
 */
export const videoService = {
    sendVideoCallByServer,
    createRoom,
};


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function sendVideoCallByServer(data) {

    console.log(data, configConstants.API_BASE_PATH + '/doctor/start-video-call')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/doctor/start-video-call',
        data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}




// const kBaseURL = "https://demo.enablex.io/";
const kBaseURL = "https://api.enablex.io/";
const kTry = true;
const  kAppId = "6035f5edeff23c10ca6ce4e2";
const  kAppkey = "hytySa8uHezy6ePaya4uEa2ueeqeAy4eyaea";

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function createRoom() {

    var header = (kTry) ? { "x-app-id" : kAppId , "x-app-key" : kAppkey} : {};

    // console.log(data, configConstants.API_BASE_PATH + '/createRoom')
    return axios({
        method  : 'post',
        url     : 'https://api.enablex.io/createRoom',
        headers : header
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
