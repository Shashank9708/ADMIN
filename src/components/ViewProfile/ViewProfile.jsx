import React from 'react';

import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from '../Header';
import { SideMenu } from '../SideMenu';
import { headerActions, staffActions, ViewProfileActions } from '../../_actions';
import Dropzone from 'react-dropzone'; 


class ViewProfile extends React.Component {
    /**
     * @DateOfCreation        26 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.state               = this.initialState;
        this.handleSave   = this.handleSave.bind(this);

        this.onDrop = this.onDrop.bind(this);
    }

    get initialState() {
        return {
            profile: {
              detail:{
                id: '',
                user_image: ''
              }
            },
            profilePhoto : ''
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(staffActions.getManagerList());

    }
    onDrop(name,files) {
        var images = files[0]

        const { detail } = this.state.profile;
        this.setState({
          profile : {
            detail : {
                ...detail,
                [name]: images
            }
          },
          profilePhoto : files[0]['preview']
        });
      
    }

    onChange(value){
        this.setState(value);
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

    handleSave(){
        const { detail } = this.state.profile;
        const { dispatch } = this.props;
        dispatch(ViewProfileActions.getViewProfileList(detail));
    }
    
    render() {
       
        return (
            <div className="page-container">
            <SideMenu/>
            <HeaderContainer />
            
                <div className="main-content">
                    <div className="wrap-inner-content">
                        <div className="col-md-12">
                          <div className="inner-content">
                              <div className="col-md-3">
                                  <div className="upload-img">
                                  <img src={this.state.profilePhoto}/>
                                    <Dropzone
                                      multiple={false}
                                      onDrop={this.onDrop.bind(this,'user_image')}
                                      className="drop_box1"
                                      >
                                     <i className="fa fa-cloud-upload-alt fa-3x"></i><br/>
                                     Click here to upload image
                                    </Dropzone>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <button className="btn-sm" onClick={this.handleSave}>Update</button>
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
 * @DateOfCreation        26 July 2018
 * @ShortDescription      connect state to props on reducer and get state for staff list
 * @return                staff list and loader
 */

function mapStateToProps(state) {
   const { managerList, isUserNotValid } = state.staffReducer;
   console.log("akasj---",managerList)
    return {
        managerList,
        isUserNotValid
    };
}
const connectedManager = connect(mapStateToProps)(ViewProfile);
export { connectedManager as ViewProfile };