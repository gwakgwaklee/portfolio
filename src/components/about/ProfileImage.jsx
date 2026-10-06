import profilePlaceholder from '../../assets/profile-placeholder.svg'
import './ProfileImage.css'

function ProfileImage({ alt, className = '' }) {
  return (
    <div className={`profile-image ${className}`.trim()}>
      <img src={profilePlaceholder} alt={alt} />
    </div>
  )
}

export default ProfileImage
