import React from 'react';
import {Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select';
import { utilityHelper } from '../../_helpers';


export class EditView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handle_close = this.handle_close.bind(this);
  }

handle_close() {
  this.props.onClose();
}
render() {

  var getUserInfo = utilityHelper.getUserInfo();
        
  return (
    <div>
      <Modal show={this.props.onClick} onHide={this.handle_close}>
        <Modal.Header closeButton>
          <Modal.Title>{ this.props.displayView == 'edit' ? 'Edit User' : 'View'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input name="first_name" type="text" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.first_name} placeholder="First Name" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">First Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input name="last_name" type="text" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.last_name} placeholder="Last Name" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Last Name</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <input name="mobile" type="text" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.mobile} placeholder="Mobile" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Mobile No</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <input name="email" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.email} placeholder="firstname@email.com" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Email</label>
                </div>
              </div>
              {getUserInfo.user_type == 'operator' ?
              <div className="col-md-12">
                <div className="form-group">
                  <input name="password" type="text" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.password} placeholder="Password" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Password</label>
                </div>
              </div> : ""
              }
            </div>
          </div>
          <hr/>
          <div className="col-md-12">
            <h4>Cars</h4>
          </div>

          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <input name="vehicle_registration1" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.vehicle_registration1} placeholder="Registration No" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Registration No1</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input name="vehicle_mac1" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.vehicle_mac1} placeholder="Mac" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Mac1</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input name="vehicle_model1" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.vehicle_model1} placeholder="Model" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Model1</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <input name="vehicle_registration2" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.vehicle_registration2} placeholder="Registration No" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Registration No2</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input name="vehicle_mac2" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.vehicle_mac2} placeholder="Mac" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Mac2</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input name="vehicle_model2" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.vehicle_model2} placeholder="Model" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Model2</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <input name="vehicle_registration3" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.vehicle_registration3} placeholder="Registration No" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Registration No3</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input name="vehicle_mac3" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.vehicle_mac3} placeholder="Mac" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Mac3</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input name="vehicle_model3" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.vehicle_model3} placeholder="Model" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Model3</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <input name="vehicle_registration4" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.vehicle_registration4} placeholder="Registration No" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Registration No4</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input name="vehicle_mac4" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.vehicle_mac4} placeholder="Mac" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Mac4</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input name="vehicle_model4" type="email" className="form-control" onChange = { this.props.handleInputChange } value={this.props.payroll.editdata.vehicle_model4} placeholder="Model" readOnly = { this.props.displayView == 'edit' ? '' : 'readOnly'}/>
                  <label className="control-label">Model4</label>
                </div>
              </div>
            </div>
          </div>


        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-sm" onClick={this.handle_close}>Close</Button>
          <Button className="btn-sm" onClick={this.props.onSave} style = {{ display: this.props.displayView == 'edit' ? '' : 'none'}}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }
}
