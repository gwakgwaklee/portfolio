import skills from '../../mock/skills';
import SectionLink from '../../components/common/SectionLink';
import './SkillsPreview.css'

function SkillsPreview() {
  return (
    <section id="skills" className="skills-preview section" aria-labelledby="skills-title" data-section-number="03">
      <div className="container">
        <div className="skills-preview__heading">
          <p className="section-label" data-section-number="03">Skills</p>
          <h2 id="skills-title">사용하는 기술</h2>
        </div>
        <div className="skills-preview__list">
          {skills.map((skillGroup) => (
            <div
              key={skillGroup.id}
              className={
                "skills-preview__group" +
                (skillGroup.category === "DevOps" ? " no-left-border" : "")
              }
            >
              <h3>{skillGroup.category}</h3>
              <p>{skillGroup.items.join(' · ')}</p>
            </div>
          ))}
        </div>
        <div className="skills-preview__footer">
            <SectionLink to="/skills">전체 기술 보기 →</SectionLink>
        </div>
      </div>
    </section>
  );
}
export default SkillsPreview
