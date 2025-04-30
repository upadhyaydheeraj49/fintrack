import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not found"
      className="not-found-img"
    />
    <p className='not-found-description'>We can not seem to find the page you are looking for.</p>
    <div style={{textAlign: 'center'}}>Go to <a href='/' style={{color: '#0b69ff', textDecoration: 'none', fontSize: '16px', fontWeight: '600'}}>Home Page</a></div>
  </div>
)

export default NotFound
