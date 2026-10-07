import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminButton from '../../components/admin/AdminButton';
import { AdminField, AdminFormActions, AdminListActions, AdminPage } from '../../components/admin/AdminEditor';
import confirmDelete from '../../components/admin/confirmDelete';
import useAdminContent from '../../hooks/useAdminContent';
import { deleteListItem, saveListItem } from '../../services/adminContent';

const emptyExperience = () => ({ id: null, type: 'work', organization: '', title: '', description: '', startDate: '', endDate: '' });

function AdminExperience() {
  const { experience } = useAdminContent();
  const [draft, setDraft] = useState(null);
  const setField = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const save = (event) => { event.preventDefault(); if (!draft.organization.trim() || !draft.title.trim()) return; saveListItem('experience', draft); setDraft(null); };

  return <AdminLayout><AdminPage title="Experience" description="학력, 활동, 경력 항목을 관리합니다." action={<AdminButton type="button" variant="primary" onClick={() => setDraft(emptyExperience())}>경험 추가</AdminButton>}>
    {draft && <form className="admin-editor" onSubmit={save}><h2>{draft.id == null ? '경험 추가' : '경험 수정'}</h2><div className="admin-editor__grid">
      <label className="admin-field"><span>분류 *</span><select value={draft.type} onChange={(event) => setField('type', event.target.value)}><option value="work">Work</option><option value="education">Education</option><option value="activity">Activity</option></select></label>
      <AdminField label="기관/조직" value={draft.organization} onChange={(value) => setField('organization', value)} required />
      <AdminField label="제목" value={draft.title} onChange={(value) => setField('title', value)} required />
      <AdminField label="시작일" value={draft.startDate} onChange={(value) => setField('startDate', value)} placeholder="YYYY-MM" />
      <AdminField label="종료일" value={draft.endDate} onChange={(value) => setField('endDate', value)} placeholder="YYYY-MM" />
      <AdminField label="설명" value={draft.description} onChange={(value) => setField('description', value)} multiline className="admin-field--wide" />
    </div><AdminFormActions onCancel={() => setDraft(null)} /></form>}
    <div className="admin-list">{experience.map((item) => <article className="admin-list__row" key={item.id}><div><p className="admin-list__meta">{item.type} · {item.startDate} – {item.endDate || '현재'}</p><h2>{item.title}</h2><p>{item.organization}</p></div><AdminListActions onEdit={() => setDraft({ ...item })} onDelete={() => { if (confirmDelete(item.title)) { if (draft?.id === item.id) setDraft(null); deleteListItem('experience', item.id); } }} /></article>)}</div>
  </AdminPage></AdminLayout>;
}

export default AdminExperience;
