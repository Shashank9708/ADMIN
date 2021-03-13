import React from 'react';
import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export const AddProducts = (props) => { 

    return (
              <div>
                <Modal show={props.addProductsShow} onHide={props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Products</Modal.Title>
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
                          
                          <div className={ props.payload.validate.category_id.isValid ? 'form-group' : 'form-group has-error' }>
                            <Select
                                placeholder = "Select Product Category"
                                onChange={ (value, name) => props.handleSelectChange(value, 'category_id') }
                                options={props.productCategoriesList}
                                name='category_id'
                            />
                            <span className="help-block">{ props.payload.validate.category_id.message }</span>
                          </div>
                        </div>


                        <div className="col-md-12">
                          <div className={ props.payload.validate.product_name.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="product_name" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Title"/>
                            <span className="help-block">{ props.payload.validate.product_name.message }</span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <Editor 
                            initialContentState={props.payload.detail.contentState}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            onContentStateChange={props.onContentStateChange}
                          />
                        </div>                          

                        <div className="col-md-12">
                          <div className='form-group'>
                            <input name="product_description" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Product Description"/>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className={ props.payload.validate.quantity.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="quantity" type="number" className="form-control" onChange = { props.handleInputChange } placeholder="quantity"/>
                            <span className="help-block">{ props.payload.validate.quantity.message }</span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className={ props.payload.validate.price.isValid ? 'form-group' : 'form-group has-error' }>
                            <input name="price" type="number" className="form-control" onChange = { props.handleInputPriceChange } placeholder="price"/>
                            <span className="help-block">{ props.payload.validate.price.message }</span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className='form-group'>
                            <input name="discount_percent" type="number" className="form-control" onChange = { props.handleInputPriceChange } placeholder="Product discount percent"/>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className='form-group'>
                            <input name="sale_price" value={props.payload.detail.sale_price} type="number" className="form-control" placeholder="Product selling price" readOnly/>
                          </div>
                        </div>


                        <div className="col-md-12">
                          <div className={ 'form-group'}>
                            <input name="product_image" type="file" className="form-control" onChange = { props.handleFileChange }/>
                          </div>
                        </div>
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
                    <Button className="btn text-btn green" onClick={props.handleSaveProducts}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

