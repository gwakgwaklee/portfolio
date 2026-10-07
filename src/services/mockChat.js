import { addUnansweredQuestion, getContent } from './adminContent';

export function getChatScope(message, context) {
  if (context.pageType !== 'PROJECT' || context.projectId == null) return 'GLOBAL';
  if (/비교|다른 프로젝트|전체 프로젝트/.test(message)) return 'HYBRID';
  if (/이 프로젝트|이곳|여기/.test(message)) return 'PROJECT';
  return 'GLOBAL';
}

// POST /api/chat can replace this adapter; the component only sends { message, context }.
export async function sendMockChat({ message, context }) {
  const scope = getChatScope(message, context);
  const { knowledge, projects, skills, about, experience } = getContent();
  const normalized = message.toLowerCase();
  const keywords = (value) => value.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((word) => word.length > 1);
  const eligible = knowledge.filter((item) => scope === 'PROJECT'
    ? item.sourceType === 'PROJECT' && item.projectId === context.projectId
    : scope === 'HYBRID' ? item.projectId == null || item.projectId === context.projectId : item.projectId == null);
  const match = eligible.find((item) => keywords(item.title).some((word) => normalized.includes(word)));
  let answer = match?.content;

  if (!answer && context.pageType === 'PROJECT' && context.projectId != null) {
    const project = projects.find((item) => item.id === context.projectId);
    if (project && /이 프로젝트|이곳|여기/.test(message)) {
      if (/사용 기술|기술 스택|어떤 기술/.test(message)) answer = `${project.title}에서 사용한 기술은 ${project.technologies.join(', ')}입니다.`;
      else if (/역할|담당/.test(message)) answer = `${project.title}에서 맡은 역할은 ${project.role || '등록되지 않았습니다'}.`;
      else if (/소개|무엇|어떤 프로젝트/.test(message)) answer = project.description || project.summary;
    }
  }

  if (!answer && scope !== 'PROJECT') {
    if (/백엔드|backend/i.test(message)) answer = skills.find((group) => group.category === 'Backend')?.skills.map((skill) => skill.name).join(', ') + ' 등을 사용할 수 있습니다.';
    else if (/프로젝트.*(목록|소개)|어떤 프로젝트/.test(message)) answer = projects.map((project) => project.title).join(', ') + ' 프로젝트를 소개하고 있습니다.';
    else if (/가치관|중요하게/.test(message)) answer = about.introduction;
    else if (/경험|활동/.test(message) && !/AI|인공지능/i.test(message)) answer = experience.map((item) => item.title).join(', ') + ' 경험이 등록되어 있습니다.';
  }

  const answered = Boolean(answer);
  if (!answered) {
    addUnansweredQuestion({ question: message, context, scope });
    answer = '현재 등록된 정보만으로는 정확히 답하기 어렵습니다. 질문을 관리자에게 전달했습니다.';
  }
  await new Promise((resolve) => setTimeout(resolve, 450));
  return { answer, answered, scope, pageType: context.pageType, projectId: context.projectId };
}
