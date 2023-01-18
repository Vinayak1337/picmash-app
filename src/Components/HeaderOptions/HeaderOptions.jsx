import React, { Component } from 'react';
import './HeaderOptions.css';

export default class HeaderOptions extends Component {
    render() {
        const { Icon, title } = this.props;
        return (
            <div className="headerOption">
                {Icon && <Icon className="headerOption_icon" />}
                <h3 className="headerOption_title">{title}</h3>
            </div>
        )
    }
}
