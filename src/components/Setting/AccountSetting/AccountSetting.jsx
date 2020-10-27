import React from 'react';
import {Button} from 'react-bootstrap';

export const AccountSetting = (props) => {
    return(
      <div>
        <div className="col-md-3">
          <div className="classNameroom-img">
            <div className="upload-img">
              <i className="fa fa-cloud-upload-alt fa-3x"></i><br/>
              Click her to upload image
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Rakesh shukla" disabled/>
                <label className="control-label">Full Name</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="demoemail@email.com" disabled/>
                <label className="control-label">Email</label>
              </div>
            </div>
            <div className="col-md-12 text-right">
              <div className="form-group">
                <button className="btn text-btn green">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
