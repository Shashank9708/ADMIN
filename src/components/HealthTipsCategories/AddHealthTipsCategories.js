import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';

export const AddHealthTipsCategories = (props) => { 
    // console.log('props===>>>',props)
    return (
              <div>
                <Modal show={props.addHealthTipsCategoriesShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add HealthTips Categories</Modal.Title>
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
                          <div className={ props.payload.validate.title_en.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="title_en" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="HealthTipsCategories"/>
                            <span className="help-block">{ props.payload.validate.title_en.message }</span>
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
                    <Button className="btn-sm" onClick={props.handleSaveHealthTipsCategories}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

