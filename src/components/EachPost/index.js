import {useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import './index.css'

const EachPost = props => {
  const {post} = props
  const [isLiked, setisLiked] = useState(false)

  const likeStatus = async () => {
    const likeStatusOBj = {like_status: isLiked}
    if (isLiked) {
      post.likes_count += 1
    } else {
      post.likes_count -= 1
    }
    const url = `https://apis.ccbp.in/insta-share/posts/${post.post_id}/like`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      body: JSON.stringify(likeStatusOBj),
    }
    await fetch(url, options)
  }

  const onChangeLikeStatus = () => {
    likeStatus()
    setisLiked(!isLiked)
  }

  return (
    <div className="WholePost">
      <div className="UserNameOnPostWithImageDiv">
        <div className="ImageContainer">
          <img
            className="userImageOnPost"
            src={post.profile_pic}
            alt="post author profile"
          />
        </div>

        <Link to={`/users/${post.user_id}`} className="userNameOnPost">
          <p>{post.user_name}</p>
        </Link>
      </div>
      <div className="PostImageHolder">
        <img src={post.post_details.image_url} alt="post" />
      </div>
      <div className="LikeCommentsHolder">
        {isLiked ? (
          <button type="button">
            <FcLike data-testid="likeIcon" onClick={onChangeLikeStatus} />
          </button>
        ) : (
          <button type="button">
            <BsHeart data-testid="unLikeIcon" onClick={onChangeLikeStatus} />
          </button>
        )}
        <FaRegComment />
        <BiShareAlt />
      </div>
      <p className="noOfLikes">{post.likes_count} likes</p>
      <p className="postCaption">{post.post_details.caption}</p>
      {post.comments.map(each => (
        <p key={each.user_id} className="commentOFPost">
          <span className="commentedUsername">{each.user_name}</span>
          {each.comment}
        </p>
      ))}
      <p className="PostedTime">{post.created_at}</p>
    </div>
  )
}

export default EachPost
