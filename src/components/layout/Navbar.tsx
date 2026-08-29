import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const location = useLocation();
  const { totalItems } = useCart();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
      location.pathname === path
        ? 'bg-[#0098C9] text-white'
        : 'text-[#112433]/70 hover:bg-[#112433]/5 hover:text-[#112433]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#112433]/8">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/logo-arias-icono.jpg" alt="ARIAS" className="h-14 w-14 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-2xl tracking-tight text-[#112433]">ARIAS</span>
            <span className="text-xs text-[#0098C9] font-semibold tracking-wide">
              SUPPLY &amp; LOGISTICS
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/" className={linkClass('/')}>
            Inicio
          </Link>
          <Link to="/catalogo" className={linkClass('/catalogo')}>
            Catálogo
          </Link>
          <Link to="/carrito" className="relative p-2.5 rounded-lg hover:bg-[#112433]/5 transition-colors ml-1">
            <ShoppingCart size={22} className="text-[#112433]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FE8900] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}