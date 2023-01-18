import React, { Component } from 'react';
import PopClose from '../PopupClose/PopClose';
import './ContentPopUp.css';

export default class ContentPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message: props.message,
          title: props.title,
        }
      }
    
    render () {
      return (
      <div className="popup-box ">
        <div className="box">
          <PopClose handleClick={this.props.closeEditor}/>
          <article className="article br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
          <main className="pa4 black-80">
            <div className="fields">
              <label className="title">Title</label>
              <input type="text" value={this.state.title} placeholder="Optional" onChange={e => this.setState({title: e.target.value})}/>
              <label style={{marginTop: '10px'}} className="msg">Message</label>
              <input type="text" value={this.state.message} onChange={e => this.setState({message: e.target.value})} placeholder="Optional"/>
            </div>
            <div className="post-button" >
            <input type="button" onClick={() => {
              this.props.submitPost(this.state.title, this.state.message)
            }} value="Post"/>
            </div>
          </main>
          </article>
        </div>
      </div>
      );
    }
  }
