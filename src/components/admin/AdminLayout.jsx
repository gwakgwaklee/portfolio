import { signOutAdmin } from '../../services/adminAuth';
import AdminButton from './AdminButton';
import './AdminLayout.css';

const navigationItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'About', href: '/admin/about' },
  { label: 'Skills', href: '/admin/skills' },
  { label: 'Experience', href: '/admin/experience' },
  { label: 'Contact', href: '/admin/contact' },
  { label: 'AI Knowledge', href: '/admin/ai-knowledge' },
];

function AdminLayout({ children }) {
  const currentPath = window.location.pathname;
  const handleNavigation = (href) => {
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  const handleSignOut = () => {
    signOutAdmin();
    window.location.replace('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <a className="admin-sidebar__brand" href="/admin" onClick={(event) => { event.preventDefault(); handleNavigation('/admin'); }} aria-label="Admin dashboard home">
          Portfolio <span>Admin</span>
        </a>
        <nav className="admin-sidebar__nav" aria-label="Admin navigation">
          {navigationItems.map((item) => (
            <AdminButton
              className={item.href === currentPath ? 'is-active' : ''}
              aria-current={item.href === currentPath ? 'page' : undefined}
              type="button"
              variant="navigation"
              onClick={() => handleNavigation(item.href)}
              key={item.label}
            >
              {item.label}
            </AdminButton>
          ))}
        </nav>
        <AdminButton className="admin-sidebar__sign-out" type="button" variant="text" onClick={handleSignOut}>
          Log out
        </AdminButton>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <p>Portfolio management</p>
          <span>Admin</span>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
