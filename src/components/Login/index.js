import {Component} from 'react'

import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {name: '', password: '', errorMsg: '', isShow: false}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 100})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {name, password} = this.state
    const userDetails = {username: name, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (!response.ok) {
      this.setState({errorMsg: data.error_msg})
      this.setState({isShow: true})
    } else {
      this.setState({errorMsg: ''})
      this.setState({isShow: false})
      this.onSubmitSuccess(data.jwt_token)
    }
    this.setState({name: '', password: ''})
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      const {history} = this.props
      history.push('/')
    }
    const {name, password, errorMsg, isShow} = this.state
    return (
      <>
        <div className="dog-ear dog-ear-top-left">.</div>
        <div className="dog-ear dog-ear-top-right">.</div>

        <div className="loginPage">
          <div className="loginBlock">
            <img
              className="ImageonLoginpage"
              alt="website login"
              src="https://res.cloudinary.com/dcj1stgkx/image/upload/v1738948821/Illustration_sayk1a.jpg"
            />
            <form className="loginForm" onSubmit={this.onSubmitForm}>
              <div className="logoHandler">
                <img
                  alt="website logo"
                  className="logoImg"
                  src="https://res.cloudinary.com/dcj1stgkx/image/upload/v1735661130/logo_m1erel.png"
                />
                <h2>Insta Share</h2>
              </div>
              <label htmlFor="username">USERNAME</label>
              <input
                value={name}
                onChange={this.onChangeName}
                id="username"
                placeholder="Enter Username"
                type="text"
              />
              <label htmlFor="password">PASSWORD</label>
              <input
                value={password}
                onChange={this.onChangePassword}
                id="password"
                placeholder="Enter Password"
                type="password"
              />
              {isShow ? <p className="message">{errorMsg}</p> : ''}
              <button type="submit" className="login-button">
                login
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Login
