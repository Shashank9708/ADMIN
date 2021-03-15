/**
 * LiveMapConstants
 *
 * @package                ARKAdmin
 * @subpackage             live Map Constants
 * @category               Constants
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for Route Allocation Constants action names
 */
export const LiveMapConstants = {
    
    API_BASE_PATH            : process.env.API_BASE_PATH,
    
    // Fetch Action Constants
    LIVE_MAP_FETCH_REQUEST     : 'LIVE_MAP_FETCH_REQUEST',
    LIVE_MAP_FETCH_SUCCESS     : 'LIVE_MAP_FETCH_SUCCESS',
    LIVE_MAP_FETCH_FAILURE     : 'LIVE_MAP_FETCH_FAILURE',

    // Fetch All Vehicle Action Constants
    LIVE_MAP_ALL_VEHICLE_FETCH_REQUEST     : 'LIVE_MAP_ALL_VEHICLE_FETCH_REQUEST',
    LIVE_MAP_ALL_VEHICLE_FETCH_SUCCESS     : 'LIVE_MAP_ALL_VEHICLE_FETCH_SUCCESS',
    LIVE_MAP_ALL_VEHICLE_FETCH_FAILURE     : 'LIVE_MAP_ALL_VEHICLE_FETCH_FAILURE',

    
    // Reset State
    LIVE_MAP_RESET_STATE     : 'LIVE_MAP_RESET_STATE',
    LIVE_MAP_UPDATE_STATE    : 'LIVE_MAP_UPDATE_STATE',
	LIVE_MAP_UNAUTHENTICATE  : 'LIVE_MAP_UNAUTHENTICATE',

    SUCCESS_CODE        : '1000',
    ERROR_CODE          : '5000',
    EXCEPTION_CODE      : '3000',
    UNAUTHENTICATE_CODE : '7000',
};
