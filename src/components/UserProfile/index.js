import {useState, useEffect} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import EachProfile from '../EachProfile'
import './index.css'

const constants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const UserProfile = () => {
  const {userId} = useParams()
  const [userProfile, setUserProfile] = useState(null)
  const [active, setActive] = useState(constants.initial)

  const fetchUserProfile = async () => {
    setActive(constants.loading)
    const url = `https://apis.ccbp.in/insta-share/users/${userId}`
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
      setUserProfile(data.user_details)
      setActive(constants.success)
    } else {
      setActive(constants.failure)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [userId])

  const renderUserprofile = () => <EachProfile profile={userProfile} />

  const renderFailure = () => (
    <div className="FailurePage">
      <img
        src="https://res.cloudinary.com/dcj1stgkx/image/upload/v1739721210/alert-triangle_qpz8yo.png"
        alt="failure view"
      />
      <h1>Something went wrong. Please try again</h1>
      <button type="button" onClick={fetchUserProfile}>
        Try again
      </button>
    </div>
  )

  const renderLoader = () => (
    <div className="LoaderContainer" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  if (Cookies.get('jwt_token') === undefined) {
    return <Redirect to="/login" />
  }

  const renderContent = () => {
    switch (active) {
      case constants.success:
        return renderUserprofile()
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

export default UserProfile
