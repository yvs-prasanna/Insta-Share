import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'

const EachProfile = props => {
  const {profile} = props
  if (!profile || profile.stories == null) {
    return <p>Loading....</p>
  }
  return (
    <div className="WholeProflePage">
      <div className="ProfileHead">
        <div className="WholeUserDetailsInProfileHead">
          <Popup
            modal
            trigger={
              <img
                className="ProfilePicInProfileHead"
                src={profile.profile_pic}
                alt="profilePicINProfilePage"
              />
            }
            position="right center"
            closeOnDocumentClick
          >
            <div className="popContainer">
              <img
                className="popContainerImage"
                src={profile.profile_pic}
                alt="profilePicINProfilePage"
              />
            </div>
          </Popup>

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
        <div className="stories-block">
          {profile.stories.map(each => (
            <Popup
              modal
              trigger={
                <div key={each.id} className="story">
                  <img
                    src={each.image}
                    alt="story-each-profile"
                    className="story-image"
                  />
                </div>
              }
              position="right center"
              closeOnDocumentClick
            >
              <div className="popContainer">
                <img
                  className="popContainerImage"
                  src={each.image}
                  alt="eachStory"
                />
              </div>
            </Popup>
          ))}
        </div>
        <hr />
        <div className="postIconWIthPOstspara">
          <img
            className="PostsIcon"
            src="https://res.cloudinary.com/dcj1stgkx/image/upload/v1739092294/PostsIcon_vz7wl9.png"
            alt="Post With Icon"
          />
          <p className="PostsPara">Posts</p>
        </div>
        <div className="AllPostsHOlder">
          {profile.posts.map(post => (
            <img
              key={post.id}
              className="eachPost"
              src={post.image}
              alt="PostImage"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EachProfile
