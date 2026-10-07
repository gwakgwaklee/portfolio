import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminButton from '../../components/admin/AdminButton';
import { AdminField, AdminFormActions, AdminListActions, AdminPage } from '../../components/admin/AdminEditor';
import confirmDelete from '../../components/admin/confirmDelete';
import useAdminContent from '../../hooks/useAdminContent';
import { answerQuestion, deleteListItem, ignoreQuestion, saveKnowledge } from '../../services/adminContent';
import './AdminAIKnowledge.css';

const sourceTypes = ['ABOUT', 'PROJECT', 'SKILL', 'EXPERIENCE', 'MANUAL_QA'];
const categories = ['ABOUT', 'PROJECT', 'TECH', 'EXPERIENCE', 'Q&A'];
const emptyKnowledge = () => ({ id: null, title: '', category: 'Q&A', content: '', sourceType: 'MANUAL_QA', projectId: null });
const formatDate = (value) => value ? new Date(value).toLocaleString('ko-KR') : '-';

function SelectField({ label, value, onChange, options, required = false }) {
  return <label className="admin-field"><span>{label}</span><select value={value ?? ''} onChange={(event) => onChange(event.target.value)} required={required}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}

function AdminAIKnowledge() {
  const { knowledge, unansweredQuestions, projects } = useAdminContent();
  const [draft, setDraft] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [error, setError] = useState('');
  const selectedQuestion = unansweredQuestions.find((item) => item.id === questionId);
  const projectName = (id) => projects.find((project) => project.id === id)?.title || (id == null ? '전체' : `#${id}`);
  const edit = (item) => { setQuestionId(null); setDraft({ ...item }); setError(''); };
  const answer = (question) => {
    setQuestionId(question.id);
    setDraft({
      ...emptyKnowledge(), title: question.question,
      category: question.projectId != null ? 'PROJECT' : 'Q&A',
      sourceType: question.projectId != null ? 'PROJECT' : 'MANUAL_QA',
      projectId: question.projectId,
    });
    setError('');
  };
  const setField = (name, value) => setDraft((current) => ({ ...current, [name]: value }));
  const save = (event) => {
    event.preventDefault();
    if (!draft.title.trim() || !draft.content.trim()) { setError('제목과 내용을 입력해 주세요.'); return; }
    if (draft.sourceType === 'PROJECT' && !draft.projectId) { setError('프로젝트를 선택해 주세요.'); return; }
    const item = { ...draft, title: draft.title.trim(), content: draft.content.trim() };
    if (questionId != null) answerQuestion(questionId, item);
    else saveKnowledge(item);
    setDraft(null);
    setQuestionId(null);
    setError('');
  };

  return <AdminLayout><AdminPage title="AI Knowledge" description="챗봇이 참고할 정보를 관리하고 미답변 질문에 직접 답변합니다." action={<AdminButton type="button" variant="primary" onClick={() => { setQuestionId(null); setDraft(emptyKnowledge()); setError(''); }}>Knowledge 추가</AdminButton>}>
    {draft && <form className="admin-editor" onSubmit={save}>
      <h2>{selectedQuestion ? '미답변 질문에 답변' : draft.id == null ? 'Knowledge 추가' : 'Knowledge 수정'}</h2>
      {selectedQuestion && <p className="admin-note">질문: {selectedQuestion.question} · {selectedQuestion.pageType} / {projectName(selectedQuestion.projectId)} · 예상 Scope: {selectedQuestion.scope}</p>}
      <div className="admin-editor__grid">
        <AdminField label="제목" value={draft.title} onChange={(value) => setField('title', value)} required />
        <SelectField label="카테고리" value={draft.category} onChange={(value) => setField('category', value)} options={categories.map((value) => ({ value, label: value }))} />
        <SelectField label="Source Type" value={draft.sourceType} onChange={(value) => setDraft((current) => ({ ...current, sourceType: value, projectId: value === 'PROJECT' ? current.projectId : null }))} options={sourceTypes.map((value) => ({ value, label: value }))} />
        {draft.sourceType === 'PROJECT' && <SelectField label="프로젝트" value={draft.projectId ?? ''} onChange={(value) => setField('projectId', value ? Number(value) : null)} required options={[{ value: '', label: '프로젝트 선택' }, ...projects.map((project) => ({ value: project.id, label: project.title }))]} />}
        <AdminField label="내용 / 관리자 답변" value={draft.content} onChange={(value) => setField('content', value)} multiline required className="admin-field--wide" />
      </div>
      {error && <p className="admin-error" role="alert">{error}</p>}
      <AdminFormActions onCancel={() => { setDraft(null); setQuestionId(null); setError(''); }} />
    </form>}

    <section className="admin-ai-section" aria-labelledby="knowledge-heading"><h2 id="knowledge-heading">Knowledge <span>{knowledge.length}</span></h2>
      <div className="admin-list">{knowledge.map((item) => <article className="admin-list__row" key={item.id}><div><p className="admin-list__meta">{item.sourceType} · {item.category} · {projectName(item.projectId)}</p><h3>{item.title}</h3><p>{item.content}</p><p className="admin-ai-date">수정 {formatDate(item.updatedAt)}</p></div><AdminListActions onEdit={() => edit(item)} onDelete={() => { if (confirmDelete(item.title)) { if (draft?.id === item.id) setDraft(null); deleteListItem('knowledge', item.id); } }} /></article>)}{knowledge.length === 0 && <p className="admin-empty">등록된 Knowledge가 없습니다.</p>}</div>
    </section>

    <section className="admin-ai-section" aria-labelledby="unanswered-heading"><h2 id="unanswered-heading">미답변 질문 <span>{unansweredQuestions.filter((item) => item.status === 'PENDING').length} pending</span></h2>
      <div className="admin-list">{[...unansweredQuestions].reverse().map((question) => <article className="admin-list__row" key={question.id}><div><p className="admin-list__meta">{question.status} · {question.scope} · {formatDate(question.occurredAt)}</p><h3>{question.question}</h3><p>발생 페이지: {question.pageType} · 프로젝트: {projectName(question.projectId)} {question.projectId != null && `(#${question.projectId})`}</p></div>{question.status === 'PENDING' && <div className="admin-actions"><AdminButton type="button" variant="primary" onClick={() => answer(question)}>답변 작성</AdminButton><AdminButton type="button" onClick={() => { if (questionId === question.id) { setDraft(null); setQuestionId(null); } ignoreQuestion(question.id); }}>무시</AdminButton></div>}</article>)}{unansweredQuestions.length === 0 && <p className="admin-empty">미답변 질문이 없습니다.</p>}</div>
    </section>
  </AdminPage></AdminLayout>;
}

export default AdminAIKnowledge;
