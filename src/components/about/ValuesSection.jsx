import profile from '../../mock/profile'
import './ValuesSection.css'

function ValuesSection() {
  return (
    <section className="values-section section" aria-labelledby="values-title">
      <div className="container values-section__layout">
        <div className="values-section__heading">
          <p className="section-label" data-section-number="03">Approach</p>
          <h2 id="values-title">개발을 대하는 방식</h2>
        </div>
        <div className="values-section__list">
          <article>
            <p className="values-section__index">01</p>
            <h3>사용자 경험</h3>
            <p>{profile.headline}</p>
          </article>
          <article>
            <p className="values-section__index">02</p>
            <h3>협업과 완성도</h3>
            <p>{profile.introduction}</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default ValuesSection
