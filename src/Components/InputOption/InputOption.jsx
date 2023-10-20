import './InputOption.css';
import React, { Component } from 'react';

export default class InputOption extends Component {
	constructor() {
		super();
		this.state = {
			imageSelected: null,
			imageEdited: false,
			value: ''
		};
		this.inputRef = React.createRef();
		this.triggerInput = this.triggerInput.bind(this);
	}

	handleDeletePost = async () => {
		const body = {
			postid: this.props.postid,
			userid: this.props.userid
		};
		const response = await this.fetchApi(
			body,
			this.props.baseUrl,
			'posts',
			'DELETE'
		);
		const status = response.status;
		if (status === 200) {
		} else {
			alert('Something went wrong, please try again');
		}
	};

	fetchApi = async (body, baseUrl, endpoint, method = 'GET') => {
		const response = await fetch(`${baseUrl}/${endpoint}`, {
			method,
			headers: { 'content-Type': 'application/json' },
			body: JSON.stringify(body)
		});
		return response;
	};

	handleImage = async event => {
		if (!event.target.files[0]) return;
		const file = event.target.files[0];
		this.setState({ file });
		const fd = new FormData();
		const name = `${this.props.user.id}_${Date.now()}.${
			file.type.split('/')[1]
		}`;
		fd.append('postImage', event.target.files[0], name);

		const response = await fetch(`${this.props.baseUrl}/images`, {
			method: 'POST',
			body: fd
		});
		const url = await response.json();
		this.props.openEditor(url, name);
	};

	triggerInput = () => {
		try {
			this.inputRef.current.click();
		} catch (error) {
			console.log(error);
		}
	};

	handleClick = async () => {
		try {
			if (this.props.upload) this.triggerInput();
			else if (this.props.deletePost) {
				await this.handleDeletePost();
				const { posts, setPosts, postid, user, setUser } = this.props;
				const post = posts.find(post => post._id === postid);
				posts.splice(posts.indexOf(post), 1);
				user.imagesPosted -= 1;
				setUser(user);
				setPosts(posts);
			} else alert('Under Construction');
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { Icon, title, color, upload } = this.props;
		return (
			<div className='inputOption'>
				{upload && (
					<input
						ref={this.inputRef}
						type='file'
						accept='image/*'
						value={this.state.value}
						onClick={e => {
							if (e.target.value) this.setState({ value: '' });
						}}
						onChange={this.handleImage}
						hidden
					/>
				)}
				<Icon onClick={this.handleClick} style={{ color: color }} />
				<h1 onClick={this.handleClick}>{title}</h1>
			</div>
		);
	}
}
