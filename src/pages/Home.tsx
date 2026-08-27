import { Link } from 'react-router-dom';
import { productos } from '../data/productos';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
 
export default function Home() {
  const destacados = productos.slice(0, 4);
 
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#3D332E] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-start gap-5">
          <span className="text-[#D4D93A] font-semibold text-sm uppercase tracking-wide">
            BCM · Ropa de trabajo
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl">
            Vestimenta industrial hecha para resistir la jornada completa
          </h1>
          <p className="text-white/60 max-w-xl">
            Pantalones cargo, parkas, chalecos reflectantes y uniformes completos,
            pensados para minería, terreno y construcción.
          </p>
          <Link to="/catalogo">
            <Button variant="primary" size="lg">
              Ver catálogo completo
            </Button>
          </Link>
        </div>
      </section>
 
      {/* Destacados */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#3D332E]">Productos destacados</h2>
          <Link to="/catalogo" className="text-sm font-medium text-[#6B7A2E] hover:underline">
            Ver todos →
          </Link>
        </div>
        <ProductGrid productos={destacados} />
      </section>
    </div>
  );
}