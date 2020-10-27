import React from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
// import 'react-table/react-table.css';
import AudioPlayer from "react-h5-audio-player";
import { utilityHelper } from '../../_helpers';
var getUserInfo = utilityHelper.getUserInfo();

export class Liability extends React.Component {
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
                    data={this.props.liabilitylist}
                    filterable
                    defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                    columns={[
                        {
                            Header: 'User Name',
                            accessor  : "first_name",
                            filterable  : false,
                            headerClassName: 'grid-header-action',
                            className :"",
                            Cell: row =>{
                              return (
                               <div style={{'whiteSpace': 'normal'}}>
                                   {row.original.first_name} {row.original.last_name}
                              </div>)
                            }
                        },
                        {
                            Header: 'Status',
                            accessor  : "operatorname",
                            filterable  : false,
                            headerClassName: 'grid-header-action',
                            className :"",
                            Cell: row =>{
                              return (
                               <div style={{'whiteSpace': 'normal'}}>
                                   Liability
                              </div>)
                            }
                        },
                        {
                          
                            Header: 'Action',
                            accessor  : "message",
                            filterable  : false,
                            headerClassName: 'grid-header-action',
                            className :"",
                            Cell: row =>{
                              return (
                              <div style={{'whiteSpace': 'normal'}}>
                                   <a href="javascript:void(0)" 
                                      onClick={ this.props.statusShowHandle.bind(null,row.original) } 
                                      style={{"display": getUserInfo.user_type == 'operator' ? 'none' : ''}}
                                    >
                                        <span className="grey btn">Remove</span>
                                    </a>
                              </div>)
                            }
                          
                        }
                    ]}
                    defaultPageSize={10}
                    minRows= {this.props.liabilitylist}
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
