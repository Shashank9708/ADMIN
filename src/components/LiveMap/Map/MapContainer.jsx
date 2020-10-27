import React from 'react';
import { compose } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import socketIOClient from 'socket.io-client';


export class MapContainer extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        lat:22.6929,
        long: 75.89918
      }
      this.socket = socketIOClient("https://247bahamas.com:5000");
      
      var sendData = {
        latitude: 22.6929,
        longitude: 75.89918
      };

      this.socket.emit('change color', '#736cc7');

      this.socket.on('return color', (col) => {
        console.log('----------',col)
        this.setState({'color':col});
      });

      this.socket.on('send_driver_location', (obj) => {
        console.log('----------',obj)
        this.setState({
            lat: obj.latitude,
            long: obj.longitude
        });
      });
    }
    
  render() {  
    
    
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
        iconUrl: require('../../../assets/images/ic_bus.png'),
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
 
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{  lat: 25.072180, lng: -77.337890 }}
      >
                
                <Marker
                    position={{lat: this.state.lat, lng: this.state.long}}
                    
                    //icon={{ url: props.iconUrl }}
                    icon= {{
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 8,
                            strokeColor: '#736cc7'
                          }}

                    draggable= {false}

                >
                </Marker>

                
      </GoogleMap>
    );
    return (
      <div>
        <MapWithAMarkerWithLabel
          googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyCw_Uh8npqpbpwW0JS1G7X1sSSpZ1AVGAI&libraries=geometry"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '600px' }} />}
          mapElement={<div style={{ height: '100%' }} />} 
        />
        
      </div>
    );
  }


}