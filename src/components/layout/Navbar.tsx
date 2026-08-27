import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'text-[#6B7A2E]'
        : 'text-[#3D332E]/70 hover:text-[#3D332E]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#3D332E]/8">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo-bcm-icono.jpeg" alt="BCM" className="h-9 w-9 object-contain" />
          <span className="font-bold text-lg tracking-tight text-[#3D332E]">BCM</span>
        </Link>
        <nav className="flex gap-6">
          <Link to="/" className={linkClass('/')}>
            Inicio
          </Link>
          <Link to="/catalogo" className={linkClass('/catalogo')}>
            Catálogo
          </Link>
        </nav>
      </div>
    </header>
  );
}