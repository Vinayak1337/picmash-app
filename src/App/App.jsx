import 'tachyons';
import './App.css';
import React, { Component } from 'react';
import Router from '../Router/Router';

// const baseUrl = 'https://picmash-server.herokuapp.com';
const baseUrl = 'http://localhost:8080';

const initialState = {
  route: 'signin',
  baseUrl,
  user: {},
  signedIn: false,
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      route: 'null',
      baseUrl,
      user: {},
      signedIn: false,
    }
  }
  
  changeRoute = (route) => {
    if (route === 'signin') this.setState(initialState);
    if (route === 'home') this.setState({signedIn: true});
    else this.setState({signedIn: false});
    this.setState({route: route});
  }

  setUser = (user) => {
    this.setState({user: user});
  }

  componentDidMount = () => {
    if (this.state.user?.id) return this.changeRoute('home');
    this.changeRoute('signin');

  }
  render () {
    return (
      <div>
        <Router user={this.state.user} route={this.state.route} changeRoute={this.changeRoute} baseUrl={this.state.baseUrl} setUser={this.setUser}/>
      </div>
      );
    }
}

export default App;
