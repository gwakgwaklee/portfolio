import React from "react";
import SkillIcon from "../../components/skills/SkillIcon";

function ProjectItem({ project, index, getTechIcon }) {
  return (
    <li className="project-entry">
      {/* 인덱스 + 제목 */}
      <div className="project-entry__header">
        <span className="project-entry__index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="project-entry__title">{project.title}</h2>
      </div>

      {/* 바디: 좌측 메타 / 우측 콘텐츠 */}
      <div className="project-entry__body">

        {/* 좌측: 메타 + Highlights */}
        <div className="project-entry__left">
          <dl className="project-entry__meta">
            {project.period.startDate && (
              <>
                <dt>기간</dt>
                <dd>
                  {project.period.startDate}
                  {project.period.endDate ? ` ~ ${project.period.endDate}` : " ~ 진행 중"}
                </dd>
              </>
            )}
            {project.role && (
              <>
                <dt>역할</dt>
                <dd>{project.role}</dd>
              </>
            )}
            {project.status && (
              <>
                <dt>상태</dt>
                <dd>{project.status}</dd>
              </>
            )}
          </dl>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="project-entry__highlights">
              <p className="project-entry__highlights-label">HIGHLIGHTS</p>
              <ul className="project-entry__highlights-list">
                {project.highlights.map((txt, i) => (
                  <li key={i} className="project-entry__highlights-item">
                    ∙ {txt}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 우측: 설명 + 기술스택 + 링크 */}
        <div className="project-entry__right">
          <p className="project-entry__desc">{project.description}</p>

          {project.technologies.length > 0 && (
            <ul className="project-entry__tech" aria-label="사용 기술">
              {project.technologies.map((tech) => {
                const icon = getTechIcon(tech);
                return (
                  <li key={tech} className="project-entry__tech-item">
                    {icon ? (
                      <>
                        <SkillIcon src={icon} alt={`${tech} 로고`} />
                        <span>{tech}</span>
                      </>
                    ) : (
                      <span>{tech}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {(project.links.githubUrl || project.links.detailUrl || project.links.deployUrl) && (
            <div className="project-entry__links">
              {project.links.githubUrl && (
                <a href={project.links.githubUrl} target="_blank" rel="noreferrer" className="project-entry__link">
                  GitHub ↗
                </a>
              )}
              {project.links.detailUrl && (
                <a href={project.links.detailUrl} target="_blank" rel="noreferrer" className="project-entry__link">
                  자세히 보기 ↗
                </a>
              )}
              {project.links.deployUrl && (
                <a href={project.links.deployUrl} target="_blank" rel="noreferrer" className="project-entry__link">
                  배포 사이트 ↗
                </a>
              )}
            </div>
          )}
        </div>

      </div>
    </li>
  );
}

export default ProjectItem;
