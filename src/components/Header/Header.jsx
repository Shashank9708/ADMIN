import React from 'react'; 
import { Link } from "react-router-dom"; 

 export const Header = (props) => { 
    return (
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Ark Panel</a>
                  <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="#" onClick={props.handle_logout} ><img className="header-profile-image" src="https://www.michiganlutheran.org/wp-content/uploads/2019/09/placeholder-profile-sq.jpg" /> Welcome {props.logged_in_user_name}</a>
                    </li>
                </ul>
            </nav>
          ); 
}
    