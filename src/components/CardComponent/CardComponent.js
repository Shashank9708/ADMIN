import React  from 'react';
import './CardComponent.scss';


  function CardComponent() {
    return (
    <>
      <div className="card">
      <div className="card-header bg-ark">
        <div className="card-header__name"><a href="">Chetan Wagh</a></div>
      </div>
      <div className="card-body">
        <div className="card-body__profile-with-user-details">
          <div className="card-body__profile-with-user-details__profile">
            <a href=""><img className="card-profile-image" src="https://www.michiganlutheran.org/wp-content/uploads/2019/09/placeholder-profile-sq.jpg" /></a>
          </div>    
          <div className="card-body__profile-with-user-details__user-details">
              <div>Health Problem: Thyroid</div>
              <div>Age: 23</div>
              <div>Appointment Date: 2021-04-13</div>
              <div>Appointment Time: 11:30:00</div>
              <div>Payment Mode: cash</div>
              <div>Clinic Name: Agastya Clinic</div>
          </div>
        </div>
        <div className="card-body__action">
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </div>
      </div>
      <div className="card-footer bg-transparent">
        <div className="card-footer__status-text">Status</div>
        <div className="card-footer__status-value">
          <a href=""><span className="card-footer__booked">Booked</span></a>
        </div>
      </div>
      </div>
    </>
  )}

export default CardComponent;