import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'
import './index.css'

import Header from '../Header'

const constants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const MyProfile = () => {
  const [profile, setProfile] = useState({})
  const [active, setActive] = useState(constants.initial)

  const fetchMyProfile = async () => {
    setActive(constants.loading)
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
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
      setProfile(data.profile)
      setActive(constants.success)
    } else {
      setActive(constants.failure)
    }
  }

  useEffect(() => {
    fetchMyProfile()
  }, [])
  if (Cookies.get('jwt_token') === undefined) {
    return <Redirect to="/login" />
  }

  const renderMyProfile = () => {
    const renderPosts = () => (
      <ul className="AllPostsHOlder">
        {profile.posts.map(post => (
          <li className="eachPost">
            <img
              className="eachPostImg"
              key={post.id}
              src={post.image}
              alt="my post"
            />
          </li>
        ))}
      </ul>
    )

    const renderNoPosts = () => (
      <div className="NoPosts">
        <div className="cameraContainer">
          <BiCamera />
        </div>
        <h1>No Posts Yet</h1>
      </div>
    )
    return (
      <div className="WholeProflePage">
        <div className="ProfileHead">
          <div className="WholeUserDetailsInProfileHead">
            <img
              className="ProfilePicInProfileHead"
              src={profile.profile_pic}
              alt="my profile"
            />

            <div className="userDetailsInProfilehead">
              <h1 className="ProfileNameOfUser">{profile.user_name}</h1>
              <div className="followingAndFollowersBlock">
                <p className="eachDataInFollowingBlock">
                  <span className="eachBolddataInFollowingBlock">
                    {profile.posts_count}
                  </span>
                  posts
                </p>
                <p className="eachDataInFollowingBlock">
                  <span className="eachBolddataInFollowingBlock">
                    {profile.followers_count}
                  </span>
                  followers
                </p>
                <p className="eachDataInFollowingBlock">
                  <span className="eachBolddataInFollowingBlock">
                    {profile.following_count}
                  </span>
                  following
                </p>
              </div>
              <p className="userIdINProfilehead">{profile.user_id}</p>
              <p className="userBio">{profile.user_bio}</p>
            </div>
          </div>
          <ul className="stories-block">
            {profile.stories.map(each => (
              <li key={each.id} className="story">
                <img src={each.image} alt="my story" className="story-image" />
              </li>
            ))}
          </ul>
          <hr />
          <div className="postIconWIthPOstspara">
            <BsGrid3X3 className="PostsIcon" />
            <h1 className="PostsPara">Posts</h1>
          </div>
          {profile.posts.length === 0 ? renderNoPosts() : renderPosts()}
        </div>
      </div>
    )
  }

  const renderFailure = () => (
    <div className="FailurePage">
      <img
        src="https://res.cloudinary.com/dcj1stgkx/image/upload/v1739721210/alert-triangle_qpz8yo.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={fetchMyProfile}>
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
        return renderMyProfile()
      case constants.loading:
        return renderLoader()
      case constants.failure:
        return renderFailure()
      default:
        return null
    }
  }

  return (
    <div>
      <Header />
      {renderContent()}
    </div>
  )
}

export default MyProfile
