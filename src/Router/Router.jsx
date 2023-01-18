import { Component } from 'react';
import ErrorBoundry from '../Components/ErrorBoundry/ErrorBoundry';
import Loader from '../Components/Loader/Loader';
import Feed from '../Feed/Feed';
import Form from '../Form/Form';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Router.css';
class Route extends Component {
    render() {
        const { route, changeRoute, baseUrl, setUser, user } = this.props;
        return (
            <div>
                <ErrorBoundry> {
                (route === 'signin' || route === 'register') ?
                <div>
                <Form route={route} changeRoute={changeRoute} baseUrl={baseUrl} setUser={setUser}/>
                </div> 
                : 
                (route === 'home') ?
                <div className="home"> 
                <Header changeRoute={changeRoute}/>
                <div className="home_body">
                <Sidebar user={user}/>
                <Feed baseUrl={baseUrl} user={user} setUser={setUser}/>
                </div></div>
                :
                <div style={{transform: 'translate(0%, 100%)'}}>
                    <Loader/>
                    <br/>
                    <h3 style={{display: 'flex', justifyContent: 'center'}}>Loading, please wait...</h3>
                </div>
            } </ErrorBoundry>
            </div>
        );
    }
}
export default Route;