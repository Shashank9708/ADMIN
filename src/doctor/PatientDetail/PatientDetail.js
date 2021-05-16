import React  from 'react';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import { utilityHelper } from '../../_helpers';


function PatientDetail(
    {
      patientDetail, 
      addReferToDoctorShowHandle = () => {},
      completedApi = () => {},
      addDigitalPrescriptionShowHandle = () => {},
      actionButton = false,
      patientHistory,
    }) 
{
  var Shared = []
  var Saved = []
  if(patientHistory.length > 0 || patientHistory ){
    if(patientHistory.shared && patientHistory.shared.length > 0 ){
        if(actionButton){
          let arg = patientHistory.shared.filter(r => r.doctor_id === JSON.parse(localStorage.user).doc_id)
          Shared = arg
        }else{
          Shared = patientHistory.shared
        }
    }
    if(patientHistory.saved && patientHistory.saved.length > 0 ){
      Saved = patientHistory.saved
    }
  }


  // Set all the rows index to true
    const defaultExpandedRows = Shared.map((element, index) => {return {index: true}});
  if(patientDetail)
    return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="patient-details">
            <div className="card">
            <div className="card-body">
              <div className="card-body__profile-details-combo">                            
                <div className="card-body__profile-details-combo__profile-section">
                  <div>
                    <img className="profile-image" src={patientDetail.display_pic ? configConstants.API_BASE_PATH+"/"+patientDetail.display_pic : "https://www.michiganlutheran.org/wp-content/uploads/2019/09/placeholder-profile-sq.jpg"} />
                  </div>
                  <div>
                  {!actionButton &&
                    <button className="btn btn-sm" onClick={() => addReferToDoctorShowHandle(patientDetail)} type="button">Refer To Doctor</button>
                  }
                  </div>
                </div>
                <div className="card-body__profile-details-combo__details-section">
                  <div>Name: {patientDetail.name}</div>
                  <div>Age: {patientDetail.age ||  patientDetail.dob}</div>
                  <div>Health Problem: {patientDetail.health_problem_title}</div>
                  {!actionButton &&
                    <>
                    <div>Appointment Date: {utilityHelper.formatDate(patientDetail.appointment_date)}</div>
                    <div>Appointment Time: {utilityHelper.formatTime(patientDetail.appointment_time)}</div>
                    <div>Payment Mode: {patientDetail.appointment_type}</div>
                    <div>Clinic Name: {patientDetail.clinic_name}</div>
                    </>
                  }
                </div>
              </div>
              <div className="">
                <div className="card-body__action-btn">
                    {!actionButton &&
                      <>
                      <button className="btn btn-sm btn-block" type="button" onClick={() => addDigitalPrescriptionShowHandle(patientDetail)}>Prescription</button>
                      <button className="btn btn-sm btn-block" type="button" onClick={() => completedApi(patientDetail.appointment_id)}>Complete</button>
                      <button className="btn btn-sm btn-block" type="button">Reschedule Appointment</button>
                      </>
                    }
                </div>                          
              </div>
            </div>
          
            </div>
          </div>
        </div>
      </div>                    

      <div className="row">
        <div className="col-md-12">
          <ReactTable
              noDataText="No found !!"
              data={Shared}
              filterable
              defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
              columns={[
                  
                  {
                      Header: 'Doctor Name',
                      accessor  : "doctor_name",
                      className : 'grid-header',
                      filterable  : false,
                      filterMethod: (filter, row) => {
                          return row[filter.id].includes(filter.value);
                      }
                  },
                  {
                      Header: 'spec',
                      accessor  : "en_spec",
                      className : 'grid-header',
                      filterable  : false,
                      filterMethod: (filter, row) => {
                          return row[filter.id].includes(filter.value);
                      }
                  },
                  {
                      expander: true,
                      Header: () => <strong>Appointments</strong>,
                      width: 130,
                      Expander: ({ isExpanded, ...rest }) =>
                        <div>
                          {isExpanded
                            ? <span>&#x2299;</span>
                            : <span>&#x2295;</span>}
                        </div>,
                      style: {
                        cursor: "pointer",
                        fontSize: 25,
                        padding: "0",
                        textAlign: "center",
                        userSelect: "none"
                      }
                    }
                  
              ]}
              defaultSorted={[
                  {
                      id: "doctor_id",
                      desc: false
                  }
              ]}
              defaultPageSize={10}
              minRows= {Shared}
              className="table table-bordered responsive"
              filterable
              Sorted
              showPagination={!actionButton && (Shared.length > 10) && true}
              showPaginationTop={true}
              showPaginationBottom={false}
              pageSizeOptions={[10, 20, 50]}
              automatic // For server side pagination
              SubComponent={(v) => 
                  // renderSubTable(v.original.prescriptions)
                    <ReactTable
                      noDataText="No found !!"
                      data={v.original.prescriptions}
                      filterable
                      defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                      columns={[
                          
                          {
                              Header: 'Appointment Date',
                              accessor  : "appointment_date",
                              className : 'grid-header',
                              filterable  : false,
                              Cell: row => 
                                    <span>  { utilityHelper.formatDate(row.value) }</span>
                          },
                          {
                              Header: 'appointment_time',
                              accessor  : "appointment_time",
                              className : 'grid-header',
                              filterable  : false,
                              Cell: row => 
                                    <span>  { utilityHelper.formatTime(row.value) }</span>
                          },
                          {
                              Header: 'Payment Mode',
                              accessor  : "appointment_type",
                              className : 'grid-header',
                              filterable  : false,
                              filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                              }
                          },
                          {
                              Header: 'Clinic Name',
                              accessor  : "clinic_name",
                              className : 'grid-header',
                              filterable  : false,
                              filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                              }
                          },
                          {
                              Header: 'Status',
                              accessor  : "status",
                              className : 'grid-header list-view-booking-status__container',
                              filterable  : false,
                              filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                              }
                            },
                            {
                                Header: 'Prescription',
                                accessor  : "prescription_url",
                                filterable  : false,
                                
                                className : 'grid-header',
                                Cell: row => 
                                      <a href={ configConstants.API_BASE_PATH+"/"+row.value} target="_blank">View</a>

                            }
                          
                      ]}
                      defaultSorted={[
                          {
                              id: "appointment_id",
                              desc: false
                          }
                      ]}
                      defaultPageSize={10}
                      minRows= {v.original.prescriptions}
                      className="table table-bordered responsive"
                      filterable
                      Sorted
                      showPagination={(v.original.prescriptions.length > 10) && true}
                      showPaginationTop={false}
                      showPaginationBottom={true}
                      pageSizeOptions={[10, 20, 50]}
                      automatic // For server side pagination
                  />
              }
          />
        </div>
        {!actionButton &&   
          <div className="col-md-12">
            <ReactTable
                noDataText="No found !!"
                data={Saved}
                filterable
                defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                columns={[
                    
                    {
                        Header: 'Date',
                        accessor  : "date",
                        className : 'grid-header',
                        filterable  : false,
                        Cell: row => 
                                    <span>{ utilityHelper.formatDate(row.value) }</span>
                    },
                    {
                        Header: 'Doctor Name',
                        accessor  : "doctorname",
                        className : 'grid-header',
                        filterable  : false,
                        filterMethod: (filter, row) => {
                            return row[filter.id].includes(filter.value);
                        }
                    },
                    {
                        Header: 'Prescription',
                        accessor  : "prescription_url",
                        filterable  : false,
                        
                        className : 'grid-header',
                        Cell: row => 
                              <a href={ configConstants.API_BASE_PATH+"/"+row.value} target="_blank">View</a>

                    }
                    
                ]}
                defaultSorted={[
                    {
                        id: "appointment_id",
                        desc: false
                    }
                ]}
                defaultPageSize={10}
                minRows= {Saved}
                className="table table-bordered responsive"
                filterable
                Sorted
                // pages={this.props.pages}
                showPagination={(Saved.length > 10) && true}
                showPaginationTop={false}
                showPaginationBottom={true}
                pageSizeOptions={[10, 20, 50]}
                automatic // For server side pagination
            />
          </div>
        }         
      </div> 
    </>
  )
  return null
}

export default PatientDetail;