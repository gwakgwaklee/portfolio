import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import contact from '../../mock/contact'
import SectionLink from '../../components/common/SectionLink'
import './Contact.css'

function Contact() {
  const contactLinks = Object.entries(contact.links).filter(([, url]) => url)

  return (
    <div className="contact-page">
      <Header />
      <main>
        {/* Intro */}
        <section className="contact-intro section" aria-labelledby="contact-page-title">
          <div className="container">
            <p className="section-label" data-section-number="06">Contact</p>
            <h1 id="contact-page-title">연락처</h1>
            <p className="contact-intro__desc">
              함께 만들고 싶은 서비스가 있다면 편하게 이야기해주세요.
            </p>
          </div>
        </section>

        {/* Information */}
        <section className="contact-info section" aria-label="연락처 정보">
          <div className="container">
            <ul className="contact-info__list">
              <li className="contact-info__item">
                <span className="contact-info__label">EMAIL</span>
                <SectionLink to={`mailto:${contact.email}`} className="contact-info__value" icon="external">{contact.email}</SectionLink>
              </li>
              {contactLinks.map(([name, url]) => (
                <li key={name} className="contact-info__item">
                  <span className="contact-info__label">{name.toUpperCase()}</span>
                  <SectionLink to={url} target="_blank" rel="noreferrer" className="contact-info__value" icon="external">{url}</SectionLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Contact
