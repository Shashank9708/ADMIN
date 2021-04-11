import React from 'react'; 
import { Link } from "react-router-dom"; 


 export const Header = (props) => 
 { return (
    <section>
        <div className="header-container">
            <div className="row">
                <div className="col-md-4">
                    <div>
                        <p className="circle"></p>
                        <img className="logoimg" src="src/assets/img/logo.svg" alt="logo" />
                        <h3 className="texts">Ark Admin Panel</h3>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="navbar-collapse collapses">
                        <ul className="dropdown">
                            <li className="drop texts">Welcome {props.logged_in_user_name}</li>
                            <li className="dropdown-content">
                                <Link to="" onClick={props.handle_logout}  className="test">
                                Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-1">

                </div>
            </div>
        </div>
    </section>
    
    ); }
    