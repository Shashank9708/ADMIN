import React from 'react';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {HeaderContainer} from '../Header';
import {SideMenu} from '../SideMenu';
import {ChatMessage} from './ChatMessage';
import { userActions, headerActions, chatActions } from '../../_actions';
import { animateScroll as scroll } from 'react-scroll'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
// import firebase from "firebase";
// const  messaging = firebase.messaging();

class Chats extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = this.initialState;
    this.createDate  = this.createDate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSaveChat  = this.onSaveChat.bind(this);
    this.handleEnterPressSubmit  = this.handleEnterPressSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.onData = this.onData.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onSaveAudioChat = this.onSaveAudioChat.bind(this);

    this.complaint = this.complaint.bind(this);

  }

  get initialState() {
      return {
          chatuserList : [],
          userChatList : [],
          shiftArray : {},
            text : '',
            send : {
                chat : {
                  "sender_id": "",
                  "receiver_id": "",
                  "message_type": "text",
                  "message": "",
                  "trip_id": "",
                  "created_at": "",
                  "receiver_type": "user",
                  "user_type": "operator",
                  "image": "",
                  "read": "unread"
                }
            },
            "pic": "",
            "file_type": "",
            chatby: {
                'sender_id': '',
                'receiver_id': ''
            },
            record: false
      }
    }
    complaint(data){
        if(data.flag_type  == 0){
          data.flag_type = 1
        }else{
          data.flag_type = 0
        }

        var userChatList = this.state.userChatList;
        
        const newChatList = userChatList.filter(function(x) { 
          if(x._id == data._id){
            x.flag_type = data.flag_type
            return x
          }
        });
        
        this.setState({
          userChatList: newChatList,
        })

      const { dispatch } = this.props;
      dispatch(chatActions.flagChat(data));
    }
    startRecording () {
      this.setState({
        record: true
      });
    }

    stopRecording () {
      this.setState({
        record: false
      });
    }

    onData(recordedBlob) {
      //console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(recordedBlob) {
      //console.log('recordedBlob is-------: ', recordedBlob);

      var file = new File([recordedBlob], "my-image", {lastModified: 1534584790000, type: 'audio/mp3'});

      //console.log("========",file)

      const { chat }  = this.state.send;
      this.setState({
          send : {
              chat : {
                  ...chat,
                  "image": recordedBlob,
                  "message": "",
                  "message_type": "voice",                   
              }
          }
      });
      this.onSaveAudioChat(recordedBlob);
    }
    onSaveAudioChat(recordedBlob){
        const { chat }  = this.state.send;

        this.setState({
            message : "",
            pic : "",
            file_type: "",
          })
        setTimeout(function(){
          const { dispatch } = this.props;
          dispatch(chatActions.imageChat(this.state.userChatList,chat,recordedBlob));
        }.bind(this), 300)

        this.scrollToBottom(this.state.userChatList.length);
    }
    /**
     * @DateOfCreation        26 June 2018
     * @ShortDescription      This function is responsible to select file
     * @return                Nothing
     */
    onDrop(files) {
   
        var images = files[0]
        //console.log("=============",images)
        if(images.type == "application/pdf"){
            var type = "file"
        }else{
            var type = "image"
        }
        const { chat }  = this.state.send;
        this.setState({
            send : {
                chat : {
                    ...chat,
                    "image": images,
                    "message": "",
                    "message_type": type,                   
                }
            },
            pic: files[0]['preview'],
            file_type: type,
        });
      
    }
    onChange(value){
        this.setState(value);
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
     * @DateOfCreation        08 Aug 2018
     * @ShortDescription      This function is responsible to handle load company list
     * @return                Nothing
     */
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(userActions.showUserList('user'));

        //FCM
        // messaging.onMessage(payload => {
        //     var data = payload.data
        //     var json = JSON.parse(data.body)
            
        //     console.log("Notification Received-------", json);

        //     //if(json.receiver_id == this.state.chatby.sender_id){
        //         var chatuserList = this.state.chatuserList;
        //           const filteredArray = chatuserList.filter(function(x) { 
        //             if(x._id != json.sender_id){
        //               return x
        //             }
        //           });
        //           //console.log("======filteredArray=========",filteredArray)

        //           const popupArray = chatuserList.filter(function(x) { 
        //             if(x._id == json.sender_id){
        //               x.count=x.count+1
        //               return x
        //             }
        //           });
                  
        //           var newArray = popupArray.concat(filteredArray);
        //           //console.log("======newArray=========",newArray)
        //           this.setState({
        //             chatuserList: newArray,
        //           })
        //     //}            
            

        //     if(json.sender_id == this.state.chatby.receiver_id && json.receiver_id == this.state.chatby.sender_id){
            
        //         var userChatList = this.state.userChatList;
        //         userChatList.push(json)
        //         this.setState({
        //           userChatList: userChatList,
        //         })
        //         this.scrollToBottom(userChatList.length);

        //         const { chat }  = this.state.send;
  
        //         this.setState({
        //             send : {
        //                 chat : {
        //                     ...chat,
        //                     "trip_id": json.trip_id                      
        //                 }
        //             }
        //         });
        //     }
        // });
        
    }
    createDate(date) {
      if(date == null){
        return '';
      }else{
        return  new Date(date).toLocaleString();  
      }      
    }
    scrollToBottom(i) {
      //console.log("--------i----------",i)
      var j = i -1
      var element = document.getElementById("chatID_"+j);
      //console.log('===element---',element)
      element.scrollIntoView({ behavior: "smooth" });
    }

    handleInputChange(event) {
        const { name, value }       = event.target;
        
        const { chat }  = this.state.send;
        this.setState({
            send : {
                chat : {
                    ...chat,
                    [name]: value,
                    "image": "",
                    "message_type": "text",
                }
            }
        });
        this.setState({
          message : value,
          pic : "",
          file_type: "",
        })
    }
    /**
    * @DateOfCreation        16 July 2018
    * @ShortDescription      This function is responsible to Submit the login Form with Handle Enter key
    * @return                Nothing
    */
    handleEnterPressSubmit(event){
        if(event.key == 'Enter'){
            this.onSaveChat();
        }
    }
    onSaveChat(){
      
      const { chat }  = this.state.send;

      this.setState({
          message : "",
          pic : "",
          file_type: "",
        })
      console.log(this.state.userChatList,"==========chat=========",chat)
      setTimeout(function(){
        const { dispatch } = this.props;
        dispatch(chatActions.saveChat(this.state.userChatList,chat));
      }.bind(this), 300)

      this.scrollToBottom(this.state.userChatList.length);
          
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.blankChatList == true){
        this.setState({
          //userChatList:[],
          chatuserList:nextProps.chatuserList
        })
      }
      if(nextProps.is_loaded == true){
        const { dispatch } = this.props;
        dispatch(chatActions.resetChatState());
        this.setState({
          userChatList:nextProps.userChatList
        })
        setTimeout(function(){
          this.scrollToBottom(nextProps.userChatList.length);
        }.bind(this), 300)
      }
      if(nextProps.sendingRequest == true){
        const { dispatch } = this.props;
        dispatch(chatActions.resetChatState());
        this.setState({
          message : "",
          pic : "",       
          file_type: "",   
        })
      }
    }

    handleOnSelect(row)  {
       
        var json = {'sender_id':row.created_by, 'receiver_id':row._id, 'read': "read"}
        this.setState({
            chatby: {
                'sender_id': row.created_by,
                'receiver_id': row._id
            }
        });

        const { chat }  = this.state.send;
  
        this.setState({
            send : {
                chat : {
                    ...chat,
                    "created_at": new Date().toISOString(),
                    "sender_id": row.created_by,
                    "receiver_id": row._id,
                    "trip_id": row.trip_id                      
                }
            }
        });
        const { dispatch } = this.props;
        dispatch(chatActions.getChatList(json));
        dispatch(userActions.showUserList('user'));

    }

    render() {
      const { SearchBar } = Search;
        const columns = [{
           text: '',
           dataField: 'full_name',
           formatter: (cell, row, rowIndex, extraData) => (
              <div className={row.count > 0 ? "bg-chat-msg" : ""}>
                <span style={{"color": row.count > 0 ? "white" : "black"}}>{row.full_name} <span className={row.count > 0 ? "count-chat" : ""}>{row.count > 0 ? row.count : ""}</span></span>
              </div>
            ),
        }];
        const selectRow = {
          mode: 'radio',
          clickToSelect: true,
          hideSelectColumn: true,
          bgColor: 'red',
          hideSelectColumn: true,
          onSelect: this.handleOnSelect
        };
        //console.log("chatuserList======",this.state.chatuserList)
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
                                          <h1 className="page-title">User Chats</h1>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-3 bus-list">
                                         <h3>User List</h3>
                                        <ToolkitProvider
                                          keyField="_id"
                                          data={ this.state.chatuserList }
                                          columns={ columns }
                                          search
                                         
                                        >
                                          {
                                            props => (
                                              <div>
                                                <SearchBar { ...props.searchProps } />
                                                  <div className="table-bus-list">
                                                    <BootstrapTable
                                                      { ...props.baseProps }
                                                      selectRow={ selectRow }
                                                    />
                                                </div>
                                              </div>
                                            )
                                          }
                                        </ToolkitProvider>
                                                 
                                      </div>
                                      <div className="col-md-9">
                                          <div className="map">
                                              <ChatMessage 
                                                userChatList = {this.state.userChatList}
                                                message = {this.state.message}
                                                chatby       = {this.state.chatby}
                                                chat       = {this.state.send}
                                                createDate   = {this.createDate}
                                                handleInputChange   = {this.handleInputChange}
                                                onSaveChat   = {this.onSaveChat}
                                                handleEnterPressSubmit   = {this.handleEnterPressSubmit}
                                                onDrop   = {this.onDrop}
                                                onChange   = {this.onChange}
                                                pic   = {this.state.pic}
                                                file_type   = {this.state.file_type}

                                                record   = {this.state.record}
                                                startRecording   = {this.startRecording}
                                                stopRecording   = {this.stopRecording}
                                                onData   = {this.onData}
                                                onStop   = {this.onStop}
                                                scrollToBottom   = {this.scrollToBottom}
                                                complaint   = {this.complaint}
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
    
    const { chatuserList, blankChatList } = state.userReducer;

    const { userChatList, is_loaded, sendingRequest } = state.chatReducer;
    return {
        chatuserList,
        blankChatList,
        is_loaded,
        sendingRequest,
        userChatList
    };    
}
const connectedChats = connect(mapStateToProps)(Chats);
export { connectedChats as Chats }; 