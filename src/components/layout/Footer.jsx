import profile from '../../mock/profile'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>{profile.name} Portfolio</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  )
}

export default Footer
