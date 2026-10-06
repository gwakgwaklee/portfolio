import profile from '../../mock/profile'
import ProfileImage from './ProfileImage'
import './AboutHero.css'

function AboutHero() {
  return (
    <section id="top" className="about-hero section" aria-labelledby="about-hero-title">
      <div className="container about-hero__content">
        <ProfileImage className="about-hero__image" alt={`${profile.name} 프로필 이미지`} />
        <div className="about-hero__copy">
          <p className="about-hero__eyebrow">About</p>
          <h1 id="about-hero-title">{profile.name}</h1>
          <p className="about-hero__role">{profile.role}</p>
          <p className="about-hero__headline">{profile.headline}</p>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
