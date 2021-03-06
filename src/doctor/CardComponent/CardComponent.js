import React  from 'react';
import './CardComponent.scss';
import { configConstants } from '../../_constants';
import { utilityHelper } from '../../_helpers';


function CardComponent({appointment, handleClick = () => {}, active = false, actionButton = true, cancelAll = () => {}}) {
    return (
    <>
      <div className="card" key={appointment.appointment_id}>
      <div className={appointment.appointment_id === active ? "card-header active-card" : "card-header bg-ark" }>
        <div className="card-header__name"><a href="#" onClick={() => handleClick(appointment)}>{appointment.name}</a></div>
        <div className="card-header__action"><a href="#" onClick={() => appointment.status !== "completed" && cancelAll(appointment)}><i className="fa fa-times-circle" aria-hidden="true"></i></a></div>
      </div>
      <div className="card-body">
        <div className="card-body__profile-with-user-details">
          <div className="card-body__profile-with-user-details__profile">
            <a href=""><img className="card-profile-image" src={appointment.display_pic ? configConstants.API_BASE_PATH+"/"+appointment.display_pic : "https://www.michiganlutheran.org/wp-content/uploads/2019/09/placeholder-profile-sq.jpg"} /></a>
          </div>    
          <div className="card-body__profile-with-user-details__user-details">
              <div>Purpose: {appointment.purpose}</div>
              <div>Age: {appointment.age ||  appointment.dob}</div>
              {actionButton &&
                <>
                <div>Appointment Date: { utilityHelper.formatDate(appointment.appointment_date) }</div>
                <div>Appointment Time: { utilityHelper.formatTime(appointment.appointment_time) }</div>
                <div>Appointment Type: {appointment.appointment_method == 0 ? "In Clinic" : "Video"}</div>
                <div>Payment Mode: {appointment.appointment_type}</div>
                <div>Clinic Name: {appointment.clinic_name}</div>
                </>
              }
          </div>
        </div>
        {/* <div className="card-body__action">
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </div> */}
      </div>
      {actionButton &&
        <div className="card-footer bg-transparent">
          <div className="card-footer__status-text">{appointment.status === "completed" ? "Prescrption" : "Status" }</div>
          <div className="card-footer__status-value">
          {appointment.status === "completed" ?
            <a href={configConstants.API_BASE_PATH+"/"+appointment.prescription_url} target="_blank"><span className="card-footer__booked">View</span></a>
            :
            <a href=""><span className="card-footer__booked">{appointment.status}</span></a>
          }
          </div>
        </div>
      }
      </div>
    </>
  )}

export default CardComponent;

