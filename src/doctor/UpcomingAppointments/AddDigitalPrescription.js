import React from "react";
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select'
import { configConstants } from '../../_constants';
import {CreateOptions} from '../../_helpers/helper'



export const AddDigitalPrescription = (props) => {  

  if(props.prescriptionURL){
    window.open(configConstants.API_BASE_PATH+"/"+props.prescriptionURL, '_blank');
  }
  return (
    <div>
      <Modal size="lg" show={props.addDigitalPrescriptionShow} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Digital Prescription</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>

                    <div className="">
                      <div className="page-heading__btn-container">
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
                      </div>
                    </div>                   
                   
                      
                    <div className="">
                      <div className="">
                        <div className="row">
                          <div className="col-md-4"> 
                            {/*  */}
                            <div className={ 'form-group'}>
                              <label for="MedicineIntake">Disease</label>
                              <input
                                className="form-control"
                                name="medicine"
                                placeholder="Disease"
                              />
                            </div>                              
                            {/*  */}
                            {/*  */}
                            <div className={ 'form-group'}>
                            <label for="MedicineIntake">Symptoms</label>
                              <Select
                                  placeholder = "Texting, Multi Select"
                                  options={[
                                          {label:"1", value:"1"},
                                          {label:"2", value:"2"},
                                        ]}
                                  name='days'
                              />
                            </div>                                
                            {/*  */}                          
                          </div>
                          <div className="col-md-3">
                            <label for="MedicineIntake">Findings</label>
                            <textarea name="purpose" onChange = { props.handleInputChange } className="form-control" placeholder="Findings" rows="5"></textarea>
                          </div>
                          <div className="col-md-3"> 
                            {/*  */}
                            <div className={ 'form-group'}>
                              <input
                                className="form-control"
                                name="medicine"
                                placeholder="BP"
                              />
                            </div>                              
                            {/*  */}  
                            {/*  */}
                            <div className={ 'form-group'}>
                              <input
                                className="form-control"
                                name="medicine"
                                placeholder="Heart Rate"
                              />
                            </div>                              
                            {/*  */}                                
                            {/*  */}
                            <div className={ 'form-group'}>
                              <input
                                className="form-control"
                                name="medicine"
                                placeholder="SPo2"
                              />
                            </div>                              
                            {/*  */}                                
                          </div>
                          <div className="col-md-2"> 
                          
                          </div>                              
                        </div>
                        
                        {
                        /* 
                        <div className="row mt-2">
                          <div className="col-md-12">
                            <textarea name="typing_area" onChange = { props.handleInputChange } className="form-control" placeholder="Please enter description" rows="5"></textarea>
                          </div>
                        </div> 
                        */
                        }
                        
                        <div className="row">
                          <div className="col-md-3">
                            <h3>Rx</h3>
                          </div>
                        </div>
                        
                        
                        <div className="row">
                          {props.inputList.map((x, i) => {
                              return (
                                <>
                                  <div className="col-md-3">
                                    <div className={ 'form-group'}>
                                    {/*<input
                                      className="form-control"
                                      name="medicine"
                                      placeholder="Medicines"
                                      value={x.medicine}
                                      onChange={e => props.handleTextChange(e, i)}
                                    />*/}
                                    <Select
                                          placeholder = "Medicine name"
                                          onChange={ (value, name) => props.handleSelectChange(value, 'medicine', i) }
                                          options={CreateOptions(props.medicineList)}
                                          name='medicine'
                                          value={x.medicine}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className={ 'form-group'}>
                                      <Select
                                          placeholder = "Days"
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
                                          placeholder = "Dose frequency"
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
                                    <div className={ 'form-group'}>
                                      <input
                                        className="form-control"
                                        name="instructions"
                                        placeholder="Instructions"
                                        value={x.instructions}
                                        onChange={e => props.handleTextChange(e, i)}
                                      />
                                    </div>                                  
                                  </div>
                                  <div className="col-md-12 text-center">
                                    <div className="btn-box">
                                      {
                                        props.inputList.length !== 1 && 
                                        <button
                                          className="btn-sm mr-1"
                                          onClick={() => props.handleRemoveClick(i)}>
                                          <i className="fa fa-trash" aria-hidden="true"></i>
                                          
                                        </button>
                                      }
                                      {props.inputList.length - 1 === i && <button className="btn-sm" type="button" onClick={props.handleAddClick}>Add</button>}
                                    </div>
                                  </div>
                                </>
                              );
                            })}

                        </div>
                        
                        <div className="row mt-3">
                          <div className="col-md-5">
                            <div className="form-group">
                              <label for="MedicineIntake">Lab Test Recommendation</label>
                              <select className="form-control" id="MedicineIntake">
                                <option>Category</option>
                                <option>Complete Blood Count</option>
                                <option>Prothrombin Time</option>
                                <option>Basic Metabolic Panel</option>
                                <option>Comprehensive Metabolic Panel</option>
                                <option>Lipid Panel</option>
                              </select>
                            </div>                                 
                          </div>                              
                          <div className="col-md-5">
                            <div className="form-group">
                              <label for="MedicineIntake">&nbsp;</label>
                              <select className="form-control" id="MedicineIntake">
                                <option>Multi Select with Auto Suggest</option>
                                <option>Complete Blood Count</option>
                                <option>Prothrombin Time</option>
                                <option>Basic Metabolic Panel</option>
                                <option>Comprehensive Metabolic Panel</option>
                                <option>Lipid Panel</option>
                              </select>
                            </div>                          
                          </div>
                        </div>
                        

                        <div className="add-digital-prescription-form-footer mt-3 mb-3">
                          <div className="add-digital-prescription-form-footer__left-section">
                            <div className="checkbox-section">
                              <label><input type="checkbox" name="video" className="option-input"/> <span>Add Signature</span></label>
                            </div>
                          </div>
                          <div className="add-digital-prescription-form-footer__left-section">
                            <Button className="btn-sm btn-white mr-2" onClick={props.handleClose}>Cancel</Button>
                            <Button className="btn-sm mr-2" onClick={props.handleSaveDigitalPrescription}>Submit & Print</Button>
                            <Button className="btn-sm btn-white" onClick={props.handleClose}>Print</Button>
                          </div>        
                        </div>  
                      </div>
                    </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}