import profile from '../../mock/profile';
import SectionLink from '../../components/common/SectionLink';
import skills from '../../mock/skills';
import './Hero.css';

function Hero() {
  return (
    <section id="top" className="hero section" aria-labelledby="hero-title" data-section-number="01">
      <div className="container hero__content">
        <div className="hero__lead">
          <p className="section-label" data-section-number="01">Portfolio</p>
          <p className="hero__name">{profile.name}</p>
          <h1 id="hero-title">{profile.headline}</h1>
          <p className="hero__introduction">{profile.introduction}</p>
          <SectionLink to="/contact">함께 이야기하기</SectionLink>
        </div>
        <aside className="hero__aside" aria-label="프로필 요약">
          <div className="hero__metadata">
            <p>Role</p>
            <strong>{profile.role}</strong>
          </div>
          <div className="hero__metadata">
            <p>Based in</p>
            <strong>{profile.location}</strong>
          </div>
          <div className="hero__stack">
            <p>Core stack</p>
            <ul>
              {skills.map((skillGroup) => (
                <li key={skillGroup.id}>{skillGroup.category}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;
