import React  from 'react';
import './CardComponent.scss';


  function CardComponent({appointment}) {
    return (
    <>
      <div className="card">
      <div className="card-header bg-ark">
        <div className="card-header__name"><a href="">{appointment.name}</a></div>
        <div className="card-header__action"><a href=""><i className="fa fa-times-circle" aria-hidden="true"></i></a></div>
      </div>
      <div className="card-body">
        <div className="card-body__profile-with-user-details">
          <div className="card-body__profile-with-user-details__profile">
            <a href=""><img className="card-profile-image" src="https://www.michiganlutheran.org/wp-content/uploads/2019/09/placeholder-profile-sq.jpg" /></a>
          </div>    
          <div className="card-body__profile-with-user-details__user-details">
              <div>Health Problem: {appointment.health_problem_title}</div>
              <div>Age: {appointment.age ||  appointment.dob}</div>
              <div>Appointment Date: {appointment.appointment_date}</div>
              <div>Appointment Time: {appointment.appointment_time}</div>
              <div>Payment Mode: {appointment.appointment_type}</div>
              <div>Clinic Name: {appointment.clinic_name}</div>
          </div>
        </div>
        {/* <div className="card-body__action">
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </div> */}
      </div>
      <div className="card-footer bg-transparent">
        <div className="card-footer__status-text">Status</div>
        <div className="card-footer__status-value">
          <a href=""><span className="card-footer__booked">{appointment.status}</span></a>
        </div>
      </div>
      </div>
    </>
  )}

export default CardComponent;