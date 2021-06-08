import React from 'react';
import { connect } from 'react-redux';
import { rxActions } from '../../_actions';
import { AddRX } from './AddRX';
import { rxValidator } from '../../_validator';


class AddRXContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveRX = this.handleSaveRX.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  get initialState() {
      return {
          rxForm : {
              detail : {
                  'name' : '',
                  'brand' : '',
                  'dosage' : '',
                  'dosage_from' : '',
                  'instructions' : '',
              },
              validate : {
                  name : { isValid : true, message : '' }
              }
          }
      }
  }


  /**
  * @DateOfCreation        11 June 2018
  * @ShortDescription      This function is responsible to handle changes in Select state
  * @param                 Event Object
  * @return                Nothing
  */
  handleInputChange(event) {
        const { name, value }       = event.target;
        const { detail, validate }  = this.state.rxForm;
        this.setState({
            rxForm : {
                validate:{
                    ...validate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
                detail : {
                    ...detail,
                    [name]: value
                }
            }
        }, function(){
          
        });
    }


  /**
     * @DateOfCreation        11 June 2018
     * @ShortDescription      This function is responsible to handle close add/edit employee modal
     * @return                Nothing
     */
  handleClose() {
      this.props.addRXHideHandle();
      const { dispatch } = this.props;
      dispatch(rxActions.resetRXState());
  }

  handleSaveRX() {
    if(rxValidator.is_rxValid(this)) {
        const { detail } = this.state.rxForm;
        let newarg = []
        if(this.props.rxList.length > 0){
          newarg = this.props.rxList[0].medsdata
        }
        console.log(newarg)
        let medsdata = { medsdata: newarg.push(detail) }

        const { dispatch } = this.props;
          if(this.props.flag){
            // bodyFormData.append('id',this.state.id);
            dispatch(rxActions.editRX(medsdata, this.props.rxList));
          }else{
            dispatch(rxActions.saveRX(medsdata, this.props.rxList));
          }
    }
  }

  /**
     * @DateOfCreation        16 Aug 2018
     * @ShortDescription      This function is responsible to show list
     * @return                Nothing
     */
    componentWillReceiveProps(newProps) {
        if(newProps.payload){
            this.setState({
              rxForm : {
                detail : {
                    'name' : newProps.payload.name,
                    'brand' : newProps.payload.brand,
                    'dosage' : newProps.payload.dosage,
                    'dosage_from' : newProps.payload.dosage_from,
                    'instructions' : newProps.payload.instructions,
                },
                validate : {
                    name : { isValid : true, message : '' }
                }
              },
              id: newProps.payload.id
            });
    
        }else{
            this.setState(this.initialState);
        }
        if(newProps.closeForm == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                dispatch(rxActions.getRXList(1, 10, "asc", "filtered"));
                
                dispatch(rxActions.resetRXState());
                this.props.addRXHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }
    }
  render() {

      return (
            <AddRX 
              addRXShow = {this.props.addRXShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveRX = {this.handleSaveRX}
              handleInputChange = {this.handleInputChange}
              payload = {this.state.rxForm}
            />
      );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for rx list
 * @return                rx list and loader
 */

function mapStateToProps(state) {
   const { rxList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.rxReducer;

    return {
        rxList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddRXContainer = connect(mapStateToProps)(AddRXContainer);
export { connectedAddRXContainer as AddRXContainer };
