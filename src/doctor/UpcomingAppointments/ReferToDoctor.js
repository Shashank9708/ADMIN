import React from "react";
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select, {components} from 'react-select'
import { configConstants } from '../../_constants';


export const ReferToDoctor = (props) => {  


  const formatOptionLabel = (props) => 
  {
    return(
      <div style={{ display: "flex" }}>
        <div><img src={configConstants.API_BASE_PATH+"/"+props.display_pic} width={'25px'}/> {props.name}</div>
        <div style={{ marginLeft: "10px", color: "#ccc" }}>
          
        </div>
      </div>
    )
  }
 
  return (
    <div>
      <Modal show={props.addReferToDoctorShow} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Refer To Doctor</Modal.Title>
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
            <Select
               name="referTOdoctor"
               className='form-group'
               onChange={(value, name) => props.handleSelectDoctor(value, 'referTOdoctor')}
               formatOptionLabel={formatOptionLabel}
               options={props.favoriteList}
             />
          
          </div>
        </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
          <Button className="btn text-btn green" onClick={props.handleReferToDoctor}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}