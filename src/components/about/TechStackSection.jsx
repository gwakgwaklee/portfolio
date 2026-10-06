import skills from '../../mock/skills'
import './TechStackSection.css'

function TechStackSection() {
  return (
    <section className="tech-stack-section section" aria-labelledby="tech-stack-title">
      <div className="container">
        <div className="tech-stack-section__heading">
          <p className="section-label" data-section-number="02">Tech Stack</p>
          <h2 id="tech-stack-title">익숙한 도구와 기술</h2>
        </div>
        <div className="tech-stack-section__list">
          {skills.map((skillGroup) => (
            <article key={skillGroup.id} className="tech-stack-item">
              <h3>{skillGroup.category}</h3>
              <ul>
                {skillGroup.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStackSection
