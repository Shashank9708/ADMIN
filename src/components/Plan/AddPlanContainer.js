import React from 'react';
import { connect } from 'react-redux';
import { planActions } from '../../_actions';
import { AddPlan } from './AddPlan';
import { planValidator } from '../../_validator';


class AddPlanContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSavePlan = this.handleSavePlan.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  get initialState() {
      return {
          planForm : {
              detail : {
                  'plan_name' : '',
                  'details' : '',
                  'type' : '',
                  'days' : '',
                  'price' : '',
                  'sale_price' : '',
              },
              validate : {
                  plan_name : { isValid : true, message : '' },
                  type : { isValid : true, message : '' },
                  days : { isValid : true, message : '' },
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
        const { detail, validate }  = this.state.planForm;
        this.setState({
            planForm : {
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
  * @ShortDescription      This function is responsible to handle changes in Select state
  * @param                 Event Object
  * @return                Nothing
  */
  handleSelectChange(selectedOption, name) {
      // console.log('selectedOption',selectedOption, name)
        const { detail, validate } = this.state.planForm;
        this.setState({
            planForm : {
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
    }

    /**
     * @DateOfCreation        11 June 2018
     * @ShortDescription      This function is responsible to handle changes in Select state
     * @param                 Event Object
     * @return                Nothing
     */
    handleFileChange(e) {
        const target = e.target.name;
        let file = e.target.files[0];
        let fileName = file.name;
        // console.log(fileName,file)
        // if (file.type.includes("png") || file.type.includes("jpeg") || file.type.includes("jpg")) {
        
        // } else {
        //     this.setState({ [target + "TypeError"]: true })
        // }
        // return false;
        // const { name, value }       = e.target;
        const { detail, validate }  = this.state.planForm;
        this.setState({
        planForm : {
            validate:{
                ...validate,
                image: {
                    isValid: true,
                    message: ''
                }
            },
            detail : {
                ...detail,
                image: file
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
      this.props.addPlanHideHandle();
      const { dispatch } = this.props;
      dispatch(planActions.resetPlanState());
  }

  handleSavePlan() {
    if(planValidator.is_planValid(this)) {
        const { detail } = this.state.planForm;
        // console.log(detail)
        // var bodyFormData = new FormData();
        // bodyFormData.append('plan_name', detail.plan_name);
        // bodyFormData.append('details', detail.details);
        // bodyFormData.append('type', detail.type);
        // bodyFormData.append('days', detail.days);
        // bodyFormData.append('price', detail.price);
        // bodyFormData.append('sale_price', detail.sale_price);
        //table structure with validation rules

        const { dispatch } = this.props;
        dispatch(planActions.savePlan(detail, this.props.planList));
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
                dispatch(planActions.getPlanList(1, 10, "asc", "filtered"));
                
                dispatch(planActions.resetPlanState());
                this.props.addPlanHideHandle();
                this.setState(this.initialState);
            }.bind(this), 1500);
        }else{
            this.setState(this.initialState);
        }
    }
  render() {
      return (
            <AddPlan 
              addPlanShow = {this.props.addPlanShow}
              messages = { this.props.successMessage }
              errorMsg = { this.props.errorMsg }
              handleClose = {this.handleClose}
              handleSavePlan = {this.handleSavePlan}
              handleInputChange = {this.handleInputChange}
              handleFileChange = {this.handleFileChange}
              handleSelectChange = {this.handleSelectChange}
              payload = {this.state.planForm}
            />
      );
    }
}


/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for plan list
 * @return                plan list and loader
 */

function mapStateToProps(state) {
   const { planList,loader,successMessage,sendingRequest,errorMsg,closeForm } = state.planReducer;

    return {
        planList,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        closeForm
    };
}
const connectedAddPlanContainer = connect(mapStateToProps)(AddPlanContainer);
export { connectedAddPlanContainer as AddPlanContainer };
