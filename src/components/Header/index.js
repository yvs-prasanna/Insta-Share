import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch, FaBars} from 'react-icons/fa'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {searchInput: '', isDropDownOpen: false}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onHandleSearch = () => {
    const {searchInput} = this.state
    const {history} = this.props
    history.push(`/posts?search=${searchInput}`)
  }

  onKeydownEvent = event => {
    if (event.key === 'Enter') {
      const {searchInput} = this.state
      const {history} = this.props
      history.push(`/posts?search=${searchInput}`)
    }
  }

  toggleDropdown = () => {
    this.setState(prevState => ({isDropdownOpen: !prevState.isDropdownOpen}))
  }

  render() {
    const {searchInput, isDropDownOpen} = this.state
    const {location} = this.props
    return (
      <div className="wholeHeader">
        <div className="insideHeader">
          <Link to="/" className="logoAndTitleLink">
            <div className="logoAndTitle">
              <img
                src="https://res.cloudinary.com/dcj1stgkx/image/upload/v1735661130/logo_m1erel.png"
                alt="website logo"
              />
              <h1>Insta Share</h1>
            </div>
          </Link>
          <div className="SerachHomeProfileLogout">
            <div className="search-block">
              <input
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                placeholder="Search Caption"
                className="searchInput"
                onKeyDown={this.onKeydownEvent}
              />
              <button type="button" testid="searchIcon" className="searchImage">
                <FaSearch onClick={this.onHandleSearch} />
              </button>
            </div>
            <ul className="navigatingOptions">
              <Link
                to="/"
                className={
                  location.pathname === '/'
                    ? 'activeLinkElement'
                    : 'linkElement'
                }
              >
                <li>Home</li>
              </Link>
              <Link
                to="/my-profile"
                className={
                  location.pathname === '/my-profile'
                    ? 'activeLinkElement'
                    : 'linkElement'
                }
              >
                <li>Profile</li>
              </Link>
            </ul>

            <button
              type="button"
              className="logoutButton"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
