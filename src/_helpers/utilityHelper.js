import { Cookies } from 'react-cookie';
import { configConstants } from '../_constants';
import { sessionService } from '../_packages/redux-react-session';
import format from 'date-fns/format'

/**
 * utilityHelper
 *
 * @package                ARKAdmin
 * @subpackage             utilityHelper
 * @category               Helper
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for exporting all utility functions
 */

export const utilityHelper = {
    jsonToFormData,
    getFirstErrorMessage,
    isObjectEmpty,
    getLoginAccessToken,
    getUserInfo,
    doLogout,
    setUserAndLoginToken,
    getMonths,
    getYears,
    getMultipleErrorMessage,
    inArray,
    getAddress,
    formatTime,
    formatDate,
    stateName
};

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to convert json to formdata 
* @param                 JSON jsonObj
* @param                 FORMDATA formDataObj
* @return                FORMDATA OBJ
*/
function jsonToFormData(jsonObj, formDataObj) {
    for ( var key in jsonObj ) {
        formDataObj.append(key, jsonObj[key]);
    }
    return formDataObj;
}

/**
* @DateOfCreation        12 July 2018
* @ShortDescription      This function is responsible to check value in array
* @param                 JSON jsonObj
* @param                 FORMDATA formDataObj
* @return                FORMDATA OBJ
*/
function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to get first error from response 
* @param                 JSON jsonObj contains error object
* @return                String
*/
function getFirstErrorMessage(jsonObj){
    var key = Object.keys(jsonObj)[0];
    var value = jsonObj[key][0];
    return value;
}

function getMultipleErrorMessage(jsonObj){
    return jsonObj;
}


/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to check is object empty 
* @param                 JSON jsonObj
* @return                Boolean
*/
function isObjectEmpty(JSONObj){
    if(Object.keys(JSONObj).length === 0){
        return true;
    }else{
        return false;
    }
}

/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible set the login access token 
                         and user info to cookies 
* @return                String
*/
function setUserAndLoginToken(accessToken, user) {
    const cookies = new Cookies();
    cookies.set(configConstants.LOGIN_TOKEN, accessToken);
    cookies.set(configConstants.USER_INFO, user);
    return true;
}

/**
* @DateOfCreation        18 May 2018
* @ShortDescription      This function is responsible get the login access token 
                         from cookies 
* @return                String
*/
function getLoginAccessToken(){
    const cookies = new Cookies();
    return cookies.get(configConstants.LOGIN_TOKEN);
}

/**
* @DateOfCreation        18 May 2018
* @ShortDescription      This function is responsible to get user info from Cookies
* @return                json object
*/
function getUserInfo(){
    const cookies = new Cookies();
    return cookies.get(configConstants.USER_INFO);
}

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible remove all cookies
* @return                Boolean
*/
function doLogout(){
    sessionService.deleteSession();
    sessionService.deleteUser();
    return true;
}

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible make the JSON of years
* @return                Boolean
*/
function getYears(){
    var years = [];
    for (var i = configConstants.START_YEAR; i <= configConstants.END_YEAR; i++) {
        years.push({
            value: String(i),
            label: i
        });
    }
    return years;
}

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible make the JSON of months
* @return                Boolean
*/
function getMonths(){
    var months = [];
    var monthNameList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var i = configConstants.START_MONTH; i <= configConstants.END_MONTH; i++) {
        months.push({
            value: String(i),
            label: monthNameList[i-1]
        });
    }
    return months;
}

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible make the JSON of months
* @return                Boolean
*/
function getAddress (latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyDYDTA4hTuHmKL3EE3ih9ZKUgoWk1RmaJA';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0];
                    resolve(address);
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
};


function formatTime (time) {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'PM' : 'AM';
    
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;

    return (`${hour}:${min} ${part}`)  
}

function formatDate (date) {
    return format(new Date(date), 'dd/MM/yyyy')
}


function stateName (id) {
    let arg = [
                  {value: 1, label: 'ANDHRA PRADESH' },
                  {value: 2, label: 'ASSAM' },
                  {value: 3, label: 'ARUNACHAL PRADESH' },
                  {value: 4, label: 'BIHAR' },
                  {value: 5, label: 'GUJRAT' },
                  {value: 6, label: 'HARYANA' },
                  {value: 7, label: 'HIMACHAL PRADESH' },
                  {value: 8, label: 'JAMMU & KASHMIR' },
                  {value: 9, label: 'KARNATAKA' },
                  {value: 10, label: 'KERALA' },
                  {value: 11, label: 'MADHYA PRADESH' },
                  {value: 12, label: 'MAHARASHTRA' },
                  {value: 13, label: 'MANIPUR' },
                  {value: 14, label: 'MEGHALAYA' },
                  {value: 15, label: 'MIZORAM' },
                  {value: 16, label: 'NAGALAND' },
                  {value: 17, label: 'ORISSA' },
                  {value: 18, label: 'PUNJAB' },
                  {value: 19, label: 'RAJASTHAN' },
                  {value: 20, label: 'SIKKIM' },
                  {value: 21, label: 'TAMIL NADU' },
                  {value: 22, label: 'TRIPURA' },
                  {value: 23, label: 'UTTAR PRADESH' },
                  {value: 24, label: 'WEST BENGAL' },
                  {value: 25, label: 'DELHI' },
                  {value: 26, label: 'GOA' },
                  {value: 27, label: 'PONDICHERY' },
                  {value: 28, label: 'LAKSHDWEEP' },
                  {value: 29, label: 'DAMAN & DIU' },
                  {value: 30, label: 'DADRA & NAGAR' },
                  {value: 31, label: 'CHANDIGARH' },
                  {value: 32, label: 'ANDAMAN & NICOBAR' },
                  {value: 33, label: 'UTTARANCHAL' },
                  {value: 34, label: 'JHARKHAND' },
                  {value: 35, label: 'CHATTISGARH' }
              ]
    return arg.filter(r=> r.value === id)
}