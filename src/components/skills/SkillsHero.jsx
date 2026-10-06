import skills from '../../mock/skills'
import './SkillsHero.css'

function SkillsHero() {
  return (
    <section id="top" className="skills-hero section" aria-labelledby="skills-hero-title">
      <div className="container skills-hero__content">
        <div>
          <p className="section-label" data-section-number="03">Skills</p>
          <h1 id="skills-hero-title">기술을 통해<br />더 나은 흐름을 만듭니다.</h1>
        </div>
        <div className="skills-hero__aside">
          <p>
            문제에 맞는 기술을 선택하고, 읽기 쉬운 구조와 일관된 경험을 만드는 데 집중합니다.
          </p>
          <ul aria-label="기술 카테고리">
            {skills.map((skillGroup) => (
              <li key={skillGroup.id}>{skillGroup.category}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SkillsHero
