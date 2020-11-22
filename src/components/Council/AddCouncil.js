import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';

export const AddCouncil = (props) => { 
    // console.log('props===>>>',props)
    return (
              <div>
                <Modal show={props.addCouncilShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Council</Modal.Title>
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
                          <div className={ props.payload.validate.council_title.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="council_title" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Council"/>
                            <span className="help-block">{ props.payload.validate.council_title.message }</span>
                          </div>
                        </div>
                        
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
                    <Button className="btn text-btn green" onClick={props.handleSaveCouncil}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

