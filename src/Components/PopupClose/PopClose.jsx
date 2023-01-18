import React, { Component } from 'react';
import './Popclose.css';

export default class PopClose extends Component {
    render() {
        return (
        <span className="close-icon" onClick={this.props.handleClick}>x</span>
        )
    }
}
