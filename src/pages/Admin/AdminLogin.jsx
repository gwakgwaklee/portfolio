import { useState } from 'react';
import { signInAdmin } from '../../services/adminAuth';
import AdminButton from '../../components/admin/AdminButton';
import './AdminLogin.css';

function AdminLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!signInAdmin(id, password)) {
      setError('ID 또는 비밀번호를 확인해 주세요.');
      return;
    }

    window.location.replace('/admin');
  };

  return (
    <main className="admin-login">
      <section className="admin-login__panel" aria-labelledby="admin-login-title">
        <p className="admin-login__eyebrow">Portfolio Administration</p>
        <h1 id="admin-login-title">Sign in</h1>
        <p className="admin-login__description">관리자 대시보드에 접근하려면 로그인해 주세요.</p>
        <form className="admin-login__form" onSubmit={handleSubmit}>
          <label htmlFor="admin-id">
            ID
            <input
              id="admin-id"
              name="id"
              type="text"
              autoComplete="username"
              value={id}
              onChange={(event) => setId(event.target.value)}
              required
            />
          </label>
          <label htmlFor="admin-password">
            Password
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <p className="admin-login__error" role="alert">{error}</p>}
          <AdminButton type="submit" variant="primary">Sign in</AdminButton>
        </form>
      </section>
    </main>
  );
}

export default AdminLogin;
