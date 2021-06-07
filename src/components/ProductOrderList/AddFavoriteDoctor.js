import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select'



export const AddFavoriteDoctor = (props) => { 
    
    return (
              <div>
                <Modal show={props.addFavoriteDoctorShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Favorite Doctor</Modal.Title>
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
                          
                          <div className={ props.payload.validate.category_id.isValid ? 'form-group' : 'form-group has-error' }>
                            <Select
                                placeholder = "Select Specialization"
                                onChange={ (value, name) => props.handleSelectChange(value, 'category_id') }
                                options={props.categoryList}
                                name='category_id'
                            />
                            <span className="help-block">{ props.payload.validate.category_id.message }</span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          
                          <div className={ props.payload.validate.doc_id.isValid ? 'form-group' : 'form-group has-error' }>
                            <Select
                                placeholder = "Select Doctor"
                                onChange={ (value, name) => props.handleSelectChange(value, 'doc_id') }
                                options={props.doctorList}
                                name='doc_id'
                            />
                            <span className="help-block">{ props.payload.validate.doc_id.message }</span>
                          </div>
                        </div>
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
                    <Button className="btn text-btn green" onClick={props.handleSaveFavoriteDoctor}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

