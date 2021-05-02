import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select'



export const AddEducation = (props) => { 
    
    return (
              <div>
                <Modal show={props.addEducationShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Education</Modal.Title>
                    
                  </Modal.Header>
                  <Modal.Body>
                      <div className="row">

                        <div className="col-md-12">
                          <div className='form-group'>
                            <input name="degree" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Qualification"/>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className={ 'form-group' }>
                            <input name="year" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Year"/>
                          </div>
                        </div>
                      </div>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn-sm" onClick={props.handleClose}>Close</Button>
                    <Button className="btn-sm" onClick={props.handleEducationSave}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

