import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import EachProfile from '../EachProfile'
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

  const renderMyProfile = () => <EachProfile profile={profile} />

  const renderFailure = () => (
    <div className="FailurePage">
      <img
        src="https://res.cloudinary.com/dcj1stgkx/image/upload/v1739721210/alert-triangle_qpz8yo.png"
        alt="failure view"
      />
      <h1>Something went wrong. Please try again</h1>
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
