import React from "react";
import './Header.scss';

const Header = (props) => {
    return (
        <div className="header">
            <h1>Counters header</h1>
            {props.children}
        </div>
    )
}

export default Header;