import { useRef, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminButton from '../../components/admin/AdminButton';
import { AdminField, AdminFormActions, AdminPage } from '../../components/admin/AdminEditor';
import confirmDelete from '../../components/admin/confirmDelete';
import useAdminContent from '../../hooks/useAdminContent';
import { saveDocument } from '../../services/adminContent';

function AdminAbout() {
  const { about } = useAdminContent();
  const [draft, setDraft] = useState(null);
  const newImageUrl = useRef(null);
  const start = () => setDraft(about ? { ...about, links: { ...about.links } } : { id: 1, name: '', role: '', headline: '', introduction: '', location: '', email: '', profileImageUrl: null, links: { github: null, blog: null, linkedIn: null } });
  const cancel = () => { if (newImageUrl.current) URL.revokeObjectURL(newImageUrl.current); newImageUrl.current = null; setDraft(null); };
  const setField = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const setLink = (key, value) => setDraft((current) => ({ ...current, links: { ...current.links, [key]: value } }));
  const chooseImage = (file) => {
    if (!file) return;
    if (newImageUrl.current) URL.revokeObjectURL(newImageUrl.current);
    const url = URL.createObjectURL(file);
    newImageUrl.current = url;
    setDraft((current) => ({ ...current, profileImageUrl: url, profileImageFile: file }));
  };
  const save = (event) => { event.preventDefault(); if (!draft.name.trim()) return; saveDocument('about', draft); newImageUrl.current = null; setDraft(null); };

  return <AdminLayout><AdminPage title="About" description="프로필과 외부 링크를 편집합니다." action={!draft && <AdminButton type="button" variant="primary" onClick={start}>{about ? '프로필 수정' : '프로필 추가'}</AdminButton>}>
    {!draft && <div className="admin-list">{about ? <article className="admin-list__row"><div><p className="admin-list__meta">Profile</p><h2>{about.name}</h2><p>{about.role} · {about.location}</p><p>{about.headline}</p></div><div className="admin-actions"><AdminButton type="button" onClick={start}>수정</AdminButton><AdminButton type="button" variant="danger" onClick={() => { if (confirmDelete(about.name)) saveDocument('about', null); }}>삭제</AdminButton></div></article> : <p className="admin-empty">프로필이 없습니다. 새 프로필을 추가하세요.</p>}</div>}
    {draft && <form className="admin-editor" onSubmit={save}><h2>프로필 수정</h2><div className="admin-editor__grid">
      <AdminField label="이름" value={draft.name} onChange={(value) => setField('name', value)} required />
      <AdminField label="직무" value={draft.role} onChange={(value) => setField('role', value)} />
      <AdminField label="Headline" value={draft.headline} onChange={(value) => setField('headline', value)} className="admin-field--wide" />
      <AdminField label="소개" value={draft.introduction} onChange={(value) => setField('introduction', value)} multiline className="admin-field--wide" />
      <AdminField label="지역" value={draft.location} onChange={(value) => setField('location', value)} />
      <AdminField label="이메일" type="email" value={draft.email} onChange={(value) => setField('email', value)} />
      <AdminField label="프로필 이미지 URL" type="url" value={draft.profileImageUrl?.startsWith('blob:') ? '' : draft.profileImageUrl} onChange={(value) => setDraft((current) => ({ ...current, profileImageUrl: value, profileImageFile: null }))} className="admin-field--wide" />
      <label className="admin-field admin-field--wide"><span>프로필 이미지 파일 선택</span><input type="file" accept="image/*" onChange={(event) => chooseImage(event.target.files?.[0])} />{draft.profileImageFile && <small>{draft.profileImageFile.name}</small>}</label>
      {draft.profileImageUrl && <div className="admin-field--wide"><img className="admin-preview" src={draft.profileImageUrl} alt="선택한 프로필 이미지 미리보기" /></div>}
      <AdminField label="GitHub URL" type="url" value={draft.links.github} onChange={(value) => setLink('github', value)} />
      <AdminField label="Blog URL" type="url" value={draft.links.blog} onChange={(value) => setLink('blog', value)} />
      <AdminField label="LinkedIn URL" type="url" value={draft.links.linkedIn} onChange={(value) => setLink('linkedIn', value)} />
    </div><p className="admin-note">선택한 이미지 파일은 서버로 업로드되지 않으며 새로고침하면 사라집니다.</p>
    <div className="admin-actions"><AdminFormActions onCancel={cancel} />{draft.profileImageUrl && <AdminButton type="button" variant="danger" onClick={() => { if (confirmDelete('프로필 이미지')) setDraft((current) => ({ ...current, profileImageUrl: null, profileImageFile: null })); }}>이미지 삭제</AdminButton>}</div>
    </form>}
  </AdminPage></AdminLayout>;
}

export default AdminAbout;
