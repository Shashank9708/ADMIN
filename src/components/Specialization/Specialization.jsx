import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import {AddSpecializationContainer} from './AddSpecializationContainer';
import { specializationActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'


class Specialization extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);
        this.addSpecializationShowHandle = this.addSpecializationShowHandle.bind(this);
        this.addSpecializationHideHandle = this.addSpecializationHideHandle.bind(this);

        this.getSpecializationList        = this.getSpecializationList.bind(this);
        this.notificationSearch         = this.notificationSearch.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addSpecializationShow: false
        }
    }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle open import modal
     * @return                Nothing
     */
     addSpecializationShowHandle() {
       this.setState({ addSpecializationShow: true });
     }

    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      This function is responsible to handle close modal
     * @return                Nothing
     */
     addSpecializationHideHandle() {
       this.setState({ addSpecializationShow: false });
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
    getSpecializationList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(specializationActions.getSpecializationList(page, pageSize, sorted, filtered));
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

    render() {
        var fileSize = parseInt(configConstants.MAX_FILE_SIZE);
        return (
            <div className="page-container">
                <HeaderContainer />
                <div className="container-fluid">
                   <div className="row">
                      <div className="col-md-2.5">
                       <SideMenu/>
                      </div>
                      <div className="col-md-9">
                        <div className="main-content">
                            <div className="wrap-inner-content">
                                <div className="col-md-12">
                                <div className="inner-content">
                                        <div className="row page-header">
                                            <div className="col-md-6">
                                                <h1 className="page-title">Specializations</h1>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <button className="blue btn text-btn" onClick={this.addSpecializationShowHandle}>Add New</button>
                                            </div>
                                        </div>
                                        <div className="table-wrap">
                                        <div className="table-search">
                                                <input
                                                    value={this.state.filterAll}
                                                    onChange={this.notificationSearch}
                                                    className="table-search-input"
                                                    placeholder="Search"
                                                />
                                        </div>
                                        <ReactTable
                                            noDataText="No found !!"
                                            data={this.props.categoryList}
                                            filterable
                                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                            filtered={this.state.filtered}
                                            columns={[
                                                {
                                                    Header    : "Image",
                                                    accessor  : "image",
                                                    className : "grid-header",
                                                    filterable  : false,
                                                    filterMethod: (filter, row) => {
                                                        return row[filter.id].includes(filter.value);
                                                    }
                                                },
                                                {
                                                    Header      : "Specialization ID",
                                                    accessor    : "spec_id",
                                                    className   : "grid-header",
                                                    filterable  : false,
                                                    filterMethod: (filter, row) => {
                                                        return row[filter.id].includes(filter.value);
                                                    }
                                                },
                                                {
                                                    Header    : "Title",
                                                    accessor  : "en_spec",
                                                    className : "grid-header",
                                                    filterable  : false,
                                                    filterMethod: (filter, row) => {
                                                        return row[filter.id].includes(filter.value);
                                                    }
                                                }
                                            ]}
                                            defaultSorted={[
                                                {
                                                    id: "spec_id",
                                                    desc: false
                                                }
                                            ]}
                                            defaultPageSize={10}
                                            minRows= {this.props.categoryList}
                                            className="table table-bordered responsive"
                                            loading={this.state.loading}
                                            filterable
                                            Sorted
                                            pages={this.props.pages}
                                            showPagination={true}
                                            showPaginationTop={true}
                                            showPaginationBottom={false}
                                            pageSizeOptions={[10, 20, 50]}
                                            manual // For server side pagination
                                            onFetchData={(state, instance) => {
                                                this.getSpecializationList(state.page, state.pageSize, state.sorted, state.filtered);
                                            }}
                                        />
                                    </div>
                                </div>
                                </div>
                        </div>
                        </div>
                      </div>
                      <AddSpecializationContainer
                        addSpecializationShow = {this.state.addSpecializationShow}
                        addSpecializationHideHandle = {this.addSpecializationHideHandle}
                      />
                    </div>
                </div>    
            </div>
        );
    }
}

/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for notification list
 * @return                notification list and loader
 */

function mapStateToProps(state) {
   const { categoryList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid } = state.notificationReducer;

    return {
        categoryList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages
    };
}
const connectedSpecialization = connect(mapStateToProps)(Specialization);
export { connectedSpecialization as Specialization };