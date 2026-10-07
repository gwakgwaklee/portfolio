import AdminButton from './AdminButton';
import './AdminEditor.css';

export function AdminPage({ title, description, action, children }) {
  return <section className="admin-page">
    <div className="admin-page__heading"><div><p className="admin-page__eyebrow">Content management</p><h1>{title}</h1><p>{description}</p></div>{action}</div>
    {children}
  </section>;
}

export function AdminField({ label, multiline = false, value, onChange, required = false, type = 'text', placeholder, className = '' }) {
  const props = { value: value ?? '', onChange: (event) => onChange(event.target.value), required, placeholder };
  return <label className={`admin-field ${className}`.trim()}><span>{label}{required && <span aria-hidden="true"> *</span>}</span>
    {multiline ? <textarea rows="4" {...props} /> : <input type={type} {...props} />}
  </label>;
}

export function AdminFormActions({ onCancel, saveLabel = '저장' }) {
  return <div className="admin-actions"><AdminButton type="submit" variant="primary">{saveLabel}</AdminButton><AdminButton type="button" onClick={onCancel}>취소</AdminButton></div>;
}

export function AdminListActions({ onEdit, onDelete }) {
  return <div className="admin-actions"><AdminButton type="button" onClick={onEdit}>수정</AdminButton><AdminButton type="button" variant="danger" onClick={onDelete}>삭제</AdminButton></div>;
}
