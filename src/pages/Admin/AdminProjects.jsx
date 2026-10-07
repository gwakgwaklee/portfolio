import { useEffect, useRef, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminButton from '../../components/admin/AdminButton';
import { AdminField, AdminFormActions, AdminListActions, AdminPage } from '../../components/admin/AdminEditor';
import confirmDelete from '../../components/admin/confirmDelete';
import useAdminContent from '../../hooks/useAdminContent';
import { deleteListItem, saveListItem } from '../../services/adminContent';

const emptyProject = () => ({ id: null, title: '', summary: '', description: '', role: '', status: '', period: { startDate: '', endDate: '' }, technologiesText: '', highlightsText: '', links: { githubUrl: '', demoUrl: '', deployUrl: '' }, media: [] });
const cloneProject = (project) => ({ ...project, period: { ...project.period }, technologiesText: (project.technologies || []).join('\n'), highlightsText: (project.highlights || []).join('\n'), links: { ...project.links }, media: (project.media || []).map((item) => ({ ...item })) });
const splitLines = (value) => value.split('\n').map((part) => part.trim()).filter(Boolean);

function AdminProjects() {
  const { projects } = useAdminContent();
  const [draft, setDraft] = useState(null);
  const [previewId, setPreviewId] = useState(null);
  const [error, setError] = useState('');
  const newUrls = useRef(new Set());
  useEffect(() => () => { newUrls.current.forEach((url) => URL.revokeObjectURL(url)); }, []);

  const discard = () => {
    newUrls.current.forEach((url) => URL.revokeObjectURL(url));
    newUrls.current.clear();
    setDraft(null);
    setPreviewId(null);
    setError('');
  };
  const edit = (project) => { discard(); setDraft(cloneProject(project)); };
  const setField = (field, value) => setDraft((current) => ({ ...current, [field]: value }));
  const setNested = (field, key, value) => setDraft((current) => ({ ...current, [field]: { ...current[field], [key]: value } }));
  const setMedia = (id, patch) => setDraft((current) => ({ ...current, media: current.media.map((item) => item.id === id ? { ...item, ...patch } : item) }));
  const addMedia = () => setDraft((current) => ({ ...current, media: [...current.media, { id: Math.max(0, ...current.media.map((item) => Number(item.id) || 0)) + 1, type: 'pdf', title: '', url: '' }] }));
  const chooseFile = (item, file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    newUrls.current.add(url);
    if (newUrls.current.has(item.url)) { URL.revokeObjectURL(item.url); newUrls.current.delete(item.url); }
    setMedia(item.id, { url, fileName: file.name, file });
  };
  const save = (event) => {
    event.preventDefault();
    if (!draft.title.trim()) { setError('프로젝트 제목을 입력해 주세요.'); return; }
    if (draft.media.some((item) => !item.title.trim() || !item.url)) { setError('각 자료의 제목과 URL 또는 파일을 지정해 주세요.'); return; }
    const { technologiesText, highlightsText, ...fields } = draft;
    saveListItem('projects', { ...fields, title: fields.title.trim(), technologies: splitLines(technologiesText), highlights: splitLines(highlightsText) });
    newUrls.current.forEach((url) => { if (!draft.media.some((item) => item.url === url)) URL.revokeObjectURL(url); });
    newUrls.current.clear();
    setDraft(null);
    setPreviewId(null);
  };

  return <AdminLayout><AdminPage title="Projects" description="기본 정보, 링크, 기술과 PDF·동영상 자료를 관리합니다." action={<AdminButton type="button" variant="primary" onClick={() => { discard(); setDraft(emptyProject()); }}>프로젝트 추가</AdminButton>}>
    {draft && <form className="admin-editor" onSubmit={save}>
      <h2>{draft.id == null ? '프로젝트 추가' : '프로젝트 수정'}</h2>
      <div className="admin-editor__grid">
        <AdminField label="제목" value={draft.title} onChange={(value) => setField('title', value)} required />
        <AdminField label="요약" value={draft.summary} onChange={(value) => setField('summary', value)} />
        <AdminField label="설명" value={draft.description} onChange={(value) => setField('description', value)} multiline className="admin-field--wide" />
        <AdminField label="역할" value={draft.role} onChange={(value) => setField('role', value)} />
        <AdminField label="상태" value={draft.status} onChange={(value) => setField('status', value)} />
        <AdminField label="시작일" value={draft.period.startDate} onChange={(value) => setNested('period', 'startDate', value)} placeholder="YYYY-MM" />
        <AdminField label="종료일" value={draft.period.endDate} onChange={(value) => setNested('period', 'endDate', value)} placeholder="진행 중이면 비워두기" />
        <AdminField label="기술 (한 줄에 하나씩)" value={draft.technologiesText} onChange={(value) => setField('technologiesText', value)} multiline />
        <AdminField label="주요 성과 (한 줄에 하나씩)" value={draft.highlightsText} onChange={(value) => setField('highlightsText', value)} multiline />
        <AdminField label="GitHub URL" type="url" value={draft.links.githubUrl} onChange={(value) => setNested('links', 'githubUrl', value)} />
        <AdminField label="Demo URL" type="url" value={draft.links.demoUrl} onChange={(value) => setNested('links', 'demoUrl', value)} />
        <AdminField label="배포 URL" type="url" value={draft.links.deployUrl} onChange={(value) => setNested('links', 'deployUrl', value)} />
      </div>
      <div className="admin-subsection"><div className="admin-subsection__heading"><h3>PDF / 동영상 자료</h3><AdminButton type="button" onClick={addMedia}>자료 추가</AdminButton></div>
        <p className="admin-note">파일 선택 결과는 현재 실행 중인 화면에서만 미리볼 수 있습니다. 서버 업로드는 연결되지 않았습니다.</p>
        <div className="admin-repeat">{draft.media.map((item) => <div className="admin-repeat__item" key={item.id}>
          <div className="admin-editor__grid">
            <label className="admin-field"><span>종류</span><select value={item.type} onChange={(event) => { setMedia(item.id, { type: event.target.value }); setPreviewId(null); }}><option value="pdf">PDF</option><option value="video">동영상</option></select></label>
            <AdminField label="제목" value={item.title} onChange={(value) => setMedia(item.id, { title: value })} required />
            <AdminField label="자료 URL" type="url" value={item.url?.startsWith('blob:') ? '' : item.url} onChange={(value) => setMedia(item.id, { url: value, file: null, fileName: '' })} placeholder="또는 아래에서 파일 선택" className="admin-field--wide" />
            <label className="admin-field admin-field--wide"><span>파일 선택</span><input className="admin-file" type="file" accept={item.type === 'pdf' ? 'application/pdf,.pdf' : 'video/*'} onChange={(event) => chooseFile(item, event.target.files?.[0])} />{item.fileName && <small>{item.fileName}</small>}</label>
          </div>
          <div className="admin-actions"><AdminButton type="button" onClick={() => setPreviewId(previewId === item.id ? null : item.id)} disabled={!item.url}>미리보기</AdminButton><AdminButton type="button" variant="danger" onClick={() => { if (confirmDelete(item.title || '자료')) { setDraft((current) => ({ ...current, media: current.media.filter((media) => media.id !== item.id) })); setPreviewId(null); } }}>자료 삭제</AdminButton></div>
          {previewId === item.id && item.url && (item.type === 'pdf' ? <iframe className="admin-preview admin-preview--media" src={item.url} title={`${item.title} PDF 미리보기`} /> : <video className="admin-preview admin-preview--media" src={item.url} controls />)}
        </div>)}</div>
      </div>
      {error && <p className="admin-error" role="alert">{error}</p>}
      <AdminFormActions onCancel={discard} />
    </form>}
    <div className="admin-list">{projects.map((project) => <article className="admin-list__row" key={project.id}><div><p className="admin-list__meta">{project.status || '상태 없음'} · {project.period?.startDate || '기간 없음'}</p><h2>{project.title}</h2><p>{project.summary}</p></div><AdminListActions onEdit={() => edit(project)} onDelete={() => { if (confirmDelete(project.title)) { if (draft?.id === project.id) discard(); deleteListItem('projects', project.id); } }} /></article>)}</div>
  </AdminPage></AdminLayout>;
}

export default AdminProjects;
