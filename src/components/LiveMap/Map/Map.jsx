import React from 'react';
import socketIOClient from 'socket.io-client';

export class Map extends React.Component {

	constructor(props, context) {
    	super(props, context); 
    	this.googleChecker = this.googleChecker.bind(this);
    	this.renderMap = this.renderMap.bind(this);
    	//this.animateCircle = this.animateCircle.bind(this);
    	this.markers = new Array();
    	this.socket = socketIOClient("https://247bahamas.com:5000",{
	                          'reconnection': true,
	                          'reconnectionDelay': 1000,
	                          'reconnectionDelayMax' : 5000,
	                          'reconnectionAttempts': Infinity      
	                    });
      
	      var sendData = {
	        latitude: 22.6929,
	        longitude: 75.89918
	      };
	      

	      this.socket.on('send_driver_location', (obj) => {
	      	
	        this.markers[obj.driver_id].setPosition( new google.maps.LatLng(obj.latitude, obj.longitude) );

	      });

    	
    }

    /*handleData(data) {
    	console.log("------",data);
		let result = JSON.parse(data);	

    	console.log('===============',this.markers);
		//this.busMarker.setPosition( new google.maps.LatLng(result.lat, result.long ) );
		
	}*/

	googleChecker() {
		// check for maps in case you're using other google api
		if(!window.google.maps) {
		  setTimeout(googleChecker, 100);
		  console.log("not there yet");
		} else {
		  console.log("we're good to go!!");
		  // the google maps api is ready to use, render the map
		  this.renderMap(this.props);
		}
	}

	renderMap(props){
		
		/*Default Map*/
		var map = new google.maps.Map(this.refs.mapContainer, {
          zoom: 15,
          center: { lat: 25.072180, lng: -77.337890},
          mapTypeId: 'terrain'
        });

		/*Bus Icon*/
		var iconUser = {
		    url: require('../../../assets/images/images.jpg'), // url
		    scaledSize: new google.maps.Size(25, 25), // scaled size
		};
		/*Bus Icon*/
		var icon = {
		    url: require('../../../assets/images/truck.png'), // url
		    scaledSize: new google.maps.Size(50, 50), // scaled size
		};
		
		
		/*Current Bus location par list*/
		/*Multiple Buses Stoppage list*/
		var infoWindow = new google.maps.InfoWindow();
		if(props.tripList){
			for (var i = 0; i < props.tripList.length; i++) {
				if(props.tripList[i]['status'] == "Pending"){
					if(props.tripList[i]['userCurrentLocation'] != undefined)
					{
						var currlat = props.tripList[i]['userCurrentLocation']['latitude'];
						var currlong = props.tripList[i]['userCurrentLocation']['longitude'];
					
						var data = props.tripList[i]['user'];
						var data = '';
						var marker = new google.maps.Marker({
						    position: new google.maps.LatLng(currlat, currlong),
						    map: map,
						    title: 'Truck',
						    animation: google.maps.Animation.DROP,
						    duration: 2000,
		    				easing: "swing"
						});
						this.markers[props.tripList[i]['user']['user_id']] = marker;
					}
				}
			}
		}

		var infoWindow = new google.maps.InfoWindow();
		if(props.vehicleList){
			for (var i = 0; i < props.vehicleList.length; i++) {
				//var data = props.vehicle_route_list[i];
				var data = '';
				var marker = new google.maps.Marker({
				    position: new google.maps.LatLng(props.vehicleList[i]['latitude'], props.vehicleList[i]['longitude'] ),
				    map: map,
				    title: 'Truck',
				    icon : icon,
				    animation: google.maps.Animation.DROP,
				    duration: 2000,
    				easing: "swing"
				});

				 //Attach click event to the marker.
	     //        (function (marker, data) {
	     //        	var html = "<div style = 'width:200px;min-height:40px'>" 
						// 		+ data['registration_number'] + "<br/>"  
						// 		+ data['route_name'] + "<br/>"
						// 		+ data['driver_name'] + "<br/>"
						// 		+ data['assistant_name'] + "<br/>"
						// 		+ data['emergency_contact_number'] + "<br/>"
						// 		+ data['student'] + "/" + data['total_student'] + "<br/>"
						// 		+ data['updated_at'] + "<br/>"
						// 		+ "</div>";
						// var html = "<div style = 'width:200px;min-height:40px'> Truck No </div>"		
	     //            google.maps.event.addListener(marker, "click", function (e) {
	     //                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
	     //                infoWindow.setContent(html);
	     //                infoWindow.open(map, marker);
	     //            });
	     //        })(marker, data);

				this.markers[props.vehicleList[i]['driver_id']] = marker;
			}
		}

		
		/*Bus Stoppage list*/
		/*if(props.draw){
			if(props.waypoints){
				for (var i = 0; i < props.waypoints.length; i++) {
					var markers = new google.maps.Marker({
					    position: props.waypoints[i]['position'],
					    map: map,
					    title: props.waypoints[i]['title']
					});
				}	
			}
		}*/
    
		/*Draw Route by Polyline*/
		//if(props.draw){
			//if(props.polyline){
		        var routeDraw = new google.maps.Polyline({
		          path: props.polyline,
		          geodesic: true,
		          strokeColor: '#FF0000',
		          strokeOpacity: 0.5,
		          strokeWeight: 2
		        });	
		        routeDraw.setMap(map);
		        //this.animateCircle(routeDraw);

		    //}	
		//}

		
	}
	
	componentDidMount(){
		this.googleChecker();
	}

	componentWillReceiveProps(nextProps) { 
		if (nextProps.draw == true) {
	      	this.renderMap(nextProps);
	    }else{
	    	this.renderMap(nextProps);
	    }
	}

    render(){ 
    	
		return(
			<div className="card map-holder">
				<div className="card-block" ref="mapContainer" />
		
			</div>
		);
    }

}
