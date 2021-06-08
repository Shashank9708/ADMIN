import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';

export const AddRX = (props) => { 
    // console.log('props===>>>',props)
    return (
              <div>
                <Modal show={props.addRXShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add</Modal.Title>
                    { props.messages &&
                      <Alert variant="success">
                      { props.messages }
                      </Alert>
                    }
                    { props.errorMsg &&
                      <Alert variant="danger">
                      { props.errorMsg }
                      </Alert>
                    }
                  </Modal.Header>
                  <Modal.Body>
                      <div className="row">
                        <div className="col-md-12">
                          <div className={ props.payload.validate.name.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="name" type="text" className="form-control" value={props.payload.detail.name} onChange = { props.handleInputChange } placeholder="Name"/>
                            <span className="help-block">{ props.payload.validate.name.message }</span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ 'form-group' }>
                            <input name="brand" type="text" className="form-control" value={props.payload.detail.brand} onChange = { props.handleInputChange } placeholder="Brand Name"/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ 'form-group' }>
                            <input name="dosage" type="text" className="form-control" value={props.payload.detail.dosage} onChange = { props.handleInputChange } placeholder="Dose Strength"/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ 'form-group' }>
                            <input name="dosage_from" type="text" className="form-control" value={props.payload.detail.dosage_from} onChange = { props.handleInputChange } placeholder="Dose form"/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ 'form-group' }>
                            <input name="instructions" type="text" className="form-control" value={props.payload.detail.instructions} onChange = { props.handleInputChange } placeholder="Instructions"/>
                          </div>
                        </div>                        
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn-sm" onClick={props.handleClose}>Close</Button>
                    <Button className="btn-sm" onClick={props.handleSaveRX}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

