import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';

export const AddHealthTips = (props) => { 
    // console.log('props===>>>',props)
    return (
              <div>
                <Modal show={props.addHealthTipsShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add HealthTips</Modal.Title>
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
                          <div className={ props.payload.validate.title.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="title" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Title"/>
                            <span className="help-block">{ props.payload.validate.title.message }</span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className={ props.payload.validate.desc_en.isValid ? 'form-group' : 'form-group has-error' }>
                            <textarea name="desc_en" className="form-control" onChange = { props.handleInputChange } placeholder="Description"></textarea>
                            <span className="help-block">{ props.payload.validate.desc_en.message }</span>
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
                    <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
                    <Button className="btn text-btn green" onClick={props.handleSaveHealthTips}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

