import React, {useEffect, useState, useContext} from 'react'
import {useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import {PulseLoader} from 'react-spinners'
import Header from '../Header'
import EachPost from '../EachPost'
import './index.css'

const SearchedPosts = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchInput = searchParams.get('search')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSearchedPosts = async () => {
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
      setPosts(data.posts)
      setLoading(false)
    }
    fetchSearchedPosts()
  }, [searchInput])
  if (!posts && !searchInput) {
    return <p>Loading</p>
  }

  return (
    <div className="WHolePageWithheader">
      <Header />
      <div className="searchPostsContainer">
        <h1 className="searchedPostsheading">Search Results</h1>
        {loading ? (
          <div className="LoaderContainer">
            <PulseLoader
              color="#4094EF"
              loading={loading}
              size={15}
              margin={2}
            />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  )
}

export default SearchedPosts
