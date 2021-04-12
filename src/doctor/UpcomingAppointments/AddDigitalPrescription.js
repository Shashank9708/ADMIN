import React from "react";
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select'

export const AddDigitalPrescription = (props) => {  

 
  return (
    <div>
      <Modal show={props.addDigitalPrescriptionShow} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Prescription Upload</Modal.Title>
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
            Manual Prescription
            <div className={ 'form-group' }>
              <input name="prescription" type="file" className="form-control" onChange = { props.handleFileChange }/>
            </div>
          </div>
          <div className="col-md-12">OR
            <br/>
            Digital Prescription
          </div>
          <div className="col-md-12">
            <div className={ 'form-group' }>
              <textarea name="typing_area" className="form-control" onChange = { props.handleInputChange } placeholder="Typing Area"> </textarea>
            </div>
          </div>
            {props.inputList.map((x, i) => {
              return (
                <>
                  <div className="col-md-3">
                    <div className={ 'form-group'}>
                    <input
                      className="form-control"
                      name="medicine"
                      placeholder="Enter medicine name"
                      value={x.medicine}
                      onChange={e => props.handleTextChange(e, i)}
                    />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className={ 'form-group'}>
                      <Select
                          placeholder = "Select Days"
                          onChange={ (value, name) => props.handleSelectChange(value, 'days', i) }
                          options={[
                                  {label:"1", value:"1"},
                                  {label:"2", value:"2"},
                                  {label:"3", value:"3"},
                                  {label:"4", value:"4"},
                                  {label:"5", value:"5"},
                                  {label:"6", value:"6"},
                                  {label:"7", value:"7"},
                                  {label:"10", value:"10"},
                                  {label:"15", value:"15"},
                                  {label:"20", value:"20"},
                                  {label:"30", value:"30"}
                                ]}
                          name='days'
                          value={x.days}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className={ 'form-group'  }>
                      <Select
                          placeholder = "When To Take"
                          onChange={ (value, name) => props.handleSelectChange(value, 'whentotake', i) }
                          options={[
                                  {label:"0--", value:"0--"},
                                  {label:"-0-", value:"-0-"},
                                  {label:"--0", value:"--0"},
                                  {label:"00-", value:"00-"},
                                  {label:"-00", value:"-00"},
                                  {label:"0-0", value:"0-0"},
                                  {label:"000", value:"000"}
                                ]}
                          name='whentotake'
                          value={x.whentotake}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="btn-box">
                      {props.inputList.length !== 1 && <button
                        className="mr10"
                        onClick={() => props.handleRemoveClick(i)}>X</button>}
                      {props.inputList.length - 1 === i && <button onClick={props.handleAddClick}>Add</button>}
                    </div>
                  </div>
                </>
              );
            })}
        </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
          <Button className="btn text-btn green" onClick={props.handleSaveDigitalPrescription}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}