/**`
 * ImportContainer
 *
 * @package                TruckAdmin
 * @subpackage             ImportContainer
 * @category               Container Component
 * @DateOfCreation         26 June 2018
 * @ShortDescription       This component is reponsible for Import 
 */
import React from 'react';
import { connect } from 'react-redux';
import { Import } from './Import';
import { ImportActions } from './ImportActions';

class ImportContainer extends React.Component {
    /**
     * @DateOfCreation        26 June 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            files: []
        };
    }

    /**
     * @DateOfCreation        28 June 2018
     * @ShortDescription      This function is responsible to handle close import modal
     * @return                Nothing
     */
    handleClose() {
        this.props.onClose();
        const { dispatch } = this.props;
        dispatch(ImportActions.resetImportState())
    }
    
    /**
     * @DateOfCreation        26 June 2018
     * @ShortDescription      This function is responsible to select file
     * @return                Nothing
     */
    onDrop(files) {
        this.setState({
            files
            }, function () {
                files.map((file) => {
                    if(!this.props.skip){
                        const { dispatch } = this.props;
                        dispatch(ImportActions.validationImport(file,this.props.validationAction,this.props.importData));
                    }
                })
        });
    }
    /**
     * @DateOfCreation        26 June 2018
     * @ShortDescription      This function is responsible to change selected file
     * @return                Nothing
     */
    onChange(value){
        this.setState(value);
    }

    /**
     * @DateOfCreation        26 June 2018
     * @ShortDescription      This function is responsible to import save
     * @return                Nothing
     */
    handleSubmit() {
        const { dispatch } = this.props;
        dispatch(ImportActions.saveImport(this.state.files[0], this.props.importSave,this.props.saveAction));
        this.setState({
            src:null
        });
    }
   

    /**
     * @DateOfCreation        28 June 2018
     * @ShortDescription      This function is responsible to close import model.
     * @return                Nothing
     */
    UNSAFE_componentWillReceiveProps(newProps) {
        if(newProps.closeForm == true){
            setTimeout(function() { 
                this.props.onClose();
                this.props.onSave();
                const { dispatch } = this.props;
                dispatch(ImportActions.resetImportState())
                this.setState(this.initialState);
            }.bind(this), 1500);
        }
    }
    
    render() {        
        return (
            <Import
                importShow = {this.props.onClick}
                handleClose = {this.handleClose}
                handleSubmit = {this.handleSubmit}                   
                onDrop = {this.onDrop}
                onChange = {this.onChange}
                dropValues = {this.state}
                allowedFileType={this.props.allowedFileType}
                maxFileSize = {this.props.maxFileSize}
                title   = { this.props.title }
                results  = {this.props.results}
                message = {this.props.successMessage}
                successResult = {this.props.successResult}
                errorMsg = {this.props.errorMsg}
                errorlist = {this.props.errorlist}
                skip = {this.props.skip}
            />
        );
    }
}

/**
* @DateOfCreation        26 June 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { results, errorMsg, errorlist, closeForm, successMessage, successResult } = state.ImportReducer;

    return {        
        results,
        errorlist,
        errorMsg,
        successMessage,
        successResult,
        closeForm
    };
}

// Connection with State 
const connectedImportContainer = connect(mapStateToProps)(ImportContainer);
export { connectedImportContainer as ImportContainer };