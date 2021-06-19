import React from 'react'; 
import { Link } from "react-router-dom"; 
import { configConstants } from '../../_constants';
import logo from '../../assets/img/logo.svg'
import './Header.scss';

export const Header = (props) => {

    return (
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#"><img className="header-profile-image" width="25" src={logo} />Ark Panel</a>
                  <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  
                    <ul className="navbar-nav px-3" id="top-navigation-user-logout">
                        <li className="nav-item text-nowrap">
                          <a className="nav-link">
                            <img className="header-profile-image" src={props.user_image ? configConstants.API_BASE_PATH+"/"+props.user_image : "https://www.michiganlutheran.org/wp-content/uploads/2019/09/placeholder-profile-sq.jpg"} /> Welcome {props.logged_in_user_name}
                          </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" alt="Logout" className="navigation-logout-link" onClick={props.handle_logout}><i class="fa fa-power-off" aria-hidden="true"></i></a>
                        </li>                    
                    </ul>
            </nav>
          ); 
}
    