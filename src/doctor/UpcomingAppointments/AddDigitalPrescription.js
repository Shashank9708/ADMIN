import React from "react";
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select';
import { configConstants } from '../../_constants';
import {CreateOptions} from '../../_helpers/helper';
import './AddDigitalPrescription.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CreatableSelect from 'react-select/creatable';



export const AddDigitalPrescription = (props) => {  

  if(props.prescriptionURL){
    window.open(configConstants.API_BASE_PATH+"/"+props.prescriptionURL, '_blank');
  }

  // console.log("Symptoms",props.symptoms)
  let medicineList = []
  if(props.medicineList && props.medicineList.medsdata && props.medicineList.medsdata.length > 0){
    props.medicineList.medsdata.map(row => {
      medicineList.push({label: row.name.label ? row.name.label : row.name, value:row })
    })
  }

  return (
    <div className="">
      <Modal size="xl" show={props.addDigitalPrescriptionShow} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Digital Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* Start Alert Section */}
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
          {/* End Alert Section */}
         
         {/* Start Form Section */}
          <div className="add-digital-prescription-popup">
          
            {/* Start Row */}
            <div className="row">
              <div className="col-md-4"> 
                
                {/*  */}
                <div className={ 'form-group'}>
                  <label for="MedicineIntake">Purpose to Visit</label>
                  <input
                    className="form-control"
                    name="purpose"
                    placeholder="Purpose to Visit"
                    onChange = { props.handleInputChange }
                  />
                </div>                              
                {/*  */}
                
                {/*  */}
                <div className={ 'form-group'}>
                <label for="MedicineIntake">Symptoms</label>
                  <Select
                      isClearable
                      placeholder = "Symptoms"
                      onChange={ (value, name) => props.handleSelectDP(value, 'symptoms') }
                      options={CreateOptions(props.symtomsList)}
                      name='symptoms'
                      isMulti
                  />
                </div>                                
                {/*  */}                          
              </div>
              <div className="col-md-3">
                <label for="MedicineIntake">Findings</label>
                <textarea name="typing_area" onChange = { props.handleInputChange } className="form-control findings-textarea" placeholder="Findings" rows="5"></textarea>
              </div>
              <div className="col-md-3"> 
                {/*  */}
                <div className={ 'form-group'}>
                <label for="MedicineIntake">BP</label>
                  <input
                    className="form-control"
                    name="blood_pressure"
                    placeholder="BP"
                    onChange = { props.handleInputChange } 
                  />
                </div>                              
                {/*  */}  
                {/*  */}
                <div className={ 'form-group'}>
                <label for="MedicineIntake">Heart Rate</label>
                  <input
                    className="form-control"
                    name="heart_rate"
                    placeholder="Heart Rate"
                    onChange = { props.handleInputChange } 
                  />
                </div>                              
                {/*  */}                                
                {/*  */}
                <div className={ 'form-group'}>
                <label for="MedicineIntake">Oxygen Level</label>
                  <input
                    className="form-control"
                    name="oxygen_level"
                    placeholder="Oxygen Level"
                    onChange = { props.handleInputChange } 
                  />
                </div>                              
                {/*  */}                                
              </div>
              <div className="col-md-2"> 
                <label>Followup Date</label>
                <DatePicker
                  selected={props.payload.followup_date}
                  onChange={date => props.handleSelectDP(date,'followup_date')}
                  dateFormat="dd/MM/yyyy"
                  dropdownMode="select"
                  placeholder="Followup Date"
                />
              </div>                              
            </div>
            {/* End Row */}
            
            {/* Start Row */}
            <div className="row">
              <div className="col-md-3">
                <h3>Rx</h3>
              </div>
            </div>
            {/* End Row */}
            
            {/* Start Row */}
            <div className="row">
              {props.inputList.map((x, i) => {
                  return (
                    <>
                      <div className="col-md-3">
                        <div className={ 'form-group'}>
                        <label for="MedicineIntake">Medicine Name</label>
                        <Select
                              placeholder = "Medicine name"
                              onChange={ (value, name) => props.handleSelectChange(value, 'medicine', i) }
                              options={medicineList}
                              name='medicine'
                              value={x.medicine}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className={ 'form-group'}>
                        <label for="MedicineIntake">Days</label>
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
                      <div className="col-md-2">
                        <div className={ 'form-group'  }>
                        <label for="MedicineIntake">Dose frequency</label>
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
                      <div className="col-md-2">
                        <div className={ 'form-group'}>
                        <label for="MedicineIntake">Dose Strength</label>
                          <input
                            className="form-control"
                            name="dosage"
                            placeholder="Dose Strength"
                            value={x.dosage}
                            onChange={e => props.handleTextChange(e, i)}
                          />
                        </div>                                  
                      </div>
                      <div className="col-md-2">
                        <div className={ 'form-group'}>
                        <label for="MedicineIntake">Instructions</label>
                          <input
                            className="form-control"
                            name="instructions"
                            placeholder="Instructions"
                            value={x.instructions}
                            onChange={e => props.handleTextChange(e, i)}
                          />
                        </div>                                  
                      </div>
                      <div className="col-md-1">
                          <div className="btn-box">
                            {
                              props.inputList.length !== 1 && 
                              <i className="fa fa-trash" aria-hidden="true" onClick={() => props.handleRemoveClick(i)}></i>
                            }
                            {
                              props.inputList.length - 1 === i && 
                              <i className="fa fa-plus" aria-hidden="true" onClick={props.handleAddClick}></i>
                            }
                          </div>
                      </div>
                    </>
                  );
                })}

            </div>
            {/* End Row */}
            
            {/* Start Row */}
            <div className="row mt-3">
              <div className="col-md-5">
                <div className="form-group">
                  <label for="MedicineIntake">Lab Test Recommendation</label>
                  <Select
                      placeholder = ""
                      onChange={ (value, name) => props.handleSelectDP(value, 'test_category') }
                      options={props.testCatList}
                      name='test_category'
                  />
                </div>                                 
              </div>                              
              <div className="col-md-5">
                <div className="form-group">
                  <label for="MedicineIntake">&nbsp;</label>
                  <Select
                      isClearable
                      placeholder = ""
                      onChange={ (value, name) => props.handleSelectDP(value, 'test') }
                      options={CreateOptions(props.testByCatList)}
                      name='test'
                      isMulti
                  />
                </div>                          
              </div>
            </div>
            {/* End Row */}

            {/* Start Footer Button Section */}
            <div className="add-digital-prescription-form-footer mt-3 mb-3">
              <div className="add-digital-prescription-form-footer__left-section">
                <div className="checkbox-section">
                  <label>
                        <input type="checkbox" name="signature" className="option-input" 
                          onChange={() =>props.handleSelectDP(props.payload.signature === 0 ? 1 : 0, 'signature')} 
                          checked={(props.payload.signature === 1) ? true : false}
                        /> <span>Add Signature</span></label>
                </div>
              </div>
              <div className="add-digital-prescription-form-footer__left-section">
                <Button className="btn-sm btn-white mr-2" onClick={props.handleClose}>Cancel</Button>
                <Button className="btn-sm mr-2" onClick={props.handleSaveDigitalPrescription}>Submit & Print</Button>
                <Button className="btn-sm btn-white" onClick={props.handleSaveDigitalPrescription}>Print</Button>
              </div>        
            </div>  
            {/* End Footer Button Section */}
            
          </div>
          {/* End Form Section */}
          
        </Modal.Body>
      </Modal>
    </div>
  );
}