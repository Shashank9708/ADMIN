import React from 'react';
import {Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select';


export class Status extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handle_close = this.handle_close.bind(this);
  }

handle_close() {
  this.props.onClose();
}

render() {
  
  return (
    <div>
      <Modal show={this.props.onClick} onHide={this.handle_close}>
        <Modal.Header closeButton>
          <Modal.Title>Change Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <div className="row" onChange={this.props.onChange.bind(this)}>
              <div className="col-md-4">
                <div className="form-group">
                  <input type="radio" name="status" value="active" 
                       checked={'active' === this.props.payroll.status} 
                  />
                  <label className="control-label">Active</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input type="radio" name="status" value="inactive"
                       checked={'inactive' === this.props.payroll.status}    
                  />
                  <label className="control-label">Inactive</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input type="radio" name="status" value="suspended"
                       checked={'suspended' === this.props.payroll.status} 
                  />
                  <label className="control-label">Suspended</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Modal.Body>
      </Modal>
    </div>
    );
  }
}
