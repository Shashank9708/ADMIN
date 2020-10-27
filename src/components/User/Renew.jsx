    import React from 'react';
import {Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select';


export class Renew extends React.Component {
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
          <Modal.Title>Renew Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <div className="row" onChange={this.props.onChange.bind(this)}>
              <div className="col-md-4">
                <div className="form-group">
                  <input type="radio" name="package_type" value="30"
                       checked={30 == this.props.payroll.package_type} 
                  />
                  <label className="control-label">30</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input type="radio" name="package_type" value="60" 
                       checked={60 == this.props.payroll.package_type} 
                  />
                  <label className="control-label">60</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input type="radio" name="package_type" value="90" 
                       checked={90 == this.props.payroll.package_type} 
                  />
                  <label className="control-label">90</label>
                </div>
              </div>
            </div>  
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn text-btn red" onClick={this.handle_close}>Close</Button>
          <Button className="btn text-btn green" onClick={this.props.onSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }
}
