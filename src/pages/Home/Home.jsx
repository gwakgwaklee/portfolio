import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import AboutPreview from '../../components/home/AboutPreview'
import ContactPreview from '../../components/home/ContactPreview'
import ExperiencePreview from '../../components/home/ExperiencePreview'
import Hero from '../../components/home/Hero'
import ProjectsPreview from '../../components/home/ProjectsPreview'
import SkillsPreview from '../../components/home/SkillsPreview'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <Header />
      <main>
        <Hero />
        <AboutPreview />
        <SkillsPreview />
        <ProjectsPreview />
        <ExperiencePreview />
        <ContactPreview />
      </main>
      <Footer />
    </div>
  )
}

export default Home
