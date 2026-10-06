import profile from '../../mock/profile'
import skills from '../../mock/skills'
import './ProfileSection.css'

function ProfileSection() {
  return (
    <section className="profile-section section" aria-labelledby="profile-title">
      <div className="container profile-section__layout">
        <div className="profile-section__heading">
          <p className="section-label" data-section-number="01">Profile</p>
          <h2 id="profile-title">만들고 싶은 경험</h2>
        </div>
        <div className="profile-section__content">
          <p className="profile-section__introduction">{profile.introduction}</p>
          <dl className="profile-section__details">
            <div>
              <dt>Role</dt>
              <dd>{profile.role}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
          </dl>
          <div className="profile-section__interests">
            <p>Interests</p>
            <ul>
              {skills.map((skillGroup) => (
                <li key={skillGroup.id}>{skillGroup.category}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileSection
