import { Avatar } from '@material-ui/core';
import { ChatOutlined, SendOutlined, ShareOutlined, ThumbUpOutlined, DeleteSweep } from '@material-ui/icons';
import React, { Component } from 'react';
import InputOption from '../Components/InputOption/InputOption';
import './Post.css';

export default class Post extends Component {
    constructor(){
        super()
        this.state = {
            imgRef: React.createRef()
        }
    }

    render() {
        const {name, title, message, imageUrl, width, height, alt, userid, user, postid, baseUrl, posts, setPosts, setUser} = this.props;
        return (
            <div className="post">
                <div className="post_header">
                    <div className="post_avatar">
                    <Avatar>{name[0]}</Avatar>
                    </div>
                    <div className="post_info">
                        <h2>{name}</h2>
                        <p>{title && title}</p>
                    </div>
                </div>
                <div className="post_body">
                    <p>{message && message}</p>
                    {imageUrl && <img ref={this.state.imgRef} src={imageUrl} height={height+'px'} width={width+'px'} alt={alt}/>}
                </div>
                <div className="post_buttons">
                    <InputOption Icon={ThumbUpOutlined} id={`${userid} Like`} title='Like' />
                    <InputOption Icon={ChatOutlined} id={`${userid} Comment`} title='Comment' />
                    <InputOption Icon={ShareOutlined} id={`${userid} Share`} title='Share' />
                    <InputOption Icon={SendOutlined} id={`${userid} Send`} title='Send' />
                    {(userid===user.id) && <InputOption Icon={DeleteSweep} 
                    id={`${userid} Send`} user={user} 
                    setUser={setUser} setPosts={setPosts}
                     posts={posts} userid={user.id} 
                     title='Delete' deletePost={true} postid={postid} 
                     baseUrl={baseUrl}
                     />}
                </div>
            </div>
        )
    }
}
