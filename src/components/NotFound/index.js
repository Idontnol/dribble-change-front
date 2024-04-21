import './index.css'

const NotFound = () => (
  <div className="not-found">
  <img alt="not found" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png" className="not-found-image" />
    {/* <h1 className="">Page Not Found</h1>
    <p className="">
      We are sorry, the page you requested could not be founded
    </p> */}
   
    <span>
    <h1>Oops! Page Not Found</h1>
        <h3>We can't seem to find the page you're looking for.</h3>
        <p>Don't worry, it happens to the best of us! You can try the following:</p>
        <ul className='not-found-ul'>
        <li>Double-check the URL you entered.</li>
        <li>Head back to the <a href="/signup">sign up</a> page if you are not registered.</li>
        </ul>
    </span>
  </div>
)

export default NotFound;