import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select'


export const AddPlan = (props) => { 
    // console.log('props===>>>',props)
    const user_type = [{
                        label: 'Doctor', value: '1'
                      },{
                        label: 'Medical', value: '3'
                      },{
                        label: 'Pathology', value: '4'
                      }]
    return (
              <div>
                <Modal show={props.addPlanShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Plan</Modal.Title>
                    { props.messages &&
                      <Alert bsStyle="success">
                      { props.messages }
                      </Alert>
                    }
                    { props.errorMsg &&
                      <Alert bsStyle="danger">
                      { props.errorMsg }
                      </Alert>
                    }
                  </Modal.Header>
                  <Modal.Body>
                      <div className="row">
                        <div className="col-md-12">
                          <div className={ props.payload.validate.plan_name.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="plan_name" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Plan Name"/>
                            <span className="help-block">{ props.payload.validate.plan_name.message }</span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ 'form-group' }>
                            <input name="details" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Plan Details"/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ props.payload.validate.type.isValid ? 'form-group' : 'form-group has-error' }>
                            <Select
                                placeholder = "Select User Type"
                                onChange={ (value, name) => props.handleSelectChange(value, 'type') }
                                options={user_type}
                                name='type'
                            />
                            <span className="help-block">{ props.payload.validate.type.message }</span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ props.payload.validate.days.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="days" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Plan valid days"/>
                            <span className="help-block">{ props.payload.validate.days.message }</span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ 'form-group' }>
                            <input name="price" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Price"/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ 'form-group' }>
                            <input name="sale_price" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Sale Price"/>
                          </div>
                        </div>
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
                    <Button className="btn text-btn green" onClick={props.handleSavePlan}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

