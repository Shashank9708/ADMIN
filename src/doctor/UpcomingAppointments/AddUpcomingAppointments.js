import React from 'react';
import {Alert, Button, Modal, Card, title} from 'react-bootstrap';
import Select from 'react-select'
import { utilityHelper } from '../../_helpers';


export const AddUpcomingAppointments = (props) => { 
    
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
                        <div className="col-md-12">
                          <div className={ props.payload.validate.contact_no.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="contact_no" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Mobile Number"/>
                            <span className="help-block">{ props.payload.validate.contact_no.message }</span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className={ props.payload.validate.name.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="name" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Patient Name"/>
                            <span className="help-block">{ props.payload.validate.name.message }</span>
                          </div>
                        </div>
                        

                        <div className="col-md-12">
                          
                          <div className={ props.payload.validate.health_problem_id.isValid ? 'form-group' : 'form-group has-error' }>
                            <Select
                                placeholder = "Select health problem"
                                onChange={ (value, name) => props.handleSelectChange(value, 'health_problem_id') }
                                options={props.healthProblem}
                                name='health_problem_id'
                            />
                            <span className="help-block">{ props.payload.validate.health_problem_id.message }</span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          
                          <div className={ props.payload.validate.clinic_id.isValid ? 'form-group' : 'form-group has-error' }>
                            <Select
                                placeholder = "Select clinic"
                                onChange={ (value, name) => props.handleSelectChange(value, 'clinic_id') }
                                options={props.clinicList}
                                name='clinic_id'
                            />
                            <span className="help-block">{ props.payload.validate.clinic_id.message }</span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <label>Select Appointment Date</label>
                          <div className="row">
                            {props.clinicSlotDate.length > 0 ?  
                              props.clinicSlotDate.filter(r => r.active === 1).map((row)=>{
                                let select = false
                                if(row.day == props.payload.detail.appointment_date){  
                                   select = true
                                }  
                                return <div className="col-md-2"><span className={select ? "timeslot" : "timeslot-not-selected"} onClick={() => props.slotDate(row.day)}>{utilityHelper.formatDate(row.day)}</span></div>
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


                        <div className="col-md-12">
                          <label>Select Appointment Slot</label>
                          <div className="row">
                            {props.clinicSlotManage.length > 0 ? 
                              props.clinicSlotManage.map((row)=>{
                                let select = false
                                if(row.start == props.payload.detail.appointment_time){  
                                   select = true
                                }  
                                return <div className="col-md-2">
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

