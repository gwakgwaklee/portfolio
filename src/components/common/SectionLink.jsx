import './SectionLink.css';

/**
 * Reusable CTA link used across the portfolio sections.
 * Renders a text link with an arrow icon (inline SVG) and subtle hover effects.
 */
export default function SectionLink({ to, children }) {
  return (
    <a href={to} className="section-link">
      {children}
      <svg className="section-link__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}
