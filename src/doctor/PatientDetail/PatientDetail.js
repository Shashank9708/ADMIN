import React  from 'react';


function PatientDetail(
    {
      patientDetail, 
      addReferToDoctorShowHandle = () => {},
      completedApi = () => {},
      addDigitalPrescriptionShowHandle = () => {},
    }) 
{
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
                    <img className="profile-image" src="https://www.michiganlutheran.org/wp-content/uploads/2019/09/placeholder-profile-sq.jpg" />
                  </div>
                  <div>
                    <button className="btn btn-sm" onClick={() => addReferToDoctorShowHandle(patientDetail)} type="button">Refer To Doctor</button>
                  </div>
                </div>
                <div className="card-body__profile-details-combo__details-section">
                  <div>Name: {patientDetail.name}</div>
                  <div>Age: {patientDetail.age ||  patientDetail.dob}</div>
                  <div>Health Problem: {patientDetail.health_problem_title}</div>
                  <div>Appointment Date: {patientDetail.appointment_date}</div>
                  <div>Appointment Time: {patientDetail.appointment_time}</div>
                  <div>Payment Mode: {patientDetail.appointment_type}</div>
                  <div>Clinic Name: {patientDetail.clinic_name}</div>

                </div>
              </div>
              <div className="">
                <div className="card-body__action-btn">
                    <button className="btn btn-sm btn-block" type="button">Medical History</button>
                    <button className="btn btn-sm btn-block" type="button" onClick={() => addDigitalPrescriptionShowHandle(patientDetail)}>Prescription</button>
                    <button className="btn btn-sm btn-block" type="button" onClick={() => completedApi(patientDetail.appointment_id)}>Complete</button>
                </div>                          
              </div>
            </div>
          
            </div>
          </div>
        </div>
      </div>                    

      <div className="row">
        <div className="col-md-12">
          {/*<ReactTable
              noDataText="No found !!"
              data={this.props.doctorAppoinementList}
              filterable
              defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
              filtered={this.state.filtered}
              columns={[
                  
                  {
                      Header: 'Patient Name',
                      accessor  : "name",
                      className : 'grid-header',
                      filterable  : false,
                      filterMethod: (filter, row) => {
                          return row[filter.id].includes(filter.value);
                      }
                  },
                  {
                      Header: 'Health Problem',
                      accessor  : "health_problem_title",
                      className : 'grid-header',
                      filterable  : false,
                      filterMethod: (filter, row) => {
                          return row[filter.id].includes(filter.value);
                      }
                  },
                  {
                      Header: 'Appointment Date',
                      accessor  : "appointment_date",
                      className : 'grid-header',
                      filterable  : false,
                      filterMethod: (filter, row) => {
                          return row[filter.id].includes(filter.value);
                      }
                  },
                  {
                      Header: 'Appointment Time',
                      accessor  : "appointment_time",
                      className : 'grid-header',
                      filterable  : false,
                      filterMethod: (filter, row) => {
                          return row[filter.id].includes(filter.value);
                      }
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
                        accessor  : "appointment_id",
                        filterable  : false,
                        
                        className : 'grid-header',
                        Cell: row => 
                              <div className="list-view-action-btn__container">
                                  <i className="fa fa-file" aria-hidden="true"></i>
                              </div>

                    }
                  
              ]}
              defaultSorted={[
                  {
                      id: "appointment_id",
                      desc: false
                  }
              ]}
              defaultPageSize={10}
              minRows= {this.props.doctorAppoinementList}
              className="table table-bordered responsive"
              loading={this.state.loading}
              filterable
              Sorted
              // pages={this.props.pages}
              showPagination={true}
              showPaginationTop={true}
              showPaginationBottom={false}
              pageSizeOptions={[10, 20, 50]}
              automatic // For server side pagination
              onFetchData={(state, instance) => {
                  this.getUpcomingAppointmentsList(state.page, state.pageSize, state.sorted, state.filtered);
              }}
          />*/}
        </div>                    
      </div> 
    </>
  )
  return null
}

export default PatientDetail;