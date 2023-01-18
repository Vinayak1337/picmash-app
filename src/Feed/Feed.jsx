import './Feed.css';
import React, { Component } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import InputOption from '../Components/InputOption/InputOption';
import ImageIcon from '@material-ui/icons/Image';
import Post from '../Post/Post';
import ImageEditor from '../Components/ImageEditor/ImageEditor';
import ContentPopUp from '../Components/ContentPopUp/ContentPopUp';
import FlipMove from 'react-flip-move';

export default class Feed extends Component {
    constructor(){
        super()
        this.state = {
            posts: [],
            editedImage: {},
            initialImage: false,
            openEditor: false,
            imageName: '',
            openContent: false,
            message: '',
            title: '',
        }
    }

    submitPost = async (title, message) => {
        await this.setState({title: title});
        await this.setState({message: message});
        this.sendPost();
        this.toggleOpenContent();
    }

    toggleOpenContent = () => {
        this.setState({openContent: !this.state.openContent});
    }

    handleEditor = async (image, name) => {
        try {
            const initialImage = image;
            this.setState({initialImage});
            this.setState({imageName: name});
            this.setState({openEditor: true});
        } catch (error) {
            alert(error.message);
        }
    }

    deleteInitialImage = async () => {
        await fetch(`${this.props.baseUrl}/images`, {
            method: 'DELETE',
            headers: { 'content-Type': 'application/json'},
            body: JSON.stringify({"filename": this.state.imageName}),
        });
    }
        
    toggleEditor = () => {
        this.setState({openEditor: false});
        this.setState({initialImage: null});
        this.setState({openContent: false});
        this.deleteInitialImage();
    }
        
    onSubmit = (editedImage) => {
        this.setState({editedImage});
        this.setState({openEditor: false});
        this.setState({initialImage: null});
        this.toggleOpenContent();
    }

    removeImage = () => {
        this.setState({editedImage: null});
    }

    componentDidMount = async () => {
        const response = await fetch(this.props.baseUrl + '/posts', {
            method: 'GET',
            headers:{
                'content-Type': 'application/json'
            }
        });
        const status = response.status;
        if (status === 200) {
            const posts = await response.json();
            posts.reverse();
            this.setState({ posts: posts});
        }
    }
    sendPost = async (event) => {
        if(event) event.preventDefault();
        const {imageName, editedImage, message, title} = this.state;
        if (!message && !editedImage) return;
        const { user, baseUrl } = this.props;
        const body = {
                name: user.displayName,
                userid: user.id,
            }
            if (editedImage.url) {
                body.imageUrl = editedImage.url;
                body.alt = imageName;
                body.height = editedImage.height;
                body.width = editedImage.width;
            }
            if (message) body.message = message;
            if (title) body.title = title;
            const response = await this.fetchApi(body, baseUrl, 'posts', 'POST');
            const status = response.status;
            if (status === 200) {
                const array = this.state.posts;
                const post = await response.json();
                array.reverse();
                array.push(post);
                array.reverse();
                this.setState({posts: array});
                user.imagesPosted += 1;
                this.props.setUser(user);
            }
            this.setState({title: ''});
            this.setState({editedImage: {}});
            return this.setState({message: ''});
    }

    setPosts = (posts) => {
        this.setState({posts: posts});
    }

    fetchApi = async (body, baseUrl, endpoint, method = 'GET') => {
        const response = await fetch(`${baseUrl}/${endpoint}`, {
          method,
          headers: { 'content-Type': 'application/json'},
          body: JSON.stringify(body),
        });
        return response;
    }

    render() {
        const { user } = this.props;
        return (
            <div className="feed">
                <div className="feed_imageEditor">
                  {this.state.openEditor && <ImageEditor closeEditor={this.toggleEditor} image={this.state.initialImage} submit={this.onSubmit}/>}
                <div className="feed_inputs">
                <div className="feed_contentPopup">
                {this.state.openContent && <ContentPopUp closeEditor={this.toggleEditor} submitPost={this.submitPost} message={this.state.message} title={this.state.title}/>}
                </div>
                    <div className="feed_input">
                        <CreateIcon />
                        <form>
                            <input type="text" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})}/>
                            <button onClick={this.sendPost} type="submit">
                                Send
                            </button>
                        </form>
                    </div>
                    <div className="feed_inputOptions" >
                        <InputOption Icon={ImageIcon} title='Photo' color='#70B5F9' upload={true} openEditor={this.handleEditor} baseUrl={this.props.baseUrl} user={user}/>
                    </div>
                </div>
                <div>
                    <FlipMove>
                    {
                        this.state.posts.map(({userid, name, imageUrl, height, width, message, alt, title, _id}) => {
                            return <Post user={this.props.user} setPosts={this.setPosts} setUser={this.props.setUser} posts={this.state.posts} baseUrl={this.props.baseUrl} name={name} title={title} key={_id} postid={_id} message={message} userid={userid} imageUrl={imageUrl} height={height} width={width} alt={alt}/>
                        }) || <Post user={this.props.user} setPosts={this.setPosts} setUser={this.props.setUser} posts={this.state.posts} baseUrl={this.props.baseUrl} name={"Vin"} title={"None"} key={"000"} postid={"0001"} message={"some msg"} userid={this.props.user.id} imageUrl={""} height={""} width={""} alt={""}/>

                    }
                    </FlipMove>
                </div>
                </div>
            </div>
        )
    }
}
