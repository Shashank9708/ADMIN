import React from 'react';
import { connect } from 'react-redux';
import { doctorActions } from '../../_actions';
import { AddFavoriteDoctor } from './AddFavoriteDoctor';
import { favoritValidator } from '../../_validator';


class AddFavoriteDoctorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveFavoriteDoctor = this.handleSaveFavoriteDoctor.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  get initialState() {
      return {
          favoritForm : {
              detail : {
                  category_id : '',
                  'doc_id' : ''
              },
              validate : {
                  category_id : { isValid : true, message : '' },
                  doc_id : { isValid : true, message : '' }
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
  handleSelectChange(selectedOption, name) {
      // console.log('selectedOption',selectedOption, name)
        const { detail, validate } = this.state.favoritForm;
        this.setState({
            favoritForm : {
                detail : {
                    ...detail,
                    [name] : selectedOption.value
                },
                validate : {
                    ...validate,
                    [name] : {
                        isValid : true,
                        message : ''
                    }
                },
            }
        });
        if(name === 'category_id'){
          this.props.getDoctor(selectedOption.value)
        }
    }
  /**
     * @DateOfCreation        11 June 2018
     * @ShortDescription      This function is responsible to handle close add/edit employee modal
     * @return                Nothing
     */
  handleClose() {
      this.props.addFavoriteDoctorHideHandle();
      const { dispatch } = this.props;
      dispatch(doctorActions.resetFirstState());
  }

  handleSaveFavoriteDoctor() {
    const { detail } = this.state.favoritForm;
    // console.log(detail)
    if(favoritValidator.is_favoritValid(this)) {
        // console.log(detail)
        const { dispatch } = this.props;
        dispatch(doctorActions.addfavorite(detail.doc_id, this.props.favoritList));
    }
  }

  /**
     * @DateOfCreation        16 Aug 2018
     * @ShortDescription      This function is responsible to show list
     * @return                Nothing
     */
    componentWillReceiveProps(newProps) {
        if(newProps.closeForm == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                dispatch(doctorActions.getfavorite());
                
                dispatch(doctorActions.resetFirstState());
                this.props.addFavoriteDoctorHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }
    }
  render() {
      return (
            <AddFavoriteDoctor 
              addFavoriteDoctorShow = {this.props.addFavoriteDoctorShow}
              categoryList = {this.props.categoryList}
              doctorList = {this.props.doctorList}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSaveFavoriteDoctor = {this.handleSaveFavoriteDoctor}
              handleSelectChange = {this.handleSelectChange}
              payload = {this.state.favoritForm}
            />
      );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for notification list
 * @return                notification list and loader
 */

function mapStateToProps(state) {
   const { favoritList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.doctorReducer;
   // console.log("doctorList",doctorList)
    return {
        favoritList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddFavoriteDoctorContainer = connect(mapStateToProps)(AddFavoriteDoctorContainer);
export { connectedAddFavoriteDoctorContainer as AddFavoriteDoctorContainer };
