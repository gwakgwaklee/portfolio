import skills from '../../mock/skills'
import SkillIcon from './SkillIcon'
import './SkillsCatalog.css'

function SkillsCatalog() {
  return (
    <section className="skills-catalog section" aria-labelledby="skills-catalog-title">
      <div className="container">
        <div className="skills-catalog__heading">
          <p className="section-label" data-section-number="04">Capability</p>
          <h2 id="skills-catalog-title">기술을 사용하는 방식</h2>
        </div>
        <div className="skills-catalog__groups">
          {skills.map((skillGroup, index) => (
            <article key={skillGroup.id} className="skill-category">
              <div className="skill-category__heading">
                <p>0{index + 1}</p>
                <h3>{skillGroup.category}</h3>
              </div>
              <ul className="skill-category__list">
                {skillGroup.skills.map((skill) => (
                  <li key={skill.id} className="skill-item">
                    <SkillIcon src={skill.icon} alt={`${skill.name} logo`} />
                    <div className="skill-item__content">
                      <div className="skill-item__name">
                        <h4>{skill.name}</h4>
                        {skill.proficiency && <span>{skill.proficiency}</span>}
                      </div>
                      {skill.description && <p>{skill.description}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsCatalog
