import React from 'react';
// import 'react-select/dist/react-select.css';
import Dropzone from 'react-dropzone';
import {FontAwesomeIcon} from '../../global';
import {faCloudUploadAlt } from '@fortawesome/fontawesome-free-solid';
import {Alert, Button, Modal} from 'react-bootstrap';

export const Import = (props) => {
    return (
    <div>
      <Modal show={props.importShow} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ props.title } </Modal.Title>              
        </Modal.Header>
        <div className="alert-box">
            { props.message &&
                <Alert variant="success">
                        { props.message }
                </Alert>
            }           

            { props.errorMsg &&
                props.errorlist 
                    ? props.errorlist.split(',').map(place => <Alert variant="danger"> {place} </Alert>) 
                    : ''
            }
                
            {   props.successResult &&
                    props.results.length > 0 ? props.results.map(
                    result => {
                        return (
                            <div>
                                <Alert variant="success">Total { result.insert_count } records will be added</Alert>
                                <Alert variant="success">Total { result.update_count } records will be updated</Alert>
                                <Alert variant="success">Total { result.delete_count } records will be deleted</Alert>
                            </div>
                        )
                    }) : ''
            }    
        </div>      
        <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="classNameroom-img">
                  <div>
                    <Dropzone
                        multiple={false}
                        onDrop={props.onDrop.bind(this)}
                        className="drop_box"
                        maxSize={props.maxFileSize}
                    >
                    <div className="upload-icon"><FontAwesomeIcon icon={faCloudUploadAlt} /></div>
                    <p>Drag&Drop Your File(s)Here To Upload</p>
                    <span className="select-upload">Or Select File to Upload</span>
                    </Dropzone>
                  </div>
                </div>
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer>{/*&nbsp; <i className="fa fa-spinner fa-spin"></i>*/}
          <Button className="btn text-btn dark-blue pull-right" style={{display: props.skip ? 'block' : props.successResult ? 'block' : 'none' }}  disabled={ props.submitted ? true : false }  onClick={props.handleSubmit}>{props.submitted ? 'Please Wait..' : 'Save'}</Button>
          <Button className="btn text-btn btn-close mg-10 red" onClick={props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}