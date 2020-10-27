import React from 'react';
import socketIOClient from 'socket.io-client';
import { configConstants } from '../../_constants';
import Dropzone from 'react-dropzone';
import { utilityHelper } from '../../_helpers';
import { Button, Input} from 'reactstrap';
import AudioPlayer from "react-h5-audio-player";
import { ReactMic } from 'react-mic';


var getUserInfo = utilityHelper.getUserInfo();
export const ChatMessage = (props) => { 
	const chatby = props.chatby;
	
		return ( 
    
    		<div className="card map-holder">
				<div className="mesgs">

		          <div className="msg_history">

		          	{props.userChatList.length > 0 ? props.userChatList.map(function(
                  		result,i) {
		          		
		          			if(result.receiver_id != chatby.receiver_id){
                      			return (
						            <div className="incoming_msg" style={{"padding": '5px 0 0 0'}} id={'chatID_'+i} ref={props.myDivToFocus}>
						              <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
						              <div className="received_msg" >
						                <div className="received_withd_msg"  >
						                {result.message_type == "text" ?
						                  <p>{result.message}</p>
						                  :
						                  	result.message_type == "file" ?
						                  	<a href={result.message} target="_blank">
							                  <i className="fa fa-file" style={{fontSize: '50px'}} aria-hidden="true"></i>
							                </a>
						                  : 
						                  	result.message_type == "voice" ?
						                  		<AudioPlayer
												    src={result.message}
												    onPlay={e => console.log("onPlay")}
												    // other props here
												  />
						                  	:
							                  <a href={result.message} target="_blank">
							                  <img src={result.message}/>
							                  </a>
						                  
						            	}
						            	<Button style={{"float":"right", "color" : result.flag_type == 0 ? "red" : "blue", backgroundColor: result.flag_type == 0 ? "#fff" : "#fff"}} className="btn"  onClick={props.complaint.bind(null, result)}>
						            		<i class="fa fa-flag" aria-hidden="true" style={{fontSize: '15px'}}></i>
						            	</Button>
						                  <span className="time_date"> {props.createDate(result.created_at)} </span></div>
						              </div>
						            </div>
						        )
                    		}else{
                    			return (
						            <div className="outgoing_msg" id={'chatID_'+i} ref={props.myDivToFocus}>
						              <div className="sent_msg">
						                {result.message_type == "text" ?
						                  <p>{result.message}</p>
						                  :
						                  	result.message_type == "file" ?
						                  	<a href={result.message} target="_blank">
							                  <i className="fa fa-file" style={{fontSize: '50px'}} aria-hidden="true"></i>
							                </a>
						                  : 
						                    result.message_type == "voice" ?
						                  		<AudioPlayer
												    
												    src={result.message}
												    onPlay={e => console.log("onPlay")}
												    // other props here
												  />
						                  	:
							                  <a href={result.message} target="_blank">
							                    <img src={result.message}/>
							                  </a>
						            	}
						                <span className="time_date"> {props.createDate(result.created_at)} </span> </div>

						            </div>
		            			)
		            		}

		            		

		            	}) : <span id="no_data" > <h2>No chats</h2> </span>


		            }  	

		          </div>
		          {getUserInfo.user_type == 'admin' ?
		          	'' :
			          <div className="type_msg">
			            <div className="input_msg_write">
			              <div style={{display:'inline-block', margin: '20px', width: '75%'}}>
			                
			                
			                {props.file_type == "file" ?
			                	<i className="fa fa-file" style={{fontSize: '50px'}} aria-hidden="true"></i>
			                	:
			                	<img src={props.pic}/>
			            	}
			                 <input type="text" name="message" id="exampleText" onKeyDown={props.handleEnterPressSubmit} className="write_msg" onChange = { props.handleInputChange } placeholder="Type a message"/>

				              	<Button disabled={ props.sendingRequest ? true : false } className="msg_send_btn" onClick={props.onSaveChat}>
				              		<i className="fas fa-arrow-circle-right" style={{fontSize: '20px', margin: '-5px'}} ></i>
				              	</Button>
				              	
				              	<Dropzone
				                  multiple={false}
				                  onDrop={props.onDrop}
				                  className="pin-image"
				                  >
				                 <i className="fa fa-paperclip fa-3" style={{fontSize: '30px'}} aria-hidden="true"></i>
				                </Dropzone>
				                
				                <div className="pin-image" style={{"right": "100px"}}>	
							        <ReactMic
							          record={props.record}
							          pause="true"
							          className="sound-wave"
							          onStop={props.onStop}
							          onData={props.onData}
							        />
							        <i className="fas fa-microphone" onClick={props.startRecording} style={{"display": props.record ? "none" : "", fontSize: '30px'}}></i>
							        <i className="fas fa-microphone-slash" onClick={props.stopRecording} style={{"display": props.record ? "" : "none", fontSize: '30px'}}></i>
						      	</div>
					       </div>	
					        
			            </div>
			          </div>
			      }
		        </div>
		
			</div>
		);
}