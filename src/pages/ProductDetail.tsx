import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { productos } from '../data/productos';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProductGrid from '../components/product/ProductGrid';
import { useCart } from '../context/CartContext';

function formatCLP(valor: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(valor);
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const producto = useMemo(() => productos.find((p) => p.id === id), [id]);
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string | null>(null);
  const { agregarItem } = useCart();
  const [agregado, setAgregado] = useState(false);

  if (!producto) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#112433]">Producto no encontrado</h1>
        <p className="text-[#112433]/60 mt-2">
          Puede que el enlace sea incorrecto o el producto ya no esté disponible.
        </p>
        <Button className="mt-6" onClick={() => navigate('/catalogo')}>
          Volver al catálogo
        </Button>
      </div>
    );
  }

  const varianteActiva =
    producto.variantes.find((v) => v.talla === tallaSeleccionada) ?? producto.variantes[0];

  const precioDesde = Math.min(...producto.variantes.map((v) => v.precio2026));
  const relacionados = productos
    .filter((p) => p.id !== producto.id && p.categoria === producto.categoria)
    .slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#112433]/50 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link to="/" className="hover:text-[#112433] transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link to="/catalogo" className="hover:text-[#112433] transition-colors">
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-[#112433]/80">{producto.categoria}</span>
      </nav>

      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-[#112433]/60 hover:text-[#112433] mb-6 transition-colors"
      >
        ← Volver
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Imagen */}
        <div className="relative bg-[#DCE6EC] rounded-2xl overflow-hidden aspect-4/5">
          <div className="absolute top-4 left-4 z-10">
            <Badge tone="category">{producto.categoria}</Badge>
          </div>
          {producto.descuentoPct ? (
            <div className="absolute top-4 right-4 z-10">
              <Badge tone="discount">{producto.descuentoPct}%</Badge>
            </div>
          ) : null}
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://placehold.co/600x750/112433/F5F9FB?text=Sin+imagen';
            }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold text-[#0098C9] uppercase tracking-wide mb-2">
            {producto.genero}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#112433] leading-tight">
            {producto.nombre}
          </h1>

          {producto.color && (
            <p className="text-sm text-[#112433]/60 mt-2">
              Color: <span className="font-medium text-[#112433]">{producto.color}</span>
            </p>
          )}

          <div className="mt-6 pt-6 border-t border-[#112433]/8">
            <p className="text-xs text-[#112433]/50 uppercase tracking-wide">Precio desde</p>
            <p className="text-3xl font-bold text-[#112433] mt-1">{formatCLP(precioDesde)}</p>
            <p className="text-xs text-[#112433]/40 mt-1">Precios 2026, referenciales por talla/SKU</p>
          </div>

          {/* Selector de talla */}
          <div className="mt-6">
            <p className="text-sm font-medium text-[#112433] mb-2">Talla</p>
            <div className="flex flex-wrap gap-2">
              {producto.variantes.map((v) => (
                <button
                  key={v.sku}
                  onClick={() => setTallaSeleccionada(v.talla)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    varianteActiva.sku === v.sku
                      ? 'bg-[#112433] text-white border-[#112433]'
                      : 'bg-white text-[#112433] border-[#112433]/20 hover:border-[#112433]/50'
                  }`}
                >
                  {v.talla ?? 'Única'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                agregarItem({
                  productoId: producto.id,
                  nombre: producto.nombre,
                  categoria: producto.categoria,
                  imagen: producto.imagen,
                  sku: varianteActiva.sku,
                  talla: varianteActiva.talla,
                  precio: varianteActiva.precio2026,
                });
                setAgregado(true);
                setTimeout(() => setAgregado(false), 2000);
              }}
            >
              {agregado ? <Check size={18} /> : <ShoppingCart size={18} />}
              <span>{agregado ? 'Agregado al carrito' : 'Agregar al carrito'}</span>
            </Button>
            {producto.fichaTecnica && (
              <Button variant="outline" size="lg">
                Ficha técnica
              </Button>
            )}
          </div>

          {/* SKU actual */}
          <p className="text-xs text-[#112433]/40 mt-4">SKU: {varianteActiva.sku}</p>
        </div>
      </div>

      {/* Tabla de precios por SKU/talla */}
      <div className="mt-14">
        <h2 className="text-lg font-bold text-[#112433] mb-4">Precios por talla y SKU</h2>
        <div className="overflow-x-auto rounded-xl border border-[#112433]/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F9FB] text-left text-[#112433]/60 uppercase text-xs tracking-wide">
                <th className="px-4 py-3 font-semibold">Talla</th>
                <th className="px-4 py-3 font-semibold">SKU</th>
                <th className="px-4 py-3 font-semibold text-right">Precio 2026</th>
                <th className="px-4 py-3 font-semibold text-right">Precio 2027</th>
              </tr>
            </thead>
            <tbody>
              {producto.variantes.map((v, i) => (
                <tr
                  key={v.sku}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F9FB]/50'}
                >
                  <td className="px-4 py-3 font-medium text-[#112433]">{v.talla ?? 'Única'}</td>
                  <td className="px-4 py-3 text-[#112433]/60 font-mono text-xs">{v.sku}</td>
                  <td className="px-4 py-3 text-right text-[#112433]">{formatCLP(v.precio2026)}</td>
                  <td className="px-4 py-3 text-right text-[#112433]">{formatCLP(v.precio2027)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <div className="mt-14">
          <h2 className="text-lg font-bold text-[#112433] mb-4">
            Más de {producto.categoria}
          </h2>
          <ProductGrid productos={relacionados} />
        </div>
      )}
    </div>
  );
}