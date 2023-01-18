import React, { Component } from 'react'
import { Avatar } from '@material-ui/core';
import './Sidebar.css';

export default class Sidebar extends Component {
    render() {
        const {email, displayName, username, imagesPosted, totalLikes } = this.props.user;
        const {avatar} = this.props;
        return (
            <div className="sidebar">
                <div className="sidebar_card">
                    <img src={avatar} alt="" />
                    <Avatar className="sidebar_avatar">{displayName[0]}</Avatar>
                    <h2>{displayName}</h2>
                    <h4>{'@'+username}</h4>
                    <h4>{email}</h4>
                </div>
                <div className="sidebar_stats">
                    <div className="sidebar_stats_text">
                        <p>Total posts</p>
                    <div className="sidebar_stats_number">
                        <p>{imagesPosted}</p>
                    </div>
                    </div>
                    <div className="sidebar_stats_text">
                        <p>Total likes</p>
                    <div className="sidebar_stats_number">
                        <p>{totalLikes}</p>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}