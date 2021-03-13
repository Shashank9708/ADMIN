import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';
/**
 * get productCategoriesService
 *
 * @package                TruckAdmin
 * @subpackage             productCategoriesService
 * @category               Service
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for calling API
 */
export const productCategoriesService = {
    getProductCategoriesList,
    saveProductCategories,
    statusChange,
    deleteProductCategory
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible to call Fetch route list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getProductCategoriesList(page, pageSize, sorted, filtered) {
    
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/admin/getProductCategory',
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
* @ShortDescription      This function is responsible to call Save product api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function saveProductCategories(product) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/saveProductCategory',
        data    : product
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
* @ShortDescription      This function is responsible to call Save product api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function statusChange(data) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/changeProductCategoryStatus',
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
* @ShortDescription      This function is responsible to call Save product api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function deleteProductCategory(data) {
    // var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/admin/deleteProductCategory',
        data    : data
    })
    .then(response => {
        return response;
    })
    .then(response => {
        return response;
    });
}