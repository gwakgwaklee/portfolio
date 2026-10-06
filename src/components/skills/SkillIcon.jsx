import './SkillIcon.css'

function SkillIcon({ src, alt }) {
  return (
    <span className="skill-icon" aria-hidden="true">
      <img src={src} alt={alt} />
    </span>
  )
}

export default SkillIcon
