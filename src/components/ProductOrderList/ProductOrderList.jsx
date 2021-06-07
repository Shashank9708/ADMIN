import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../../components/Header';
import { SideMenu } from '../../components/SideMenu';
// import {AddFavoriteDoctorContainer} from './AddFavoriteDoctorContainer';
import { productActions, headerActions } from '../../_actions';
import { configConstants } from '../../_constants';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import UserProfileComponent from "../UserProfileComponent/UserProfileComponent";


class ProductOrderList extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props) {
        super(props);

        this.getProductOrderList        = this.getProductOrderList.bind(this);
        this.notificationSearch           = this.notificationSearch.bind(this);
        this.handleSelectChange         = this.handleSelectChange.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            addFavoriteDoctorShow: false
        }
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
    getProductOrderList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(productActions.getProductOrder());
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
                dispatch(productActions.resetProductState())

                this.getProductOrderList(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered);
            }.bind(this), 1500);
        }
    }

  
    /**
    * @DateOfCreation        11 June 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(e,id) {
      let data = {order_id: id, status: e.target.value}
        // console.log(id,'selectedOption',e.target.value)
        const { dispatch } = this.props;
        dispatch(productActions.orderStatusChange(data));
    }


    render() {
      var statusOption =[{"label": "Pending", "value": 0},{"label": "Complete", "value": 1},{"label": "Cancel", "value": 2}]
        // var fileSize = parseInt(configConstants.MAX_FILE_SIZE);
        return (
            <React.Fragment>
                <HeaderContainer />
                <div className="container-fluid">
                   <div className="row">
                        <SideMenu/>
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                            <div className="page-heading">
                            <div className="page-heading__title-container">
                                <h1 className="page-heading__title">Product Order List</h1>
                            </div>
                          </div>
                          <div className="row">
                              <ReactTable
                                noDataText="No found !!"
                                data={this.props.productList}
                                filterable
                                defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                filtered={this.state.filtered}
                                columns={[
                                    
                                    {
                                        Header: 'Name',
                                        accessor  : "name",
                                        className : 'grid-header',
                                        filterable  : false,
                                        Cell: row => 
                                            <div className="">
                                                <UserProfileComponent 
                                                  name = {row.original.name}
                                                  display_pic = {''}
                                                  contact_no = {row.original.contact_no}
                                                />
                                            </div>
                                    },
                                    {
                                        Header: 'Email',
                                        accessor  : "email",
                                        className : 'grid-header',
                                        filterable  : false,
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        }
                                    },
                                    {
                                        Header: 'Address',
                                        accessor  : "address_details",
                                        className : 'grid-header',
                                        filterable  : false,
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        }
                                    },
                                    {
                                        Header: 'Landmark',
                                        accessor  : "landmark",
                                        className : 'grid-header',
                                        filterable  : false,
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        }
                                    },
                                    {
                                        Header: 'Pincode',
                                        accessor  : "pincode",
                                        className : 'grid-header',
                                        filterable  : false,
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        }
                                    },
                                    {
                                        Header: 'City',
                                        accessor  : "city",
                                        className : 'grid-header',
                                        filterable  : false,
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        }
                                    },
                                    {
                                        Header: 'State',
                                        accessor  : "state",
                                        className : 'grid-header',
                                        filterable  : false,
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        }
                                    },
                                    {
                                        Header    : "Product",
                                        accessor  : "product_name",
                                        className : "grid-header",
                                        filterable  : false,
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        }
                                    },
                                    {
                                        Header    : "Quantity",
                                        accessor  : "quantity",
                                        className : "grid-header",
                                        filterable  : false,
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        }
                                    },
                                    {
                                        Header    : "Price",
                                        accessor  : "price",
                                        className : "grid-header",
                                        filterable  : false,
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        }
                                    },
                                    {
                                        Header: 'Change Order Status',
                                        accessor  : "status",
                                        filterable  : false,
                                        
                                        className : 'grid-header',
                                        Cell: row => {
                                              return  (
                                                <>
                                                  <select
                                                      placeholder = "Change Order Status"
                                                      onChange={ (e) => this.handleSelectChange(e,row.original.id) }
                                                      name='status'
                                                      value={row.original.status}
                                                  >
                                                      <option value="Pending">Pending</option>
                                                      <option value="Accepted">Accepted</option>
                                                      <option value="Dispatched">Dispatched</option>
                                                      <option value="Complete">Complete</option>
                                                      <option value="Cancel">Cancel</option>
                                                  </select>
                                                </> 
                                              )}
                                    }
                                    
                                ]}
                                defaultSorted={[
                                    {
                                        id: "id",
                                        desc: false
                                    }
                                ]}
                                defaultPageSize={10}
                                minRows= {this.props.productList}
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
                                    this.getProductOrderList(state.page, state.pageSize, state.sorted, state.filtered);
                                }}
                              />
                          </div>
                        </main>
                    </div>
                </div>    
            </React.Fragment>
        );
    }
}

/**
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for notification list
 * @return                notification list and loader
 */

function mapStateToProps(state) {
    const { productList,pages,loader,successMessage,sendingRequest,errorMsg, isUserNotValid, status } = state.productReducer;
    return {
        productList,
        isUserNotValid,
        loader,
        successMessage,
        sendingRequest,
        errorMsg,
        pages,
        status,
    };
}
const connectedProductOrderList = connect(mapStateToProps)(ProductOrderList);
export { connectedProductOrderList as ProductOrderList };
