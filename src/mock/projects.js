const projects = [
  {
    id: 1,
    title: 'Project One',
    summary: '프로젝트의 핵심 문제와 해결 과정을 소개하는 설명입니다.',
    description: '사용자 요구사항을 바탕으로 구현한 웹 프로젝트입니다. 주요 기능과 아키텍처 결정에 대해 간략히 설명합니다.',
    role: 'Full Stack Developer',
    status: 'Completed',
    period: {
      startDate: '2025-01',
      endDate: '2025-03',
    },
    technologies: ['React', 'JavaScript', 'CSS'],
    links: {
      githubUrl: 'https://github.com/example/project-one',
      demoUrl: null,
      detailUrl: 'https://example.com/project-one/detail.pdf',
      deployUrl: 'https://example.com/project-one',
    },
    highlights: [
      '핵심 성과 1: 퍼포먼스 30% 개선',
      '문제 해결: 메모리 릭을 찾아 고정',
    ],
  },
  {
    id: 2,
    title: 'Project Two',
    summary: '협업 과정과 주요 기능을 소개하는 설명입니다.',
    description: '사용자 경험을 개선하는 데 중점을 둔 웹 프로젝트입니다. 팀 프로젝트로 진행하였으며 API 설계와 프론트엔드 구현을 담당했습니다.',
    role: 'Frontend Developer',
    status: 'In Progress',
    period: {
      startDate: '2025-04',
      endDate: null,
    },
    technologies: ['React', 'Spring Boot', 'MySQL'],
    highlights: [
      '핵심 성과 2: UI 재사용성 강화',
      '문제 해결: API 응답 지연 최소화',
    ],

    links: {
      githubUrl: 'https://github.com/example/project-two',
      demoUrl: null,
      detailUrl: 'https://example.com/project-two/detail.pdf',
      deployUrl: 'https://example.com/project-two',
    },
  },
  {
    id: 3,
    title: 'Todo List',
    summary: '간단한 할 일 관리 웹 애플리케이션입니다.',
    description: 'React를 사용하여 할 일을 추가, 삭제, 완료 처리할 수 있는 기본적인 웹 애플리케이션입니다.',
    role: 'Frontend Developer',
    status: 'Completed',
    period: {
      startDate: '2023-05-10',
      endDate: '2023-05-15',
    },
    technologies: ['React', 'JavaScript', 'CSS'],
    links: {
      githubUrl: 'https://github.com/example/todo-list',
      demoUrl: 'https://example.com/todo-list',
      detailUrl: null,
      deployUrl: 'https://example.com/todo-list',
    },
    highlights: [
      '핵심 성과: 로컬 스토리지에 데이터 영구 저장',
    ],
  },
  {
    id: 4,
    title: 'Blog',
    summary: '개인 블로그 웹사이트입니다.',
    description: 'Spring Boot와 React를 사용하여 구현한 블로그 서비스입니다. 게시글 작성, 수정, 삭제 기능을 제공합니다.',
    role: 'Full Stack Developer',
    status: 'Completed',
    period: {
      startDate: '2023-06-01',
      endDate: '2023-06-15',
    },
    technologies: ['React', 'Spring Boot', 'MariaDB'],
    links: {
      githubUrl: 'https://github.com/example/blog',
      demoUrl: 'https://example.com/blog',
      detailUrl: null,
      deployUrl: 'https://example.com/blog',
    },
    highlights: [
      '핵심 성과: SEO 최적화',
    ],
  },
];

export default projects;
