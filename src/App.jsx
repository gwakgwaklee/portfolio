import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Skills from './pages/Skills/Skills';
import Projects from './pages/Projects/Projects';
import ProjectDetail from './pages/Projects/ProjectDetail';
import Experience from './pages/Experience/Experience';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProjects from './pages/Admin/AdminProjects';
import AdminAbout from './pages/Admin/AdminAbout';
import AdminSkills from './pages/Admin/AdminSkills';
import AdminExperience from './pages/Admin/AdminExperience';
import AdminContact from './pages/Admin/AdminContact';
import AdminAIKnowledge from './pages/Admin/AdminAIKnowledge';
import PortfolioChat from './components/chat/PortfolioChat';
import { isAdminAuthenticated } from './services/adminAuth';
import { useEffect, useState } from 'react';

function redirectTo(path) {
  window.location.replace(path);
  return null;
}

function AdminRoute({ children }) {
  if (!isAdminAuthenticated()) {
    return redirectTo('/admin/login');
  }

  return children;
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onNavigate = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onNavigate);
    return () => window.removeEventListener('popstate', onNavigate);
  }, []);

  if (path === '/admin/login') {
    if (isAdminAuthenticated()) {
      return redirectTo('/admin');
    }

    return <AdminLogin />;
  }

  if (path === '/admin' || path.startsWith('/admin/')) {
    const adminPages = {
      '/admin': <AdminDashboard />,
      '/admin/projects': <AdminProjects />,
      '/admin/about': <AdminAbout />,
      '/admin/skills': <AdminSkills />,
      '/admin/experience': <AdminExperience />,
      '/admin/contact': <AdminContact />,
      '/admin/ai-knowledge': <AdminAIKnowledge />,
    };
    return (
      <AdminRoute>
        {adminPages[path] || <AdminDashboard />}
      </AdminRoute>
    );
  }

  const projectMatch = path.match(/^\/projects\/([^/]+)\/?$/);
  const context = { pageType: projectMatch ? 'PROJECT' : path === '/' ? 'HOME' : path === '/about' ? 'ABOUT' : path === '/skills' ? 'SKILLS' : path === '/experience' ? 'EXPERIENCE' : path === '/projects' ? 'PROJECTS' : path === '/contact' ? 'CONTACT' : 'HOME', projectId: projectMatch && /^\d+$/.test(projectMatch[1]) ? Number(projectMatch[1]) : null };
  let page;
  if (path === '/about') page = <About />;
  else if (path === '/skills') page = <Skills />;
  else if (path === '/projects') page = <Projects />;
  else if (projectMatch) page = <ProjectDetail projectId={projectMatch[1]} />;
  else if (path === '/experience') page = <Experience />;
  else if (path === '/contact') page = <Contact />;
  else page = <Home />;
  return <>{page}<PortfolioChat context={context} /></>;
}

export default App;
