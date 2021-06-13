import React from 'react';
import {Alert, Button, Modal, Card, title} from 'react-bootstrap';
import Select from 'react-select'
import { utilityHelper } from '../../_helpers';


export const AddUpcomingAppointments = (props) => { 
    // console.log(props.payload)
    return (
              <div>
                <Modal size="lg" show={props.addUpcomingAppointmentsShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add New Upcoming Appointments</Modal.Title>
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
                        <div className="col-md-6">
                          <div className={ props.payload.validate.contact_no.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="contact_no" type="text" className="form-control" onChange = { props.handleInputChange } onBlur={ props.handleInputChange } placeholder="Mobile Number"/>
                            <span className="help-block">{ props.payload.validate.contact_no.message }</span>
                          </div>                        
                        </div>
                        <div className="col-md-6">
                          <div className={ props.payload.validate.health_problem_id.isValid ? 'form-group' : 'form-group has-error' }>
                              <Select
                                  placeholder = "Health Problem"
                                  onChange={ (value, name) => props.handleSelectChange(value, 'health_problem_id') }
                                  options={props.healthProblem}
                                  name='health_problem_id'
                                  className="common-select"
                              />
                              <span className="help-block">{ props.payload.validate.health_problem_id.message }</span>
                          </div>
                        </div>
                      
                        <div className="col-md-6">
                          <div className={ 'form-group' }>
                            <input name="purpose" type="text"  className="form-control" onChange = { props.handleInputChange } placeholder="Purpose to Visit"/>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className={ props.payload.validate.name.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="name" type="text" value={props.payload.detail.name}  className="form-control" onChange = { props.handleInputChange } placeholder="Name"/>
                            <span className="help-block">{ props.payload.validate.name.message }</span>
                          </div>
                        </div>
                                               
                        
                        <div className="col-md-6">
                          <div className={ 'form-group'}>
                            <input name="email" type="email" value={props.payload.detail.email}  className="form-control" onChange = { props.handleInputChange } placeholder="Email ID"/>
                          </div>
                        </div>
                        
                        <div className="col-md-2">
                          <div className={ 'form-group' }>
                              <input name="age" type="number" value={props.payload.detail.age}  className="form-control" onChange = { props.handleInputChange } placeholder="Age"/>
                          </div>                        
                        </div>
                        
                        <div className="col-md-4">
                          {/* <label>Gender</label>   */}
                            <div className={ 'form-group' }>
                              <Select
                                  placeholder = "Select Gender"
                                  onChange={ (value, name) => props.handleSelectChange(value, 'gender') }
                                  options={[
                                      {label: 'Male', value: 'Male'},
                                      {label: 'Female', value: 'Female'},
                                      {label: 'Transgender', value: 'Transgender'}
                                    ]}
                                  value={props.payload.detail.gender} 
                                  name='council_id'
                                  className="common-select"
                              />
                            </div>                        
                        </div>
                        
                        <div className="col-md-6">
                          <div className={ props.payload.validate.clinic_id.isValid ? 'form-group' : 'form-group has-error' }>
                            <Select
                                placeholder = "Select clinic"
                                onChange={ (value, name) => props.handleSelectChange(value, 'clinic_id') }
                                options={props.clinicList}
                                name='clinic_id'
                                className="common-select"
                            />
                            <span className="help-block">{ props.payload.validate.clinic_id.message }</span>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label className="control-label">First Time Visit</label>
                          <div className="form-group">
                            <input type="radio" name="is_first_time" value="1" onChange = { props.handleInputChange } checked={props.payload.detail.is_first_time==1} /> Yes <input type="radio" name="is_first_time" onChange = { props.handleInputChange } value="0" checked={props.payload.detail.is_first_time==0}/> No
                          </div>                        
                        </div>
                        <div className="col-md-3">
                          <label className="control-label">Followup Appointment</label>
                          <div className="form-group">
                            <input type="radio" name="is_followup" value="1" onChange = { props.handleInputChange } checked={props.payload.detail.is_followup==1} /> Yes <input type="radio" name="is_followup" onChange = { props.handleInputChange } value="0" checked={props.payload.detail.is_followup==0}/> No
                          </div>                        
                        </div>                        

                        <div className="col-md-6">
                          <label>Select Appointment Date</label>
                          <div className="row">
                            {props.clinicSlotDate.length > 0 ?  
                              props.clinicSlotDate.filter(r => r.active === 1).map((row)=>{
                                let select = false
                                if(row.day == props.payload.detail.appointment_date){  
                                   select = true
                                }  
                                return <div className="col-md-4"><span className={select ? "timeslot" : "timeslot-not-selected"} onClick={() => props.slotDate(row.day)}>{utilityHelper.formatDate(row.day)}</span></div>
                              })
                              :
                              <div className="col-md-12">
                                <div className="mb-3">
                                  No date available
                                </div>
                              </div>
                            }
                          </div>
                        </div>


                        <div className="col-md-6">
                          <label>Select Appointment Slot</label>
                          <div className="row">
                            {props.clinicSlotManage.length > 0 ? 
                              props.clinicSlotManage.map((row)=>{
                                let select = false
                                if(row.start == props.payload.detail.appointment_time){  
                                   select = true
                                }  
                                return <div className="col-md-3">
                                  <span className={row.available === 1 ? select ? "timeslot" : "timeslot-not-selected" : "timeslot-not-select"} 
                                  onClick={() => (row.available === 1) ? props.slotTime(row.start) : ''}>{utilityHelper.formatTime(row.start)}</span></div>
                              })
                              :
                              
                              <div className="col-md-12">
                                <div className="mb-3">
                                  No time slot available
                                </div>
                              </div>
                            }
                          </div>
                        </div>

                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn-sm" onClick={props.handleClose}>Close</Button>
                    <Button className="btn-sm" onClick={props.handleSaveUpcomingAppointments}>Book</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

