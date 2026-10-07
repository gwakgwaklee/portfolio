import AdminLayout from '../../components/admin/AdminLayout';
import AdminButton from '../../components/admin/AdminButton';
import useAdminContent from '../../hooks/useAdminContent';
import './AdminDashboard.css';

const managementAreas = [
  {
    title: 'Projects',
    description: '프로젝트와 PDF·동영상 자료', path: '/admin/projects',
  },
  {
    title: 'About',
    description: '프로필과 외부 링크', path: '/admin/about',
  },
  {
    title: 'Skills', description: '기술 카테고리와 기술 목록', path: '/admin/skills',
  },
  { title: 'Experience', description: '학력, 활동, 경력', path: '/admin/experience' },
  { title: 'Contact', description: '연락처와 외부 링크', path: '/admin/contact' },
];

function AdminDashboard() {
  const content = useAdminContent();
  const counts = { Projects: content.projects.length, About: content.about ? 1 : 0, Skills: content.skills.reduce((total, group) => total + group.skills.length, 0), Experience: content.experience.length, Contact: content.contact ? 1 : 0 };
  const navigate = (path) => { window.history.pushState({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')); };
  return (
    <AdminLayout>
      <section className="admin-dashboard" aria-labelledby="admin-dashboard-title">
        <p className="admin-dashboard__eyebrow">Dashboard</p>
        <h1 id="admin-dashboard-title">Content overview</h1>
        <p className="admin-dashboard__intro">
          각 콘텐츠를 선택해 현재 실행 중인 Admin 데이터에 변경사항을 반영할 수 있습니다.
        </p>
        <div className="admin-dashboard__areas">
          {managementAreas.map((area, index) => (
            <article className="admin-dashboard__area" key={area.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2>{area.title}</h2>
                <p>{area.description} · {counts[area.title]}개 항목</p>
              </div>
              <AdminButton type="button" onClick={() => navigate(area.path)}>관리하기</AdminButton>
            </article>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}

export default AdminDashboard;
