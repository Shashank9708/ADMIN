import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';

export const AddMedicalStores = (props) => { 
    // console.log('props===>>>',props)
    return (
              <div>
                <Modal show={props.addMedicalStoresShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Medical Stores</Modal.Title>
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
                            <input name="name" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Store Name"/>
                            <span className="help-block">{ props.payload.validate.name.message }</span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className={ props.payload.validate.contact_no.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="contact_no" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Contact No"/>
                            <span className="help-block">{ props.payload.validate.contact_no.message }</span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className='form-group'>
                            <input name="email" type="email" className="form-control" onChange = { props.handleInputChange } placeholder="Email Id"/>
                            
                          </div>
                        </div>

                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn-sm" onClick={props.handleClose}>Close</Button>
                    <Button className="btn-sm" onClick={props.handleSaveMedicalStores}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

