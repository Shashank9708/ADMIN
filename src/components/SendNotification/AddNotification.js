import React from 'react';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';

export const AddNotification = (props) => { 

    return (
              <div>
                <Modal show={props.addNotificationShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Notification</Modal.Title>
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
                        <div className="row">
                          <div className="col-md-12">
                            <div className={ props.payload.validate.user_type.isValid ? 'form-group' : 'form-group has-error' }>
                              <Select
                                  name="user_type"
                                  value = {props.payload.detail.user_type}
                                  className="custom-select"
                                  placeholder = "Select"
                                  onChange={ (value, name) => props.handleSelectChange(value, 'user_type') }
                                  options={[
                                      { value: 'assistant', label: 'Assistant' },
                                      { value: 'parent', label: 'Parent' }
                                  ]}
                              />
                              <label className="control-label">User Type</label>
                              <span className="help-block">{ props.payload.validate.user_type.message }</span>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className={ props.payload.validate.title.isValid ? 'form-group' : 'form-group has-error' }>
                              <input name="title" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Title"/>
                              <label className="control-label">Title</label>
                              <span className="help-block">{ props.payload.validate.title.message }</span>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className={ props.payload.validate.description.isValid ? 'form-group' : 'form-group has-error' }>
                              <textarea name="description" onChange = { props.handleInputChange } className="form-control" placeholder="Please enter description"></textarea>
                              <label className="control-label">Description</label>
                              <span className="help-block">{ props.payload.validate.description.message }</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn-sm" onClick={props.handleClose}>Close</Button>
                    <Button className="btn-sm" onClick={props.sendNotification}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

