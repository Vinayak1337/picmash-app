import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react'
import HeaderOptions from '../Components/HeaderOptions/HeaderOptions';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
        }
    }
    render() {
        return (
            <div className="header">
                <div className="header_left">
                <img src="../Picmash_Logo_transparent.png" alt="Picmash" />
                <div className="header_search">
                    <SearchIcon />
                    <input type="text" value={this.state.input} onChange={e => this.setState({input: e.target.value})}/>
                    <button onClick={() => { 
                        this.setState({input: ''});
                        alert('Under Construction');
                    }} hidden/>
                </div>
                </div>
            <div className="header_right">
                <button onClick={() => this.props.changeRoute('signin')} style={{background: 'none', border: 'none', outline: 'none'}}>
                <HeaderOptions Icon={LogoutIcon} title='Logout'/>
                </button>
            </div>
            </div>
        )
    }
}
