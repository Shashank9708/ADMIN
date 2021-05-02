import React from 'react';
import {Button} from 'react-bootstrap';

export const SchoolDetails = (props) => {
    return(
      <div>
        <div className="col-md-3">
          <div className="classNameroom-img">
            <div className="upload-img">
              <i className="fa fa-cloud-upload-alt fa-3x"></i><br/>
              Click her to upload logo
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="School Name"/>
                <label className="control-label">School Name</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Contact First Name"/>
                <label className="control-label">Contact First Name</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Contact Last Name"/>
                <label className="control-label">Contact Last Name</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="demoemail@email.com"/>
                <label className="control-label">Email</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="01234567890"/>
                <label className="control-label">Contact Phone</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Address1"/>
                <label className="control-label">Address 1</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Address2"/>
                <label className="control-label">Address 2</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="State"/>
                <label className="control-label">State</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="City"/>
                <label className="control-label">City</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="452001"/>
                <label className="control-label">Postcode</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="80"/>
                <label className="control-label">School Capacity</label>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <div className="checkbox-section">
                  <label><input type="checkbox" className="option-input"/><span>Sent invoice notification to parent</span></label>
                </div>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="A new invoice had been loaded and due for payment."/>
                <label className="control-label">Notification message for invoice</label>
              </div>
            </div>
            <div className="col-md-4">
            </div>
            <div className="col-md-12 text-right">
              <div className="form-group">
                <button className="btn-sm">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
