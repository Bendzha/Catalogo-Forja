import { Link } from 'react-router-dom';
import type { Producto } from '../../data/productos';
import Badge from '../ui/Badge';

interface ProductCardProps {
  producto: Producto;
}

const ORDEN_TALLAS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

function formatCLP(valor: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(valor);
}

export default function ProductCard({ producto }: ProductCardProps) {
  const precioDesde = Math.min(...producto.variantes.map((v) => v.precio2026));
  const tallas = producto.variantes
    .map((v) => v.talla)
    .filter((t): t is string => Boolean(t))
    .sort((a, b) => ORDEN_TALLAS.indexOf(a) - ORDEN_TALLAS.indexOf(b));

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#112433]/5">
      <div className="absolute top-3 left-3 z-10">
        <Badge tone="category">{producto.categoria}</Badge>
      </div>

      {producto.descuentoPct ? (
        <div className="absolute top-3 right-3 z-10">
          <Badge tone="discount">{producto.descuentoPct}%</Badge>
        </div>
      ) : null}

      <div className="aspect-4/5 bg-[#DCE6EC] overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/400x500/112433/F5F9FB?text=Sin+imagen';
          }}
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <p className="text-xs font-medium text-[#0098C9] uppercase tracking-wide">
          {producto.genero}
        </p>
        <h3 className="font-semibold text-[#112433] leading-snug line-clamp-2 min-h-[2.6em]">
          {producto.nombre}
        </h3>

        {tallas.length > 0 && (
          <p className="text-xs text-[#112433]/50">
            Tallas: {tallas.join(', ')}
          </p>
        )}

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-[#112433]/8">
          <div>
            <p className="text-[10px] text-[#112433]/50 uppercase tracking-wide">Desde</p>
            <p className="text-lg font-bold text-[#112433]">{formatCLP(precioDesde)}</p>
          </div>
          <Link
            to={`/producto/${producto.id}`}
            className="px-4 py-2 rounded-lg bg-[#0098C9] text-white text-sm font-semibold hover:bg-[#0084ae] transition-colors shadow-sm hover:shadow-md"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}