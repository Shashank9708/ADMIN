import React from 'react'; import { Link } from "react-router-dom"; 
import {Nav, NavDropdown, MenuItem} from 'react-bootstrap';
 export const Header = (props) => 
 { return (
    <section>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <div>
                        <p className="circle"></p>
                        <img className="logoimg" src="src/assets/img/logo.svg" alt="logo" />
                        <h3 className="texts">Ark Admin Panel</h3>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="navbar-collapse collapses">
                        <ul class="dropdown">
                            <li class="drop">Setting</li>
                            <li class="dropdown-content">
                                <a href="#">Log Out</a>
                             
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    ); }
    