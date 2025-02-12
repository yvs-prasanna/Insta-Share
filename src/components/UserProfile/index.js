import {useState, useEffect} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import EachProfile from '../EachProfile'
import './index.css'

const UserProfile = () => {
  const {userId} = useParams()
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
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
      setUserProfile(data.user_details)
      setLoading(false)
    }

    fetchUserProfile()
  }, [userId])
  if (Cookies.get('jwt_token') === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Header />
      {loading ? (
        <div className="LoaderContainer">
          <Loader
            className="loader"
            color="#4094EF"
            loading={loading}
            size={15}
            margin={2}
            type="TailSpin"
          />
        </div>
      ) : (
        <>
          {userProfile.posts.length === 0 ? (
            <img src="/images/NoPostsInProfile.png" alt="No Posts In Profile" />
          ) : (
            <EachProfile profile={userProfile} />
          )}
        </>
      )}
    </div>
  )
}

export default UserProfile
