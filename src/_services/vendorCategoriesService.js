import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get vendorCategoriesService
 *
 * @package                ARKAdmin
 * @subpackage             vendorCategoriesService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const vendorCategoriesService = {
    getVendorCategoriesList,
    saveVendorCategories,
    statusChange,
    deleteVendorCategory
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getVendorCategoriesList(page, pageSize, sorted, filtered) {
    
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/admin/getVendorCategory',
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        10 May 2018
* @ShortDescription      This function is responsible to call Save vendor api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function saveVendorCategories(vendor) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/saveVendorCategory',
        data    : vendor
    })
    .then(response => {
        return response;
    })
    .then(response => {
        return response;
    });
}

/**
* @DateOfCreation        10 May 2018
* @ShortDescription      This function is responsible to call Save vendor api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function statusChange(data) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/changeVendorCategoryStatus',
        data    : data
    })
    .then(response => {
        return response;
    })
    .then(response => {
        return response;
    });
}



/**
* @DateOfCreation        10 May 2018
* @ShortDescription      This function is responsible to call Save vendor api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function deleteVendorCategory(data) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/deleteVendorCategory',
        data    : data
    })
    .then(response => {
        return response;
    })
    .then(response => {
        return response;
    });
}