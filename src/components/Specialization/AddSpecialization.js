import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';

export const AddSpecialization = (props) => { 
    // console.log('props===>>>',props)
    return (
              <div>
                <Modal show={props.addSpecializationShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{props.flag ? 'Edit' : 'New'} Specialization</Modal.Title>
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
                          <div className={ props.payload.validate.en_spec.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="en_spec" type="text" value={props.payload.detail.en_spec} className="form-control" onChange = { props.handleInputChange } placeholder="Specialization"/>
                            <span className="help-block">{ props.payload.validate.en_spec.message }</span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ 'form-group'}>
                            <input name="image" type="file" className="form-control" onChange = { props.handleFileChange }/>
                            
                          </div>
                        </div>
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn-sm" onClick={props.handleClose}>Close</Button>
                    <Button className="btn-sm" onClick={props.handleSaveSpecialization}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

