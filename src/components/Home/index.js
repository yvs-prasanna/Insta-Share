import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import EachPost from '../EachPost'
import SearchFunctionality from '../SearchFunctionality'

import './index.css'

const constants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  postsSuccess: 'PS',
  storiesSuccess: 'SS',
  postsFailure: 'PF',
  storiesFailure: 'SF',
}

function SampleNextArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      aria-label="Next Slide"
      style={{
        ...style,
        display: 'block',
        background: 'black',
        borderRadius: '100%',
      }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      aria-label="Next Slide"
      style={{
        ...style,
        display: 'block',
        background: 'black',
        borderRadius: '100%',
      }}
      onClick={onClick}
    />
  )
}

class Home extends Component {
  state = {
    posts: [],
    postsCheck: constants.initial,
    storiesCheck: constants.initial,
    stories: [],
    searchActive: false,
    searchInput: '',
  }

  componentDidMount() {
    this.checkSearchQuery()
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = new URLSearchParams(prevProps.location.search).get(
      'search',
    )
    const currentSearch = new URLSearchParams(window.location.search).get(
      'search',
    )

    if (prevSearch !== currentSearch) {
      this.checkSearchQuery()
    }
  }

  checkSearchQuery = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const searchQuery = searchParams.get('search')

    if (searchQuery) {
      this.setState({searchActive: true, searchInput: searchQuery})
    } else {
      this.setState({searchActive: false})
      this.getStories()
      this.getPosts()
    }
  }

  getPosts = async () => {
    this.setState({postsCheck: constants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({
        posts: [...data.posts],
        postsCheck: constants.postsSuccess,
      })
    } else {
      this.setState({postsCheck: constants.postsFailure})
    }
  }

  getStories = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({storiesCheck: constants.loading})
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({stories: [...data.users_stories]})
    if (response.ok === true) {
      this.setState({storiesCheck: constants.storiesSuccess})
    } else {
      this.setState({storiesCheck: constants.storiesFailure})
    }
  }

  renderCarousel = () => {
    const {stories} = this.state
    const settings = {
      dots: false,
      slidesToShow: 5,
      slidesToScroll: 3,
      infinite: false,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    }
    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {stories.map(each => (
            <li key={each.user_id} className="eachStory">
              <img
                className="eachStoryImage"
                src={each.story_url}
                alt="user story"
              />
              <Link to={`/users/${each.user_id}`} className="eachStoryName">
                <p>{each.user_name}</p>
              </Link>
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderStoriesFailure = () => (
    <div className="storiesFailurePage">
      <img
        src="https://res.cloudinary.com/dcj1stgkx/image/upload/v1739721210/alert-triangle_qpz8yo.png"
        alt="failure view"
      />
      <h1>Something went wrong. Please try again</h1>
      <button onClick={this.getStories} type="button">
        Try again
      </button>
    </div>
  )

  renderStoriesSection = () => {
    const {storiesCheck} = this.state
    switch (storiesCheck) {
      case constants.loading:
        return this.renderStoriesLoading()
      case 'SS':
        return this.renderCarousel()
      case 'SF':
        return this.renderStoriesFailure()
      default:
        return null
    }
  }

  renderPosts = () => {
    const {posts} = this.state
    return (
      <ul className="postsContainer">
        {posts.map(each => (
          <EachPost key={each.post_id} post={each} />
        ))}
      </ul>
    )
  }

  renderPostsSection = () => {
    const {postsCheck} = this.state
    switch (postsCheck) {
      case constants.loading:
        return this.renderLoading()
      case 'PS':
        return this.renderPosts()
      case 'PF':
        return this.renderFailure()
      default:
        return null
    }
  }

  renderFailure = () => (
    <div className="">
      <img
        src="https://res.cloudinary.com/dcj1stgkx/image/upload/v1739721210/alert-triangle_qpz8yo.png"
        alt="hello"
      />
      <p>Something went wrong. Please try again</p>
      <button onClick={this.getPosts} type="button">
        Try again
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="LoaderContainer" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderStoriesLoading = () => (
    <div className="stories-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSearchResults = () => {
    const {searchInput} = this.state
    return <SearchFunctionality searchInput={searchInput} />
  }

  render() {
    const {storiesCheck, searchActive} = this.state
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="WholeHomePage">
        <Header />
        {searchActive && this.renderSearchResults()}

        {!searchActive && storiesCheck === 'SF' && this.renderStoriesFailure()}

        {!searchActive && storiesCheck !== 'SF' && (
          <>
            {this.renderStoriesSection()}
            {this.renderPostsSection()}
          </>
        )}
      </div>
    )
  }
}
export default Home
