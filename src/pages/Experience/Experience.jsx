import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import experience from '../../mock/experience'
import './Experience.css'

function Experience() {
  return (
    <div className="experience-page">
      <Header />
      <main>
        {/* Intro */}
        <section className="experience-intro section" aria-labelledby="experience-page-title">
          <div className="container">
            <p className="section-label" data-section-number="05">Experience</p>
            <h1 id="experience-page-title">경력</h1>
            <p className="experience-intro__desc">
              학습·프로젝트·활동 등 다양한 경험을 정리했습니다.
            </p>
          </div>
        </section>

        {/* Full list */}
        <section className="experience-list-section section" aria-label="전체 경력 목록">
          <div className="container">
            <ol className="experience-list">
              {experience.map((item) => (
                <li key={item.id} className="experience-item">
                  <p className="experience-item__period">
                    {item.startDate} — {item.endDate}
                  </p>
                  <div>
                    <p className="experience-item__organization">{item.organization}</p>
                    <h3 className="experience-item__title">{item.title}</h3>
                    <p className="experience-item__description">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Experience
