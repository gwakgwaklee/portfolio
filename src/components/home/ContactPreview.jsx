import SectionLink from '../../components/common/SectionLink';
import contact from '../../mock/contact';
import './ContactPreview.css';

function ContactPreview() {
  return (
    <section id="contact" className="contact-preview section" aria-labelledby="contact-title" data-section-number="06">
      <div className="container contact-preview__content">
        <div>
          <p className="section-label" data-section-number="06">Contact</p>
          <h2 id="contact-title">함께 이야기해요.</h2>
        </div>
        <div className="contact-preview__details">
          <p>{contact.message}</p>
          <a className="contact-preview__email" href={`mailto:${contact.email}`}>{contact.email}</a>
          <SectionLink to="/contact">연락하기 →</SectionLink>
        </div>
      </div>
    </section>
  );
}

export default ContactPreview;
