import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './style.css';

function Sidebar() {
    const [ sidebar ] = useState(true);
    const data = SidebarData;

    return (
        <>
        <nav className={sidebar ? 'nav-menu active navbar-expand-md' : 'nav-menu'} id="sidebarContent">
            <div className="container">
            <ul className="nav-menu-items mt-3">
                {
                    data.map((item, index) => {
                        return(
                <li key={index} className={item.cName}>
                    <NavLink to={item.path} activeClassName="active">
                    <span>{item.title}</span>
                    </NavLink>
                </li>            
                        );
                    })
                }
            </ul>
            </div>
        </nav> 
        </>
    )
}

export default Sidebar
