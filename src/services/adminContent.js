import projectsMock from '../mock/projects.js';
import profileMock from '../mock/profile.js';
import skillsMock from '../mock/skills.js';
import experienceMock from '../mock/experience.js';
import contactMock from '../mock/contact.js';
import aiKnowledgeMock from '../mock/aiKnowledge.js';
import unansweredQuestionsMock from '../mock/unansweredQuestions.js';

// Mock files seed this in-memory adapter. Later, replace these methods with API calls.
let content = {
  projects: structuredClone(projectsMock),
  about: structuredClone(profileMock),
  skills: structuredClone(skillsMock),
  experience: structuredClone(experienceMock),
  contact: structuredClone(contactMock),
  knowledge: structuredClone(aiKnowledgeMock),
  unansweredQuestions: structuredClone(unansweredQuestionsMock),
};
const listeners = new Set();

export const subscribeContent = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export const getContent = () => content;

function publish(section, value) {
  content = { ...content, [section]: value };
  listeners.forEach((listener) => listener());
}

const nextId = (items) => Math.max(0, ...items.map((item) => Number(item.id) || 0)) + 1;

export function saveListItem(section, item) {
  const items = content[section];
  const saved = item.id == null ? { ...item, id: nextId(items) } : item;
  publish(section, item.id == null ? [...items, saved] : items.map((current) => current.id === item.id ? saved : current));
  return saved;
}

export function deleteListItem(section, id) {
  publish(section, content[section].filter((item) => item.id !== id));
}

export function saveKnowledge(item) {
  const now = new Date().toISOString();
  return saveListItem('knowledge', {
    ...item,
    projectId: item.sourceType === 'PROJECT' ? Number(item.projectId) : null,
    createdAt: item.createdAt || now,
    updatedAt: now,
  });
}

export function answerQuestion(questionId, knowledge) {
  const saved = saveKnowledge(knowledge);
  publish('unansweredQuestions', content.unansweredQuestions.map((question) =>
    question.id === questionId ? { ...question, status: 'ANSWERED', knowledgeId: saved.id } : question
  ));
  return saved;
}

export function ignoreQuestion(questionId) {
  publish('unansweredQuestions', content.unansweredQuestions.map((question) =>
    question.id === questionId ? { ...question, status: 'IGNORED' } : question
  ));
}

export function addUnansweredQuestion({ question, context, scope }) {
  const items = content.unansweredQuestions;
  const existing = items.find((item) => item.status === 'PENDING' && item.question === question && item.pageType === context.pageType && item.projectId === context.projectId);
  if (existing) return existing;
  const created = {
    id: nextId(items), question, pageType: context.pageType, projectId: context.projectId,
    scope, occurredAt: new Date().toISOString(), status: 'PENDING', knowledgeId: null,
  };
  publish('unansweredQuestions', [...items, created]);
  return created;
}

export function saveDocument(section, value) {
  publish(section, value);
}

export function saveSkillGroup(group) {
  const groups = content.skills;
  const saved = group.id == null ? { ...group, id: nextId(groups), skills: [], items: [] } : group;
  publish('skills', group.id == null ? [...groups, saved] : groups.map((current) => current.id === group.id ? saved : current));
  return saved;
}

export function deleteSkillGroup(id) {
  publish('skills', content.skills.filter((group) => group.id !== id));
}

export function saveSkill(groupId, skill) {
  const groups = content.skills;
  const allSkills = groups.flatMap((group) => group.skills);
  const saved = skill.id == null ? { ...skill, id: nextId(allSkills) } : skill;
  const target = groups.find((group) => group.category === saved.category);
  if (!target) return null;
  publish('skills', groups.map((group) => {
    if (group.id !== groupId && group.id !== target.id) return group;
    const withoutEdited = group.skills.filter((current) => current.id !== saved.id);
    const skills = group.id === target.id ? [...withoutEdited, saved] : withoutEdited;
    return { ...group, skills, items: skills.map((entry) => entry.name) };
  }));
  return saved;
}

export function deleteSkill(groupId, id) {
  publish('skills', content.skills.map((group) => {
    if (group.id !== groupId) return group;
    const skills = group.skills.filter((skill) => skill.id !== id);
    return { ...group, skills, items: skills.map((entry) => entry.name) };
  }));
}
