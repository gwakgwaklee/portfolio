import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Skills from './pages/Skills/Skills';
import Projects from './pages/Projects/Projects';
import Experience from './pages/Experience/Experience';

function App() {
  const path = window.location.pathname;
  if (path === '/about') return <About />;
  if (path === '/skills') return <Skills />;
  if (path === '/projects') return <Projects />;
  if (path === '/experience') return <Experience />;
  if (path === '/contact') return <Contact />;
  // default home page
  return <Home />;
}

export default App;
