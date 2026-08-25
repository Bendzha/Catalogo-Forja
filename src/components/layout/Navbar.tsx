import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'text-[#FF6B35]'
        : 'text-[#1C2321]/70 hover:text-[#1C2321]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#1C2321]/8">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg tracking-tight text-[#1C2321]">
          FOR<span className="text-[#FF6B35]">JA</span>
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