import SkillsCatalog from '../../components/skills/SkillsCatalog'
import SkillsHero from '../../components/skills/SkillsHero'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import './Skills.css'

function Skills() {
  return (
    <div className="skills-page">
      <Header />
      <main>
        <SkillsHero />
        <SkillsCatalog />
      </main>
      <Footer />
    </div>
  )
}

export default Skills
