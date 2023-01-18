import { Component } from 'react';
import './Form.css';

const initialState = {
  emailPlaceholder: '',
  namePlaceholder: '',
  passPlaceholder: '',
  email: '',
  username: '',
  password: '',
  emailAvailable: true,
  nameAvailable: true,
  passAvailable: true,
  authorized: true
}

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailPlaceholder: '',
            namePlaceholder: '',
            passPlaceholder: '',
            displayNamePlaceholder: '',
            email: '',
            username: '',
            displayName: '',
            password: '',
            emailAvailable: true,
            displayNameAvailable: true,
            nameAvailable: true,
            passAvailable: true,
            authorized: true,
        }
    }

    fetchApi = async (body, baseUrl, endpoint, method = 'POST') => {
      return fetch(`${baseUrl}/${endpoint}`, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(body),
      });
    }

    onRouteChange = () => {
      this.setState(initialState);
      this.setState({authorized: true});
    }

    checkEmail = async (email, baseUrl) => {
      if (!email.length) return this.setState({emailAvailable: true});
      if (!((email.length > 10) && email.includes('@') && email.includes('.com'))) return this.setState({emailAvailable: false});
      const response = await this.fetchApi({ email }, baseUrl, 'verify');
      const status = response.status;
      if (status === 200) return this.setState({emailAvailable: true});
      else return this.setState({emailAvailable: false});
    }

    checkPassword = async (password) => {
      if (!password.length) return this.setState({passAvailable: true});
      if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/)) return this.setState({passAvailable: true});
      return this.setState({passAvailable: false});
    }

    checkUsername = async (username, baseUrl) => {
      if (!username.length) return this.setState({nameAvailable: true});
      if (!(username.length > 2)) return this.setState({nameAvailable: false});
      const response = await this.fetchApi({username}, baseUrl, 'verify');
      const status = response.status;
      if (status === 200) this.setState({nameAvailable: true});
      else this.setState({nameAvailable: false});
    }

    onEmailChange = async (event) => {
      this.setState({authorized: true});
      const value = event.target.value.toLowerCase().replace(' ', '');
      const {route, baseUrl} = this.props;

      this.setState({emailPlaceholder: ''});
      if (route === 'register') await this.checkEmail(value, baseUrl);
        this.setState({ email: value});
    }

    onNameChange = async (event) => {
      this.setState({authorized: true});
      const value = event.target.value.toLowerCase().replace(' ','');
      const {route, baseUrl} = this.props;
      this.setState({namePlaceholder: ''});

      if (route === 'register') await this.checkUsername(value, baseUrl);
        this.setState({username: value});
    }

    onDisplayNameChange = (event) => {
      const { value } = event.target;
      if (value.length && (value.length < 3)) this.setState({displayNameAvailable: false});
      else this.setState({displayNameAvailable: true});

      this.setState({displayName: event.target.value});
    }

    onPassChange = async (event) => {
      this.setState({authorized: true});
      const value = event.target.value;
      const {route, baseUrl} = this.props;
      
      this.setState({passPlaceholder: ''});
      if (route === 'register') await this.checkPassword(value, baseUrl);
      this.setState({password: value});
    }

    onSubmitButton = async () => {
      const { email, username, password, emailAvailable, passAvailable, nameAvailable, displayName } = this.state;
      const { route, baseUrl, setUser, changeRoute } = this.props;

      if (!email) this.setState({emailPlaceholder: 'Required'});
      else this.setState({emailPlaceholder: ''});
      if ((route === 'register') && !username) this.setState({namePlaceholder: 'Required'});
      else this.setState({namePlaceholder: ''});
      if (!password) this.setState({passPlaceholder: 'Required'});
      else this.setState({passPlaceholder: ''});

      if (!(email || username || password)) return;
      if ((route === 'register') && !(emailAvailable || passAvailable || nameAvailable)) return;

      const response = await this.fetchApi({email, username, password, displayName}, baseUrl, `user/${route === 'register' ? 'create' : 'get'}`, 'POST');
      const status =  response.status;
      if (status === 200) {
        const json = await response.json();
        setUser(json);
        changeRoute('home');
      }
      else this.setState({authorized: false});
    }

    render() {
        const { route, changeRoute } = this.props;
        const { authorized, email, emailAvailable, passAvailable, nameAvailable, namePlaceholder, emailPlaceholder, passPlaceholder, displayNamePlaceholder, displayNameAvailable} = this.state;
        return (
        <article className="article br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">
                    {
                        route === 'signin'? 'Sign In' : 'Register'
                    }
                </legend>
                {
                    route === 'signin'? '' :
                    <div>
                    <div className="mt3 custom">
                    <label className="fw6 lh-copy f6" htmlFor="name">Username</label>
                    <input
                        type="name"
                        name="name"
                        id="name"
                        onInput={this.onNameChange}
                        placeholder={namePlaceholder}
                        />
                      {
                        !nameAvailable?
                        'Name isn\'t available' : ''
                      }
                    </div>

                    <div className="mt3 custom">
                    <label className="fw6 lh-copy f6" htmlFor="name">Display Name</label>
                    <input
                        type="name"
                        name="name"
                        id="name"
                        onChange={this.onDisplayNameChange}
                        placeholder={displayNamePlaceholder}
                        />
                      {
                        !displayNameAvailable?
                        'Name length should be greater than 2' : ''
                      }
                    </div>
                    </div>
                }
                  <div className="mt3 custom">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    <div>
                    </div>
                      {
                        route === 'signin'? 'Email or Username' : 'Email'
                      }
                  </label>
                  <input
                      type="email"
                      name="email-address"
                      id="email-address"
                      onChange={this.onEmailChange}
                      placeholder={emailPlaceholder}
                    />
                      {
                        !emailAvailable?
                        'Email isn\'t available' : ''
                      }
                  </div>
                  <div className="mv3 custom">
                    <label className="db fw6 lh-copy f6 black" htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={this.onPassChange}
                      placeholder={passPlaceholder}
                    />
                      {
                        !passAvailable?
                        <div>
                          <p>Password should be minimum of 6 or maximum of 12 characters</p>
                          <p>Password should contain at least a letter, number & special character</p>
                        </div> : ''
                      }
                       {
                          ((route === 'signin') && !authorized)?
                          `Either ${email.includes('@')?'email':'username'} or password is incorrect` :
                          ((route === 'signin') && !authorized)?
                          'Something went wrong please try again' : ''
                        }
                  </div>
                </fieldset>
                <div className="">
                  <input
                    onClick={this.onSubmitButton}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value={route === 'signin'? 'Sign In' : 'Register'}
                  />
                </div>
                <div className="lh-copy mt3">
                  <p onClick={() => {
                    this.onRouteChange();
                    route === 'signin' ? changeRoute('register') : changeRoute('signin')
                  }} className="f6 link dim black db pointer">
                      {
                          route === 'signin'? 'Register' : 'Sign In'
                      }
                  </p>
                </div>
              </div>
            </main>
        </article>
        )
    }
}

export default Form;