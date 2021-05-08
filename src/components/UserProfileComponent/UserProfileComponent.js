import React  from 'react';
import './UserProfileComponent.scss';
import { configConstants } from '../../_constants';

  function UserProfileComponent({name, display_pic, contact_no}) {
    return (
    <>
      <div className="user-profile-container">
        <div className="user-profile-container__profile-image">
            <img src={configConstants.API_BASE_PATH+"/"+display_pic} />
        </div>
        <div className="user-profile-container__profile-details">
            <div className="user-profile-container__profile-details__username">
              {name}
            </div>
            <div className="user-profile-container__profile-details__user-contact-number">
              <i className="fa fa-phone" aria-hidden="true"></i> {contact_no}
            </div>
        </div>
      </div>
    </>
  )}

export default UserProfileComponent;