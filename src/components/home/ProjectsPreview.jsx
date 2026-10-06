import projects from '../../mock/projects';
import SectionLink from '../../components/common/SectionLink';
import './ProjectsPreview.css'

function ProjectsPreview() {
  const recentProjects = projects.slice(0, 2)

  return (
    <section
      id="projects"
      className="projects-preview section"
      aria-labelledby="projects-preview-title"
    >
      <div className="container">
        <div className="projects-preview__heading">
          <p className="section-label" data-section-number="04">Projects</p>
          <h2 id="projects-preview-title">최근 프로젝트</h2>
        </div>
        <ol className="projects-preview__list">
          {recentProjects.map((project, index) => (
            <li key={project.id} className="projects-preview__item">
              <span className="projects-preview__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="projects-preview__content">
                <h3 className="projects-preview__title">{project.title}</h3>
                <p className="projects-preview__summary">{project.summary}</p>
                <p className="projects-preview__meta">
                  {project.technologies.join(' · ')}
                  {project.period.startDate && (
                    <span>
                      &ensp;—&ensp;
                      {project.period.startDate}
                      {project.period.endDate ? ` ~ ${project.period.endDate}` : ' ~ 진행 중'}
                    </span>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="projects-preview__footer">
            <SectionLink to="/projects">프로젝트 보러가기 →</SectionLink>
        </div>
      </div>
    </section>
  )
}

export default ProjectsPreview
