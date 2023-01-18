import React, { Component, createRef } from 'react';
import PopClose from '../PopupClose/PopClose';
import './ImageEditor.css';

export default class ImageEditor extends Component {
    constructor () {
        super()
        this.state = {
            height: '200',
            width: '300',
            imageRef: createRef(),
        }
    }

    handleHeight = (e) => {
        if (e.target.value) this.setState({height: e.target.value});
    }

    handleWidth = (e) => {
        if (e.target.value) this.setState({width: e.target.value});
    }

    handleSubmit = (e) => {
        const imageObject = {
            url: this.props.image,
            height: this.state.height, 
            width: this.state.width
        }
        if(e.target) this.props.submit(imageObject);
    }

    render () {
        
        return (
            <div className="popup-box">
              <div className="box">
                  <PopClose handleClick={this.props.closeEditor}/>
                <h3>Resize the image</h3>
                <div className="image">
                <img src={this.props.image} ref={this.state.imageRef} height={this.state.height+'px'} width={this.state.width+'px'} alt={this.props.image.replace('https://localhost:5000/initialimges/', '')}/>
                </div>
                <div className="options">
                <div className="option">
                    <label>Height </label>
                    <input type="range" defaultValue={this.state.height} step="0.1" min="100" max="400" onChange={this.handleHeight}/>
                    <br />
                </div>
                    <div className="option">
                    <label>Width </label>
                    <input type="range" defaultValue={this.state.width} step="0.1" min="150" max="550" onChange={this.handleWidth}/>
                    <br />
                    </div>
                    <div className="button">
                        <input type="button" onClick={this.handleSubmit} value="Next"/>
                    </div>
                </div>
              </div>
            </div>
          );
    }
}
