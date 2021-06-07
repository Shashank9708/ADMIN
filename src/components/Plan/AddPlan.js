import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6



export const AddPlan = (props) => { 
    // console.log('props===>>>',props)
    const user_type = [{
                        label: 'Doctor', value: '1'
                      },{
                        label: 'Medical', value: '3'
                      },{
                        label: 'Pathology', value: '4'
                      }]
    return (
              <div>
                <Modal size="lg" show={props.addPlanShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Plan</Modal.Title>
                    { props.messages &&
                      <Alert variant="success">
                      { props.messages }
                      </Alert>
                    }
                    { props.errorMsg &&
                      <Alert variant="danger">
                      { props.errorMsg }
                      </Alert>
                    }
                  </Modal.Header>
                  <Modal.Body>
                      <div className="row">
                        <div className="col-md-12">
                          <div className={ props.payload.validate.plan_name.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="plan_name" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Plan Name"/>
                            <span className="help-block">{ props.payload.validate.plan_name.message }</span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ 'form-group' }>
                            {/*<ReactQuill 
                              value={props.payload.details}
                              onChange={props.handleInputChange}
                              theme="snow"
                              modules={AddPlan.modules}
                              formats={AddPlan.formats}
                              placeholder={"Details"}
                             />
                             */}
                            <textarea name="details" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Plan Details"> </textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ props.payload.validate.type.isValid ? 'form-group' : 'form-group has-error' }>
                            <Select
                                placeholder = "Select User Type"
                                onChange={ (value, name) => props.handleSelectChange(value, 'type') }
                                options={user_type}
                                name='type'
                            />
                            <span className="help-block">{ props.payload.validate.type.message }</span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ props.payload.validate.days.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="days" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Plan valid days"/>
                            <span className="help-block">{ props.payload.validate.days.message }</span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ 'form-group' }>
                            <input name="price" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Price"/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className={ 'form-group' }>
                            <input name="sale_price" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Sale Price"/>
                          </div>
                        </div>
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn-sm" onClick={props.handleClose}>Close</Button>
                    <Button className="btn-sm" onClick={props.handleSavePlan}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

 /* 
  * Quill modules to attach to editor
  * See https:quilljs.com/docs/modules/ for complete options
  */
AddPlan.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
AddPlan.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]
