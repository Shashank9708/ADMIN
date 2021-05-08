import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select'
import {CreateOptions} from '../../_helpers/helper'

export const AddClinicSlot = (props) => { 

    return (
              <div>
                <Modal show={props.addClinicSlotShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Clinic Slot</Modal.Title>
                   
                  </Modal.Header>
                  <Modal.Body>
                      <div className="row">

                        <div className="col-md-12">
                          
                          <div className={ 'form-group' }>
                            <Select
                                placeholder = "Select clinic"
                                onChange={ (value, name) => props.handleSelectChange(value, 'clinic_id') }
                                options={props.clinicList}
                                name='clinic_id'
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className='form-group'>
                            <Select
                              placeholder = "Select Slot"
                              options={[
                                  {label: 'Monday', value: 'Monday'},
                                  {label: 'Tuesday', value: 'Tuesday'},
                                  {label: 'Wednesday', value: 'Wednesday'},
                                  {label: 'Thursday', value: 'Thursday'},
                                  {label: 'Friday', value: 'Friday'},
                                  {label: 'Saturday', value: 'Saturday'},
                                  {label: 'Sunday', value: 'Sunday'},
                                ]}
                              name='slot_id'
                              className="selectOption"
                              onChange={ (value, name) => props.handleSelectChange(value, 'slot_id') }
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className='form-group'>
                            <Select
                              placeholder = "Start Time"
                              options={CreateOptions(props.payload.time)}
                              name='from_time'
                              className="selectOption"
                              onChange={ (value, name) => props.handleSelectChange(value, 'from_time') }
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className='form-group'>
                            <Select
                              placeholder = "End Time"
                              options={CreateOptions(props.payload.time)}
                              name='to_time'
                              className="selectOption"
                              onChange={ (value, name) => props.handleSelectChange(value, 'to_time') }
                            />
                          </div>
                        </div>

                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn-sm" onClick={props.handleClose}>Close</Button>
                    <Button className="btn-sm" onClick={props.handleClinicSlotSave}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

