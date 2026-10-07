import profile from '../../mock/profile';
import SectionLink from '../../components/common/SectionLink';
import ProfileImage from '../about/ProfileImage'
import './AboutPreview.css'

function AboutPreview() {
  return (
    <section id="about" className="about-preview section" aria-labelledby="about-title" data-section-number="02">
      <div className="container about-preview__content">
        <ProfileImage className="about-preview__image" alt={`${profile.name} 프로필 이미지`} />
        <div className="about-preview__copy">
          <p className="section-label" data-section-number="02">About</p>
          <h2 id="about-title">{profile.name}에 대해</h2>
          <p>{profile.introduction}</p>
          <p className="about-preview__location">Based in {profile.location}</p>
          <SectionLink to="/about">ABOUT</SectionLink>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
