import React from 'react';
import ReactDOM from 'react-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { connect } from 'react-redux';
import {Button} from 'react-bootstrap';
import Select from 'react-select';
import {HeaderContainer} from '../Header';
import {SideMenu} from '../SideMenu';
import { Tabs, Tab} from 'react-bootstrap';
import { Stoppage } from './Stoppage';
import { Map } from './Map';
import { vehicleActions, headerActions, tripActions } from '../../_actions';
import { LiveMapActions } from './LiveMapActions';


class LiveMap extends React.Component {

    /**
     * @DateOfCreation        08 Aug 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        
        this.getLiveMap  = this.getLiveMap.bind(this);

        this.state           = this.initialState;
    }

    get initialState() {
        return {
            loading : false,
            pages  : 0,
            filtered: [],
            filterAll: '',
            sorted: '' 
        }
    }


    componentDidMount() {
      const { dispatch } = this.props;
      dispatch(tripActions.getTripsList())
      dispatch(vehicleActions.getVehicleList());
    }

    /**
     * @DateOfCreation        08 Aug 2018
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
     * @DateOfCreation        09 Aug 2018
     * @ShortDescription      This function is responsible to Draw map by vehicle id.
     * @return                Void
     */
    getLiveMap(data) {
        const { dispatch } = this.props;
      //  dispatch(LiveMapActions.getLiveMapList(data));
    }

    render() {
        const { SearchBar } = Search;
        const columns = [{
           text: '',
           dataField: 'registration_number',
        }];

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                const { dispatch } = this.props;
              //  dispatch(LiveMapActions.getLiveMapList(row));
            }
        };
        return (
            <div className="page-container">
            <SideMenu/>
            <HeaderContainer />
                <div className="main-content">
                    <div className="wrap-inner-content">
                        <div className="col-md-12">
                            <div className="inner-content">
                                <div className="row page-header">
                                    <div className="col-md-12">
                                        <h1 className="page-title">Live Map</h1>
                                    </div>
                                </div>
                                <div className="row">
                               
                                    <div className="col-md-12">
                                        <div className="map">
                                            <Map 
                                                tripList = {this.props.tripList}
                                                vehicleList = {this.props.vehicleList}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>
                </div>
            </div>
        );
    }
}

/**
 * @DateOfCreation        08 Aug 2018
 * @ShortDescription      connect state to props on reducer and get state for stoppage, vehicle list
 * @return                stoppage list and loader
 */

function mapStateToProps(state) {   
    
    const { vehicleList } = state.vehicleReducer;
    const { vehicle_route_id, waypoints, polyline, draw, location, vehicle_route_list } = state.LiveMapReducer;
    const { tripList } = state.tripReducer;
    return {
        tripList,
        vehicleList,
        vehicle_route_id,
        waypoints,
        polyline,
        draw,
        location,
        vehicle_route_list
    };    
}
const connectedLiveMap = connect(mapStateToProps)(LiveMap);
export { connectedLiveMap as LiveMap }; 