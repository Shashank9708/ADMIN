import React from 'react';
import {Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import SmartDataTable from 'react-smart-data-table'
import 'react-smart-data-table/dist/react-smart-data-table.css'


export class Clinic extends React.Component {
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
      <Modal show={this.props.onClick} onHide={this.handle_close} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View Clinic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <SmartDataTable
            data={this.props.clinics}
            name="test-table"
            className="ui compact selectable table"
            sortable

          />
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn text-btn red" onClick={this.handle_close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }
}
