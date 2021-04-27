// import React from 'react';
import React, {useState, useRef} from 'react';

import {Alert, Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import Select from 'react-select'
import JoditEditor from "jodit-react";



export const AddProducts = (props) => { 

  // const editor = useRef(null)
  // const [content, setContent] = useState('')
  
    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }
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
                            <JoditEditor
                                value={props.payload.detail.content}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={event => props.onContentStateChange(event.target.innerHTML)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {}}
                            />
                        </div>                          

                        <div className="col-md-12">
                          <div className='form-group'>
                            <input name="product_description" type="text" className="form-control" onChange = { props.handleInputChange } placeholder="Product Description"/>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className={ props.payload.validate.quantity.isValid ? 'form-group' : 'form-group has-error' }>
                            <input min='0' name="quantity" type="number" className="form-control" onChange = { props.handleInputChange } placeholder="quantity"/>
                            <span className="help-block">{ props.payload.validate.quantity.message }</span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className={ props.payload.validate.price.isValid ? 'form-group' : 'form-group has-error' }>
                            <input min='0' name="price" type="number" className="form-control" onChange = { props.handleInputPriceChange } placeholder="price"/>
                            <span className="help-block">{ props.payload.validate.price.message }</span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className='form-group'>
                            <input min='0' name="discount_percent" type="number" className="form-control" onChange = { props.handleInputPriceChange } placeholder="Product discount percent"/>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className='form-group'>
                            <input min='0' name="sale_price" value={props.payload.detail.sale_price} type="number" className="form-control" placeholder="Product selling price" readOnly/>
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
                    <Button className="btn-sm" onClick={props.handleClose}>Close</Button>
                    <Button className="btn-sm" onClick={props.handleSaveProducts}>Save</Button>
                  </Modal.Footer>
                </Modal>
              </div>
      );
}

