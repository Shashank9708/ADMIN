import React from 'react';
import {Alert, Button, Modal, Card, title} from 'react-bootstrap';
import Select from 'react-select'



export const AddUpcomingAppointments = (props) => { 
    
    return (
              <div>
                <Modal show={props.addUpcomingAppointmentsShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add New Upcoming Appointments</Modal.Title>
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
                          <div className={ props.payload.validate.name.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="name" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Patient Name"/>
                            <span className="help-block">{ props.payload.validate.name.message }</span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ props.payload.validate.contact_no.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="contact_no" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Mobile Number"/>
                            <span className="help-block">{ props.payload.validate.contact_no.message }</span>
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
                              props.clinicSlotDate.map((row)=>{
                                let select = false
                                if(row.day == props.payload.detail.appointment_date){  
                                   select = true
                                }  
                                return <div className="col-md-3"><span className={select ? "timeslot-selected" : "timeslot"} onClick={() => props.slotDate(row.day)}>{row.day}</span></div>
                              })
                              :
                              <div>No Date available</div>
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
                                return <div className="col-md-3"><span className={row.available === 1 ? select ? "timeslot-selected" : "timeslot" : "timeslot-not-selected"} onClick={() => props.slotTime(row.start)}>{row.start}</span></div>
                              })
                              :
                              <div>No Time Slot available</div>
                            }
                          </div>
                        </div>

                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
                    <Button className="btn text-btn green" onClick={props.handleSaveUpcomingAppointments}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

