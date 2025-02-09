import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'

import './index.css'

import React, {useState, useEffect} from 'react'

function SampleNextArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
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
  const mobileSettings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 2,
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
          {stories.map(each => {
            return (
              <div key={each.user_id} className="eachStory">
                <Popup
                  modal
                  trigger={
                    <img
                      className="eachStoryImage"
                      src={each.story_url}
                      alt="story"
                    />
                  }
                  position="right center"
                  closeOnDocumentClick
                >
                  <div className="popContainer">
                    <img
                      className="popContainerImage"
                      src={each.story_url}
                      alt="Each Story in Stories"
                    />
                  </div>
                </Popup>
                <Link to={`/users/${each.user_id}`} className="eachStoryName">
                  <p>{each.user_name}</p>
                </Link>
              </div>
            )
          })}
        </Slider>
      </div>
    </>
  )
}

export default StoriesCarousal
