import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const EachProfile = props => {
  const {profile} = props
  if (!profile || profile.stories == null) {
    return <p>Loading....</p>
  }

  const renderPosts = () => (
    <div className="AllPostsHOlder">
      {profile.posts.map(post => (
        <img
          key={post.id}
          src={post.image}
          alt="user post"
          className="eachPost"
        />
      ))}
    </div>
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
            alt="user profile"
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
              <img src={each.image} alt="user story" className="story-image" />
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

export default EachProfile
