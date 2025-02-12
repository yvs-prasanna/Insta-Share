import './index.css'

const NotFound = props => {
  const onClickHomePage = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="WholeNotFoundPage">
      <div className="NotFoundContainer">
        <img
          src="https://res.cloudinary.com/dcj1stgkx/image/upload/v1739096731/NotFound_yfsppn.png"
          className="notFoundImage"
          alt="Not Found"
        />
        <h1 className="pageNotFoundHeading">Page Not Found</h1>
        <p className="pageNotFoundpara">
          we are sorry, the page you requested could not be found. Please go
          back to the homepage.
        </p>
        <button
          type="button"
          onClick={onClickHomePage}
          className="HomepageButton"
        >
          Home Page
        </button>
      </div>
    </div>
  )
}

export default NotFound
