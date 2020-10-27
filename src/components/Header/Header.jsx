import React from 'react';
import { Link } from "react-router-dom";
import {Nav, NavDropdown, MenuItem} from 'react-bootstrap';

export const Header = (props) => {
    return (
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
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Setting<span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="#">Action</a></li>
                                        <li><a href="#">Another action</a></li>
                                        <li><a href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

