import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminButton from '../../components/admin/AdminButton';
import { AdminField, AdminFormActions, AdminPage } from '../../components/admin/AdminEditor';
import confirmDelete from '../../components/admin/confirmDelete';
import useAdminContent from '../../hooks/useAdminContent';
import { saveDocument } from '../../services/adminContent';

function AdminContact() {
  const { contact } = useAdminContent();
  const [draft, setDraft] = useState(null);
  const start = () => setDraft(contact ? { ...contact, links: { ...contact.links } } : { email: '', message: '', links: { github: null, blog: null, linkedIn: null } });
  const setLink = (key, value) => setDraft((current) => ({ ...current, links: { ...current.links, [key]: value } }));
  const save = (event) => { event.preventDefault(); if (!draft.email.trim()) return; saveDocument('contact', draft); setDraft(null); };

  return <AdminLayout><AdminPage title="Contact" description="연락처와 외부 링크를 편집합니다." action={!draft && <AdminButton type="button" variant="primary" onClick={start}>{contact ? '연락처 수정' : '연락처 추가'}</AdminButton>}>
    {!draft && <div className="admin-list">{contact ? <article className="admin-list__row"><div><p className="admin-list__meta">Contact</p><h2>{contact.email}</h2><p>{contact.message}</p><p>{Object.entries(contact.links).filter(([, url]) => url).map(([name]) => name).join(' · ')}</p></div><div className="admin-actions"><AdminButton type="button" onClick={start}>수정</AdminButton><AdminButton type="button" variant="danger" onClick={() => { if (confirmDelete(contact.email)) saveDocument('contact', null); }}>삭제</AdminButton></div></article> : <p className="admin-empty">연락처가 없습니다. 새 연락처를 추가하세요.</p>}</div>}
    {draft && <form className="admin-editor" onSubmit={save}><h2>연락처 수정</h2><div className="admin-editor__grid">
      <AdminField label="이메일" type="email" value={draft.email} onChange={(value) => setDraft((current) => ({ ...current, email: value }))} required />
      <AdminField label="안내 문구" value={draft.message} onChange={(value) => setDraft((current) => ({ ...current, message: value }))} multiline className="admin-field--wide" />
      <AdminField label="GitHub URL" type="url" value={draft.links.github} onChange={(value) => setLink('github', value)} />
      <AdminField label="Blog URL" type="url" value={draft.links.blog} onChange={(value) => setLink('blog', value)} />
      <AdminField label="LinkedIn URL" type="url" value={draft.links.linkedIn} onChange={(value) => setLink('linkedIn', value)} />
    </div><AdminFormActions onCancel={() => setDraft(null)} /></form>}
  </AdminPage></AdminLayout>;
}

export default AdminContact;
