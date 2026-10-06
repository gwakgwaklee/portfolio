import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import ProjectsIntro from '../../components/projects/ProjectsIntro'
import ProjectList from '../../components/projects/ProjectList'
import './Projects.css'

function Projects() {
  return (
    <div className="projects-page">
      <Header />
      <main>
        <ProjectsIntro />
        <ProjectList />
      </main>
      <Footer />
    </div>
  )
}

export default Projects
