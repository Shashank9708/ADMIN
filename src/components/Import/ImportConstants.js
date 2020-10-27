/**
 * importConstants
 *
 * @package                TruckAdmin
 * @subpackage             Import Constants
 * @category               Constants
 * @DateOfCreation         22 May 2018
 * @ShortDescription       This is responsible for Import Constants action names
 */
export const ImportConstants = {
    
    API_BASE_PATH            : process.env.API_BASE_PATH,

    //Import Validation
    IMPORT_FETCH_REQUEST     : 'IMPORT_FETCH_REQUEST',
    IMPORT_FETCH_SUCCESS     : 'IMPORT_FETCH_SUCCESS',
    IMPORT_FETCH_FAILURE     : 'IMPORT_FETCH_FAILURE',

    //Import Save
    IMPORT_SAVE_REQUEST     : 'IMPORT_SAVE_REQUEST',
    IMPORT_SAVE_SUCCESS     : 'IMPORT_SAVE_SUCCESS',
    IMPORT_SAVE_FAILURE     : 'IMPORT_SAVE_FAILURE',
   
    // Reset State
    IMPORT_RESET_STATE     : 'IMPORT_RESET_STATE',
    IMPORT_UPDATE_STATE    : 'IMPORT_UPDATE_STATE',
    IMPORT_UNAUTHENTICATE  : 'IMPORT_UNAUTHENTICATE',

    SUCCESS_CODE        : '200',
    ERROR_CODE          : '300',
    EXCEPTION_CODE      : '300',
    UNAUTHENTICATE_CODE : '700',
};
