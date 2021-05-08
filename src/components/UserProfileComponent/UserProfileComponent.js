import React  from 'react';
import './UserProfileComponent.scss';


  function UserProfileComponent() {
    return (
    <>
      <div className="user-profile-container">
        <div className="user-profile-container__profile-image">
            <img src="https://www.michiganlutheran.org/wp-content/uploads/2019/09/placeholder-profile-sq.jpg" />
        </div>
        <div className="user-profile-container__profile-details">
            <div className="user-profile-container__profile-details__username">
              Chetan Wagh
            </div>
            <div className="user-profile-container__profile-details__user-contact-number">
                012345689
            </div>
        </div>
      </div>
    </>
  )}

export default UserProfileComponent;