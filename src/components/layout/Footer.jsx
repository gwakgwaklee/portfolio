import profile from '../../mock/profile'
import SectionLink from '../common/SectionLink'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>{profile.name} Portfolio</p>
        <SectionLink to="#top">Back to top</SectionLink>
      </div>
    </footer>
  )
}

export default Footer
