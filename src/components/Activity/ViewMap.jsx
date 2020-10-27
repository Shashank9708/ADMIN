import React, {Component, PropTypes} from 'react';
import {Button, Modal, Tabs, Tab, DropdownButton, title} from 'react-bootstrap';
import { compose } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';


export class ViewMap extends Component {
    constructor(props, context) {
      super(props, context);
      this.handle_close = this.handle_close.bind(this);

      this.state = {
        lat:22.6929,
        long: 75.89918
      }
    }


  handle_close() {
  this.props.onClose();
  }
  createDate(date) {
    if(date == null){
      return '';
    }else{
      return  new Date(date).toLocaleString();  
    }      
  }

  render() {  
    var dataTrip = this.props.dataTrip;
   
    if(dataTrip !=""){
      var username = dataTrip.user.name;
      var usermobile = dataTrip.user.mobile;
      var drivername = dataTrip.driver.name;
      var drivermobile = dataTrip.driver.mobile;
      var locationname = dataTrip.locationName;
      var battery = dataTrip.problemList.battery;
      var locksmith = dataTrip.problemList.locksmith;
      var mechanical = dataTrip.problemList.mechanical;
      var oil = dataTrip.problemList.oil;
      var tyre = dataTrip.problemList.tyre;
        if(battery!=0){
          var batterys = "Battery";
        }
        if(locksmith!=0){
          var locksmiths = "Locksmith";
        }
        if(mechanical!=0){
          var mechanicals = "Mechanical";
        }
        if(oil!=0){
          var oils = "Oil";
        }
        if(tyre!=0){
          var tyres = "Tyre";
        }
      var status = dataTrip.status;
      var enddate = this.createDate(dataTrip.completed_date);
      var startdate = this.createDate(dataTrip.created_date);
      var userlat = dataTrip.userCurrentLocation.latitude;
      var userlng = dataTrip.userCurrentLocation.longitude;
      var driverlat = dataTrip.driverCurrentLocation.latitude;
      var driverlng = dataTrip.driverCurrentLocation.longitude;
    }  

    var polyline_data = this.props.polyline;
    var i;
    var final_polyline = [];

    if(polyline_data!=""){ 
      for(i=0; i<polyline_data.length; i++){
      final_polyline[i] = {lat:parseFloat(polyline_data[i].latitude), lng:parseFloat(polyline_data[i].longitude)}
      }
    }
    const { compose, withStateHandlers } = require('recompose');
    const {
      withScriptjs,
      withGoogleMap,
      GoogleMap,
    } = require('react-google-maps');
    const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox');
    const { MarkerWithLabel } = require('react-google-maps/lib/components/addons/MarkerWithLabel');


    const MapWithAMarkerWithLabel = compose(
      withStateHandlers(() => ({
        isOpen: false,
        isBusOpen: false,
      }), {
        onToggleOpen: ({ isOpen }) => () => ({
          isOpen: !isOpen,
        }),
        onBusToggleOpen: ({ isBusOpen }) => () => ({
          isBusOpen: !isBusOpen,
        })
      }),
      withScriptjs,
      withGoogleMap
    )(props =>
 
    <GoogleMap defaultZoom={15} defaultCenter={{ lat: parseFloat(userlat), lng: parseFloat(userlng) }}>
    <Marker 
      position={{ lat: parseFloat(driverlat), lng: parseFloat(driverlng) }}
      title="Driver Current Location"
      icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"     
      >
    </Marker>

    <Marker
      position={{lat:parseFloat(userlat), lng: parseFloat(userlng)}}
      title="User Current Location"
      icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    >
    </Marker>

    <Polyline path={final_polyline}/>
    </GoogleMap>

    );

    return (
    <div>
      <div className="pdf">
      <Modal show={this.props.displayView} onHide={this.handle_close}>
        <Modal.Header closeButton>
          <Modal.Title>Maps</Modal.Title>
           <div className="mb5">
      </div>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                <MapWithAMarkerWithLabel
          googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyC1ViWhIUeGTUImwg-g376vuS5BbU4pTWY&libraries=geometry"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '300px' }} />}
          mapElement={<div style={{ height: '100%' }} />} 
        />
                </div>
              </div>
      </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>   
          <Button className="btn text-btn red" onClick={this.handle_close}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
      
    );
  }


}