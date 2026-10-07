import { useEffect, useRef } from 'react'
import './ArchiveViewer.css'

function ArchiveViewer({ media, onClose }) {
  const closeButtonRef = useRef(null)
  const viewerRef = useRef(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = viewerRef.current?.querySelectorAll(
        'button, [href], iframe, video, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="archive-viewer" role="presentation" onMouseDown={onClose}>
      <section
        className="archive-viewer__panel"
        ref={viewerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="archive-viewer-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="archive-viewer__header">
          <div>
            <p className="archive-viewer__type">{media.type}</p>
            <h2 id="archive-viewer-title">{media.title}</h2>
          </div>
          <button type="button" className="archive-viewer__close" onClick={onClose} ref={closeButtonRef}>
            <span aria-hidden="true">×</span>
            <span className="archive-viewer__close-label">Close</span>
          </button>
        </header>

        <div className="archive-viewer__media">
          {media.type === 'pdf' ? (
            <iframe src={media.url} title={`${media.title} PDF viewer`} />
          ) : (
            <video controls preload="metadata">
              <source src={media.url} />
              브라우저가 이 영상을 지원하지 않습니다.
            </video>
          )}
        </div>
      </section>
    </div>
  )
}

export default ArchiveViewer
