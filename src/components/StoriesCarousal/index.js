import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import './index.css'

import {useState, useEffect} from 'react'

function SampleNextArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      aria-label="Next Slide"
      style={{
        ...style,
        display: 'block',
        background: 'black',
        borderRadius: '100%',
      }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      aria-label="Next Slide"
      style={{
        ...style,
        display: 'block',
        background: 'black',
        borderRadius: '100%',
      }}
      onClick={onClick}
    />
  )
}

const StoriesCarousal = () => {
  const [stories, getStories] = useState([])

  const settings = {
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 3,
    infinite: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')
    const fetchData = async () => {
      const url = 'https://apis.ccbp.in/insta-share/stories'
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)
      const data = await response.json()
      getStories(data.users_stories)
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          {stories.map(each => (
            <div key={each.user_id} className="eachStory">
              <img
                className="eachStoryImage"
                src={each.story_url}
                alt="story"
              />
              <Link to={`/users/${each.user_id}`} className="eachStoryName">
                <p>{each.user_name}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default StoriesCarousal
