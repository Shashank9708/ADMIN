import React from 'react';
import {Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select';


export class Status extends React.Component {
  constructor(props) {
    super(props);
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
                  <input type="radio" name="status" value="1" 
                       checked={1 === this.props.payroll.status} 
                  />
                  <label className="control-label">Approved</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input type="radio" name="status" value="0"
                       checked={this.props.payroll.status === null || 0 === this.props.payroll.status}    
                  />
                  <label className="control-label">Unapproved</label>
                </div>
              </div>
              {/*<div className="col-md-4">
                <div className="form-group">
                  <input type="radio" name="status" value="2"
                       checked={'2' === this.props.payroll.status} 
                  />
                  <label className="control-label">Suspended</label>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
        </Modal.Body>
      </Modal>
    </div>
    );
  }
}
