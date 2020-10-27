import { Cookies } from 'react-cookie';
import { configConstants } from '../_constants';
import { sessionService } from '../_packages/redux-react-session';

/**
 * utilityHelper
 *
 * @package                TruckAdmin
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
    getAddress
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