import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {PulseLoader} from 'react-spinners'
import Header from '../Header'
import EachPost from '../EachPost'
import StoriesCarousal from '../StoriesCarousal'

import './index.css'

class Home extends Component {
  state = {isLoading: true, posts: []}

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
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
    this.setState({posts: [...data.posts], isLoading: false})
  }

  render() {
    const {isLoading, posts} = this.state
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="WholeHomePage">
        <Header />
        <StoriesCarousal />
        {isLoading ? (
          <div data-testid="loader" className="LoaderContainer">
            <PulseLoader
              color="#4094EF"
              loading={isLoading}
              size={15}
              margin={2}
            />
          </div>
        ) : (
          posts.map(each => {
            return <EachPost key={each.post_id} post={each} />
          })
        )}
      </div>
    )
  }
}

export default Home
