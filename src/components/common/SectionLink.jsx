import './SectionLink.css';

/**
 * Reusable button-style link for public CTAs.
 */
export default function SectionLink({ to, children, className = '', icon = 'arrow', ...props }) {
  return (
    <a href={to} className={`section-link ${className}`.trim()} {...props}>
      {children}
      <svg className="section-link__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {icon === 'external' ? <path d="M14 5h5v5M19 5l-9 9M19 14v5h-14v-14h5" /> : <path d="M5 12h14M12 5l7 7-7 7" />}
      </svg>
    </a>
  );
}
