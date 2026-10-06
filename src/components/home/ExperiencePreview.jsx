import SectionLink from '../../components/common/SectionLink';
import experience from '../../mock/experience';
import './ExperiencePreview.css'

function ExperiencePreview() {
  const recent = experience.slice(0, 2)
  return (
    <section
      id="experience"
      className="experience-preview section"
      aria-labelledby="experience-title"
      data-section-number="05"
    >
      <div className="container">
        <div className="experience-preview__heading">
          <p className="section-label" data-section-number="05">Experience</p>
          <h2 id="experience-title">학습과 경험</h2>
        </div>
        <ol className="experience-preview__list">
          {recent.map((item) => (
            <li key={item.id} className="experience-item">
              <p className="experience-item__period">
                {item.startDate} — {item.endDate}
              </p>
              <div>
                <p className="experience-item__organization">{item.organization}</p>
                <h3>{item.title}</h3>
                <p className="experience-item__description">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="experience-preview__footer">
            <SectionLink to="/experience">전체 경력 보기 →</SectionLink>
        </div>
      </div>
    </section>
  )
}

export default ExperiencePreview
