import React from 'react'
import ProjectItem from './ProjectItem'
import projects from '../../mock/projects'
import skills from '../../mock/skills'
import SkillIcon from '../../components/skills/SkillIcon'
import '../../pages/Projects/Projects.css';

/** Returns the icon URL for a technology name from skills mock data */
function getTechIcon(techName) {
  for (const group of skills) {
    const match = group.skills.find((s) => s.name === techName)
    if (match) return match.icon
  }
  return null
}

function ProjectList() {
  return (
    <section className="projects-catalog section" aria-label="전체 프로젝트 목록">
      <div className="container">
        <ol className="projects-list">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} getTechIcon={getTechIcon} />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ProjectList
