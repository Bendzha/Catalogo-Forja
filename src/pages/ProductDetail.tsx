import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart, Check, ChevronLeft, Minus, Plus } from 'lucide-react';
import { productos } from '../data/productos';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProductGrid from '../components/product/ProductGrid';
import { useCart } from '../context/CartContext';
import { formatCLP, ordenarPorTalla } from '../utils/format';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const producto = useMemo(() => productos.find((p) => p.id === id), [id]);
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string | null>(null);
  const { agregarItem } = useCart();
  const [agregado, setAgregado] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCantidad(1);
  }, [id]);

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

  const variantesOrdenadas = ordenarPorTalla(producto.variantes);
  const varianteActiva =
    variantesOrdenadas.find((v) => v.talla === tallaSeleccionada) ?? variantesOrdenadas[0];

  const precioDesde = Math.min(...producto.variantes.map((v) => v.precio2026));
  const relacionados = productos
    .filter((p) => p.id !== producto.id && p.categoria === producto.categoria)
    .slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
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
        className="inline-flex items-center gap-2 text-base font-medium text-[#112433] bg-white hover:bg-[#112433]/5 border border-[#112433]/15 rounded-lg px-4 py-2.5 mb-6 transition-colors"
      >
        <ChevronLeft size={20} />
        Volver
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
            className="w-full h-full object-contain p-6"
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

          {/* Descripción */}
          <div className="mt-6">
            <p className="text-sm font-medium text-[#112433] mb-2">Descripción</p>
            <p className="text-sm text-[#112433]/70 leading-relaxed">{producto.descripcion}</p>
          </div>

          {/* Selector de talla */}
          <div className="mt-6">
            <p className="text-sm font-medium text-[#112433] mb-2">Talla</p>
            <div className="flex flex-wrap gap-2">
              {variantesOrdenadas.map((v) => (
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

          {/* Selector de cantidad */}
          <div className="mt-6">
            <p className="text-sm font-medium text-[#112433] mb-2">Cantidad</p>
            <div className="inline-flex items-center gap-3 border border-[#112433]/20 rounded-lg px-3 py-2">
              <button
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="text-[#112433]/60 hover:text-[#112433] p-1"
                aria-label="Disminuir cantidad"
              >
                <Minus size={16} />
              </button>
              <span className="text-base font-semibold w-6 text-center">{cantidad}</span>
              <button
                onClick={() => setCantidad((c) => c + 1)}
                className="text-[#112433]/60 hover:text-[#112433] p-1"
                aria-label="Aumentar cantidad"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                agregarItem(
                  {
                    productoId: producto.id,
                    nombre: producto.nombre,
                    categoria: producto.categoria,
                    imagen: producto.imagen,
                    sku: varianteActiva.sku,
                    talla: varianteActiva.talla,
                    precio: varianteActiva.precio2026,
                  },
                  cantidad
                );
                setAgregado(true);
                setTimeout(() => setAgregado(false), 2000);
              }}
            >
              {agregado ? <Check size={18} /> : <ShoppingCart size={18} />}
              <span>{agregado ? 'Agregado al carrito' : 'Agregar al carrito'}</span>
            </Button>
          </div>

          {/* SKU actual */}
          <p className="text-xs text-[#112433]/40 mt-4">SKU: {varianteActiva.sku}</p>
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