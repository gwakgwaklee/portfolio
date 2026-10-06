import AboutHero from '../../components/about/AboutHero'
import ProfileSection from '../../components/about/ProfileSection'
import TechStackSection from '../../components/about/TechStackSection'
import ValuesSection from '../../components/about/ValuesSection'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import './About.css'

function About() {
  return (
    <div className="about-page">
      <Header />
      <main>
        <AboutHero />
        <ProfileSection />
        <TechStackSection />
        <ValuesSection />
      </main>
      <Footer />
    </div>
  )
}

export default About
