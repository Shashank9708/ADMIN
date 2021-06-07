import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';

export const AddHealthProblem = (props) => { 
    // console.log('props===>>>',props)
    return (
              <div>
                <Modal show={props.addHealthProblemShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Health Problem</Modal.Title>
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
                          <div className={ props.payload.validate.health_problem_title.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="health_problem_title" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="HealthProblem"/>
                            <span className="help-block">{ props.payload.validate.health_problem_title.message }</span>
                          </div>
                        </div>
                        
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn-sm" onClick={props.handleClose}>Close</Button>
                    <Button className="btn-sm" onClick={props.handleSaveHealthProblem}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

