import React from 'react';
import {Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select';


export class ReNew extends React.Component {
  constructor(props) {
    super(props);
    this.handle_close = this.handle_close.bind(this);
  }

handle_close() {
  this.props.onClose();
}

render() {
  const paymentOption = [
            { label: 'Online', value: 'Online' },
            { label: 'Cash', value: 'Cash' },
            { label: 'Cheque', value: 'Cheque' }
          ]
  console.log("planList",this.props.planList)
  return (
    <div>
      <Modal show={this.props.onClick} onHide={this.handle_close}>
        <Modal.Header closeButton>
          <Modal.Title>Renew Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <div className={ 'form-group' }>
              <Select
                  placeholder = "Select Plan"
                  onChange={ (value, name) => this.props.handleSelectChange(value, 'plan_id') }
                  options={this.props.planList}
                  name='plan_id'
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className={ 'form-group' }>
              <Select
                  placeholder = "Select Payment Type"
                  onChange={ (value, name) => this.props.handleSelectChange(value, 'payment_type') }
                  options={paymentOption}
                  name='payment_type'
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className={ 'form-group' }>
              <input name="transaction_id" type="text" className="form-control" onChange = { this.props.handleInputChange } placeholder="Transaction Number or Cheque Number"/>
            </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn text-btn red" onClick={this.props.handleClose}>Close</Button>
          <Button className="btn text-btn green" onClick={this.props.reNewSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }
}
