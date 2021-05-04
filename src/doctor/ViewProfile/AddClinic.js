import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select'


export const AddClinic = (props) => { 

    return (
              <div>
                <Modal show={props.addClinicShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Clinic</Modal.Title>
                   
                  </Modal.Header>
                  <Modal.Body>
                      <div className="row">

                        <div className="col-md-6">
                          <div className='form-group'>
                            <input name="clinic_name" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Clinic Name" value={props.payload.clinic_name}/>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className='form-group'>
                            <input name="clinic_number" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Clinic Number" value={props.payload.clinic_number}/>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className='form-group'>
                            <textarea 
                              name="clinic_address" 
                              className="form-control" 
                              onChange = { props.handleInputChange } 
                              placeholder="Clinic Address">
                              {props.payload.clinic_address}
                            </textarea>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className='form-group'>
                            <Select
                                placeholder = "Select slot interval per mintus"
                                onChange={ (value, name) => props.handleSelectChange(value, 'patient_attend_time') }
                                options={[
                                    {label: '10', value: '10'},
                                    {label: '15', value: '15'},
                                    {label: '20', value: '20'},
                                    {label: '30', value: '30'},
                                    {label: '60', value: '60'}
                                  ]}
                                name='council_id'
                                value={props.payload.patient_attend_time}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className='form-group'>
                            <Select
                                placeholder = "Select State"
                                onChange={ (value, name) => props.handleSelectChange(value, 'clinic_state_id') }
                                options={[
                                          {value: 1, label: 'ANDHRA PRADESH' },
                                          {value: 2, label: 'ASSAM' },
                                          {value: 3, label: 'ARUNACHAL PRADESH' },
                                          {value: 4, label: 'BIHAR' },
                                          {value: 5, label: 'GUJRAT' },
                                          {value: 6, label: 'HARYANA' },
                                          {value: 7, label: 'HIMACHAL PRADESH' },
                                          {value: 8, label: 'JAMMU & KASHMIR' },
                                          {value: 9, label: 'KARNATAKA' },
                                          {value: 10, label: 'KERALA' },
                                          {value: 11, label: 'MADHYA PRADESH' },
                                          {value: 12, label: 'MAHARASHTRA' },
                                          {value: 13, label: 'MANIPUR' },
                                          {value: 14, label: 'MEGHALAYA' },
                                          {value: 15, label: 'MIZORAM' },
                                          {value: 16, label: 'NAGALAND' },
                                          {value: 17, label: 'ORISSA' },
                                          {value: 18, label: 'PUNJAB' },
                                          {value: 19, label: 'RAJASTHAN' },
                                          {value: 20, label: 'SIKKIM' },
                                          {value: 21, label: 'TAMIL NADU' },
                                          {value: 22, label: 'TRIPURA' },
                                          {value: 23, label: 'UTTAR PRADESH' },
                                          {value: 24, label: 'WEST BENGAL' },
                                          {value: 25, label: 'DELHI' },
                                          {value: 26, label: 'GOA' },
                                          {value: 27, label: 'PONDICHERY' },
                                          {value: 28, label: 'LAKSHDWEEP' },
                                          {value: 29, label: 'DAMAN & DIU' },
                                          {value: 30, label: 'DADRA & NAGAR' },
                                          {value: 31, label: 'CHANDIGARH' },
                                          {value: 32, label: 'ANDAMAN & NICOBAR' },
                                          {value: 33, label: 'UTTARANCHAL' },
                                          {value: 34, label: 'JHARKHAND' },
                                          {value: 35, label: 'CHATTISGARH' }
                                      ]}
                                name='clinic_state_id'
                                value={props.payload.clinic_state_id}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className='form-group'>
                            <Select
                                placeholder = "Select City"
                                onChange={ (value, name) => props.handleSelectChange(value, 'clinic_city_id') }
                                options={props.cityList}
                                name='clinic_city_id'
                                value={props.payload.clinic_city_id}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className='form-group'>
                            <input name="clinic_pincode" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Clinic Pincode" value={props.payload.clinic_pincode}/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className='form-group'>
                            <input name="clinic_fees" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Clinic Fees" value={props.payload.clinic_fees}/>
                          </div>
                        </div>

                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn-sm" onClick={props.handleClose}>Close</Button>
                    <Button className="btn-sm" onClick={props.handleClinicSave}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

