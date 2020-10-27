import React from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
// import 'react-table/react-table.css';
import AudioPlayer from "react-h5-audio-player";

export class Complaint extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);

    }

    
    render() {
        
        return (
            <div className="page-container">
              <div className="table-wrap">
                
                <ReactTable
                    noDataText="No found !!"
                    data={this.props.complaint}
                    filterable
                    defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                    columns={[
                        {
                            Header: 'User Name',
                            accessor  : "username",
                            filterable  : false,
                            headerClassName: 'grid-header-action',
                            className :"",
                            Cell: row =>{
                              return (
                               <div style={{'whiteSpace': 'normal'}}>
                                   {row.original.username}
                              </div>)
                            }
                        },
                        {
                            Header: 'Operator Name',
                            accessor  : "operatorname",
                            filterable  : false,
                            headerClassName: 'grid-header-action',
                            className :"",
                            Cell: row =>{
                              return (
                               <div style={{'whiteSpace': 'normal'}}>
                                   {row.original.operatorname}
                              </div>)
                            }
                        },
                        {
                            Header: 'Message',
                            accessor  : "message",
                            filterable  : false,
                            headerClassName: 'grid-header-action',
                            className :"",
                            Cell: row =>{
                              return (
                                  <div style={{'whiteSpace': 'normal'}}>
                                    {row.original.message_type == "image" ?
                                        <img src={row.original.message} />
                                      : row.original.message_type == "voice" ? 
                                        <AudioPlayer
                                          src={row.original.message}
                                          onPlay={e => console.log("onPlay")}
                                        />
                                      :
                                      row.original.message
                                  } 
                                  </div>
                              )
                            }
                        }
                    ]}
                    defaultPageSize={10}
                    minRows= {this.props.complaint}
                    className="table table-bordered responsive"
                    Sorted
                    showPagination={true}
                    showPaginationTop={true}
                    showPaginationBottom={false}
                    pageSizeOptions={[10, 20, 50]}
                    automatic // For server side pagination
                />
              </div>              
            </div>

        );
    }
}
