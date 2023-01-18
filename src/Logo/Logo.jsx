import React, { Component } from 'react';
import './Logo.css';

class Logo extends Component {
    render () {
        return (
                <img className="logo grow" src="../Picmash_Logo_transparent.png" height="100" width="100" alt="picmash"/>
        )
    }
}

export default Logo;