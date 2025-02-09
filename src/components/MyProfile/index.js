import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {PulseLoader} from 'react-spinners'
import EachProfile from '../EachProfile'
import './index.css'

import Header from '../Header'

const MyProfile = () => {
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchMyProfile = async () => {
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
      setProfile(data.profile)
      setLoading(false)
    }
    fetchMyProfile()
  })
  if (Cookies.get('jwt_token') === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      <Header />
      {loading ? (
        <div className="LoaderContainer">
          <PulseLoader
            className="loader"
            color="#4094EF"
            loading={loading}
            size={15}
            margin={2}
          />
        </div>
      ) : (
        <EachProfile profile={profile} />
      )}
    </div>
  )
}

export default MyProfile
