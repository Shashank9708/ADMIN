import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import {AddCouncilContainer} from './AddCouncilContainer';
import { councilActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'


class Council extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        this.addCouncilShowHandle = this.addCouncilShowHandle.bind(this);
        this.addCouncilHideHandle = this.addCouncilHideHandle.bind(this);

        this.getCouncilList        = this.getCouncilList.bind(this);
        this.statusShowHandle = this.statusShowHandle.bind(this);
        this.notificationSearch         = this.notificationSearch.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addCouncilShow: false
        }
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addCouncilShowHandle() {
       this.setState({ addCouncilShow: true });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addCouncilHideHandle() {
       this.setState({ addCouncilShow: false });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to redirect unauthorise users
     * @return                Redirect
     */
    componentDidUpdate(){
        const { dispatch }  = this.props;
        if(this.props.isUserNotValid){
           dispatch(headerActions.logout());
        }
    }

    /**
    * @DateOfCreation        26 July 2018
    * @ShortDescription      This function is responsible to get the list of notification from API
    * @return                Nothing
    */
    getCouncilList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(councilActions.getCouncilList(page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
    statusShowHandle(council_id, status) {
        var json = {'council_id':council_id,'status':status}
        const { dispatch } = this.props;
        dispatch(councilActions.statusChange(json));

    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle load filtered notification list
     * @return                Nothing
    */
    notificationSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
    }

    /**
   * @DateOfCreation        28 June 2018
   * @ShortDescription      This function is responsible to close import model.
   * @return                Nothing
  */
    UNSAFE_componentWillReceiveProps(newProps) {
        
        if(newProps.status == true){
            setTimeout(function() { 
                const { dispatch } = this.props;
                dispatch(councilActions.resetCouncilState())

                this.getCouncilList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
    }

    render() {
        // var fileSize = parseInt(configConstants.MAX_FILE_SIZE);
        return (
            <>
                <HeaderContainer />
                <div className="container-fluid">
                   <div className="row">
                      <SideMenu/>
                      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                          <div className="page-heading">
                            <div className="page-heading__title-container">
                                <h1 className="page-heading__title">Council</h1>
                            </div>
                            <div className="page-heading__btn-container">
                              <button className="page-heading__btn btn-sm" onClick={this.addCouncilShowHandle}>Add New</button>
                            </div>
                          </div>
                          <div className="row">
                              
                              <ReactTable
                                  noDataText="No found !!"
                                  data={this.props.councilList}
                                  filterable
                                  defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                  filtered={this.state.filtered}
                                  columns={[
                                      {
                                          Header      : "Council ID",
                                          accessor    : "council_id",
                                          className   : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                          Header    : "Title",
                                          accessor  : "council_title",
                                          className : "grid-header",
                                          filterable  : false,
                                          filterMethod: (filter, row) => {
                                              return row[filter.id].includes(filter.value);
                                          }
                                      },
                                      {
                                        Header: 'Status',
                                        accessor  : "status",
                                        filterable  : false,
                                        
                                        className : 'grid-header',
                                        Cell: row => {
                                                return  (
                                                    <div>
                                                    {
                                                      row.value === 1 ?
                                                      <a href="javascript:void(0)" 
                                                        className="btn"
                                                        onClick={ this.statusShowHandle.bind(null,row.original.council_id,0) } 
                                                        disabled={ this.props.submitted ? true : false }>
                                                          <span className="btn btn-success">Active</span>
                                                      </a>
                                                      :
                                                      <a href="javascript:void(0)" 
                                                        className="btn"
                                                        onClick={ this.statusShowHandle.bind(null,row.original.council_id,1) } 
                                                        disabled={ this.props.submitted ? true : false }>
                                                          <span className="grey btn">Inactive</span>   
                                                      </a>
                                                    }
                                                    </div>
                                                )}
                                      }
                                      
                                  ]}
                                  defaultSorted={[
                                      {
                                          id: "council_id",
                                          desc: false
                                      }
                                  ]}
                                  defaultPageSize={10}
                                  minRows= {this.props.councilList}
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
                                      this.getCouncilList(state.page, state.pageSize, state.sorted, state.filtered);
                                  }}
                              />
                          </div>
                      </main>
                      <AddCouncilContainer
                        addCouncilShow = {this.state.addCouncilShow}
                        addCouncilHideHandle = {this.addCouncilHideHandle}
                      />
                    </div>
                </div>    
            </>
        );
    }
}

/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for notification list
 * @return                notification list and loader
 */

function mapStateToProps(state) {
   const { councilList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status } = state.councilReducer;
   // console.log('councilList',councilList)
    return {
        councilList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status
    };
}
const connectedCouncil = connect(mapStateToProps)(Council);
export { connectedCouncil as Council };
