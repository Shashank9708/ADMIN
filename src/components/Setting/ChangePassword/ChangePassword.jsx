import React from 'react';
import {Button} from 'react-bootstrap';

export const ChangePassword = (props) => {
    return(
      <div>
        <div className="clearfix">
          <div className="col-md-4">
            <div className="form-group">
              <input className="form-control" type="password" name="dr_old_pass" id="dr_old_pass" placeholder="Password"/>
              <label className="control-label">Old password</label>
            </div>
          </div>
        </div>
        <div className="clearfix">
          <div className="col-md-4">
            <div className="form-group">
              <input className="form-control" type="password" name="dr_new_pass" id="dr_new_pass" placeholder="New password"/>
              <label className="control-label">New password</label>
            </div>
          </div>
        </div>
        <div className="clearfix">
          <div className="col-md-4">
            <div className="form-group">
              <input className="form-control" type="password" name="dr_confirm" id="dr_confirm" placeholder="Confirm password"/>
              <label className="control-label">Confirm password</label>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <button className="blue btn text-btn" id="dr_pass_reset">Reset</button>
            <button className="green btn text-btn" id="dr_pass_change">Change</button>
          </div>
        </div>

      </div>
    );
  }
