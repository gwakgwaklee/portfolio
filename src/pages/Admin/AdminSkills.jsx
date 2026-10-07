import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminButton from '../../components/admin/AdminButton';
import { AdminField, AdminFormActions, AdminListActions, AdminPage } from '../../components/admin/AdminEditor';
import confirmDelete from '../../components/admin/confirmDelete';
import useAdminContent from '../../hooks/useAdminContent';
import { deleteSkill, deleteSkillGroup, saveSkill, saveSkillGroup } from '../../services/adminContent';

function AdminSkills() {
  const { skills: groups } = useAdminContent();
  const [groupDraft, setGroupDraft] = useState(null);
  const [skillDraft, setSkillDraft] = useState(null);
  const [sourceGroupId, setSourceGroupId] = useState(null);
  const [error, setError] = useState('');

  const editGroup = (group) => { setSkillDraft(null); setGroupDraft({ ...group, skills: group.skills.map((skill) => ({ ...skill })), items: [...group.items] }); };
  const editSkill = (group, skill) => { setGroupDraft(null); setSourceGroupId(group.id); setSkillDraft({ ...skill }); };
  const saveGroup = (event) => {
    event.preventDefault();
    const category = groupDraft.category.trim();
    if (!category) { setError('카테고리 이름을 입력해 주세요.'); return; }
    if (groups.some((group) => group.id !== groupDraft.id && group.category.toLowerCase() === category.toLowerCase())) { setError('같은 이름의 카테고리가 있습니다.'); return; }
    saveSkillGroup({ ...groupDraft, category, skills: groupDraft.skills.map((skill) => ({ ...skill, category })) });
    setError('');
    setGroupDraft(null);
  };
  const saveEntry = (event) => {
    event.preventDefault();
    if (!skillDraft.name.trim() || !skillDraft.category) { setError('기술 이름과 카테고리를 확인해 주세요.'); return; }
    saveSkill(sourceGroupId, { ...skillDraft, name: skillDraft.name.trim() });
    setError('');
    setSkillDraft(null);
  };
  const setSkillField = (key, value) => setSkillDraft((current) => ({ ...current, [key]: value }));

  return <AdminLayout><AdminPage title="Skills" description="카테고리와 그 안의 기술을 관리합니다." action={<AdminButton type="button" variant="primary" onClick={() => { setSkillDraft(null); setGroupDraft({ id: null, category: '', skills: [], items: [] }); }}>카테고리 추가</AdminButton>}>
    {groupDraft && <form className="admin-editor" onSubmit={saveGroup}><h2>{groupDraft.id == null ? '카테고리 추가' : '카테고리 수정'}</h2><div className="admin-editor__grid"><AdminField label="카테고리 이름" value={groupDraft.category} onChange={(value) => { setError(''); setGroupDraft((current) => ({ ...current, category: value })); }} required /></div>{error && <p className="admin-error" role="alert">{error}</p>}<AdminFormActions onCancel={() => { setError(''); setGroupDraft(null); }} /></form>}
    {skillDraft && <form className="admin-editor" onSubmit={saveEntry}><h2>{skillDraft.id == null ? '기술 추가' : '기술 수정'}</h2><div className="admin-editor__grid">
      <AdminField label="기술 이름" value={skillDraft.name} onChange={(value) => setSkillField('name', value)} required />
      <label className="admin-field"><span>카테고리 *</span><select value={skillDraft.category} onChange={(event) => setSkillField('category', event.target.value)} required>{groups.map((group) => <option key={group.id} value={group.category}>{group.category}</option>)}</select></label>
      <AdminField label="아이콘 URL" type="url" value={skillDraft.icon} onChange={(value) => setSkillField('icon', value)} />
      <AdminField label="숙련도" value={skillDraft.proficiency} onChange={(value) => setSkillField('proficiency', value)} />
      <AdminField label="설명" value={skillDraft.description} onChange={(value) => setSkillField('description', value)} multiline className="admin-field--wide" />
    </div>{error && <p className="admin-error" role="alert">{error}</p>}<AdminFormActions onCancel={() => { setError(''); setSkillDraft(null); }} /></form>}
    {groups.map((group) => <section className="admin-group" key={group.id}><div className="admin-group__heading"><h2>{group.category} <small>({group.skills.length})</small></h2><div className="admin-actions">
      <AdminButton type="button" variant="primary" onClick={() => { setGroupDraft(null); setSourceGroupId(group.id); setSkillDraft({ id: null, name: '', category: group.category, icon: '', description: '', proficiency: '' }); }}>기술 추가</AdminButton>
      <AdminButton type="button" onClick={() => editGroup(group)}>카테고리 수정</AdminButton>
      <AdminButton type="button" variant="danger" onClick={() => { if (confirmDelete(`${group.category} 카테고리와 내부 기술 ${group.skills.length}개`)) { setGroupDraft(null); setSkillDraft(null); deleteSkillGroup(group.id); } }}>카테고리 삭제</AdminButton>
    </div></div><div className="admin-list">{group.skills.map((skill) => <article className="admin-list__row" key={skill.id}><div><p className="admin-list__meta">{skill.proficiency || '숙련도 없음'}</p><h3>{skill.name}</h3><p>{skill.description}</p></div><AdminListActions onEdit={() => editSkill(group, skill)} onDelete={() => { if (confirmDelete(skill.name)) { if (skillDraft?.id === skill.id) setSkillDraft(null); deleteSkill(group.id, skill.id); } }} /></article>)}{group.skills.length === 0 && <p className="admin-empty">등록된 기술이 없습니다.</p>}</div></section>)}
  </AdminPage></AdminLayout>;
}

export default AdminSkills;
