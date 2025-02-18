import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import EachPost from '../EachPost'
import './index.css'

const constants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const SearchFunctionality = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchInput = searchParams.get('search')
  const [posts, setPosts] = useState([])
  const [active, setActive] = useState(constants.initial)
  const fetchSearchedPosts = async () => {
    setActive(constants.loading)
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      setPosts(data.posts)
      setActive(constants.success)
    } else {
      setActive(constants.failure)
    }
  }

  useEffect(() => {
    fetchSearchedPosts()
  }, [searchInput])
  if (!posts && !searchInput) {
    return <p>Loading</p>
  }

  const renderSuccess = () => (
    <>
      {!searchInput || posts.length === 0 ? (
        <>
          <img
            src="https://res.cloudinary.com/dcj1stgkx/image/upload/v1739094551/NopostsWhenSearch_mpgo4f.png"
            alt="search not found"
          />
          <h1>Search Not Found</h1>
          <p>Try different keyword or search again</p>
        </>
      ) : (
        posts.map(post => <EachPost key={post.post_id} post={post} />)
      )}
    </>
  )

  const renderFailure = () => (
    <div className="FailurePage">
      <img
        src="https://res.cloudinary.com/dcj1stgkx/image/upload/v1739721210/alert-triangle_qpz8yo.png"
        alt="failure view"
      />
      <h1>Something went wrong. Please try again</h1>
      <button type="button" onClick={fetchSearchedPosts()}>
        Try again
      </button>
    </div>
  )

  const renderLoader = () => (
    <div className="LoaderContainer" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  const renderContent = () => {
    switch (active) {
      case constants.success:
        return renderSuccess()
      case constants.failure:
        return renderFailure()
      case constants.loading:
        return renderLoader()
      default:
        return null
    }
  }

  return (
    <div className="WHolePageWithheader">
      <Header />

      <div className="searchPostsContainer">
        <h1 className="searchedPostsheading">Search Results</h1>
        {renderContent()}
      </div>
    </div>
  )
}

export default SearchFunctionality
