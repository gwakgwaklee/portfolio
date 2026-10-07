import { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import ArchiveViewer from '../../components/projects/ArchiveViewer'
import SectionLink from '../../components/common/SectionLink'
import projects from '../../mock/projects'
import './ProjectDetail.css'

function formatPeriod(period) {
  if (!period?.startDate) return '-'
  return `${period.startDate} ~ ${period.endDate || '진행 중'}`
}

function ProjectDetail({ projectId }) {
  const project = projects.find((item) => String(item.id) === projectId)
  const [selectedMedia, setSelectedMedia] = useState(null)

  if (!project) {
    return (
      <div className="project-detail-page">
        <Header />
        <main className="project-detail section">
          <div className="container project-detail__fallback">
            <p className="section-label" data-section-number="04">Projects</p>
            <h1>프로젝트를 찾을 수 없습니다.</h1>
            <p>요청한 프로젝트가 없거나 더 이상 제공되지 않습니다.</p>
            <SectionLink to="/projects" className="project-detail__back">프로젝트 목록으로 돌아가기</SectionLink>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="project-detail-page">
      <Header />
      <main className="project-detail">
        <section className="project-detail__hero section" aria-labelledby="project-detail-title">
          <div className="container">
            <SectionLink to="/projects" className="project-detail__back">프로젝트 목록</SectionLink>
            <p className="section-label" data-section-number="04">Project Detail</p>
            <h1 id="project-detail-title">{project.title}</h1>
            <p className="project-detail__summary">{project.summary}</p>
          </div>
        </section>

        <section className="project-detail__content section" aria-label={`${project.title} 상세 정보`}>
          <div className="container project-detail__grid">
            <aside className="project-detail__sidebar">
              <dl className="project-detail__meta">
                <dt>기간</dt>
                <dd>{formatPeriod(project.period)}</dd>
                <dt>역할</dt>
                <dd>{project.role || '-'}</dd>
                <dt>상태</dt>
                <dd>{project.status || '-'}</dd>
              </dl>

              <div className="project-detail__links" aria-label="프로젝트 외부 링크">
                {project.links.githubUrl && <SectionLink to={project.links.githubUrl} target="_blank" rel="noreferrer" icon="external">GitHub</SectionLink>}
                {project.links.deployUrl && <SectionLink to={project.links.deployUrl} target="_blank" rel="noreferrer" icon="external">배포 사이트</SectionLink>}
              </div>
            </aside>

            <div className="project-detail__main">
              <section className="project-detail__section">
                <h2>프로젝트 소개</h2>
                <p>{project.description}</p>
              </section>

              <section className="project-detail__section">
                <h2>사용 기술</h2>
                <ul className="project-detail__technologies" aria-label="사용 기술">
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </section>

              {project.highlights?.length > 0 && (
                <section className="project-detail__section">
                  <h2>Highlights</h2>
                  <ul className="project-detail__highlights">
                    {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </section>
              )}

              <section className="project-detail__section" aria-labelledby="project-archive-title">
                <h2 id="project-archive-title">Project Archive</h2>
                {project.media?.length > 0 ? (
                  <div className="project-archive">
                    {project.media.map((media) => (
                      <button
                        type="button"
                        className="project-archive__item"
                        key={media.id}
                        onClick={() => setSelectedMedia(media)}
                        aria-label={`${media.title} 보기`}
                      >
                        <span className={`project-archive__preview project-archive__preview--${media.type}`} aria-hidden="true">
                          <span>{media.type}</span>
                        </span>
                        <span className="project-archive__content">
                          <span className="project-archive__type">{media.type}</span>
                          <strong>{media.title}</strong>
                          <span className="project-archive__action">Viewer 열기 →</span>
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="project-detail__empty">등록된 프로젝트 자료가 없습니다.</p>
                )}
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {selectedMedia && <ArchiveViewer media={selectedMedia} onClose={() => setSelectedMedia(null)} />}
    </div>
  )
}

export default ProjectDetail
