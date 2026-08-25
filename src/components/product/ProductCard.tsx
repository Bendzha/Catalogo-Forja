import type { Producto } from '../../data/productos';
import Badge from '../ui/Badge';

interface ProductCardProps {
  producto: Producto;
  onVerDetalle?: (producto: Producto) => void;
}

function formatCLP(valor: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(valor);
}

export default function ProductCard({ producto, onVerDetalle }: ProductCardProps) {
  const precioDesde = Math.min(...producto.variantes.map((v) => v.precio2026));
  const tallas = producto.variantes
    .map((v) => v.talla)
    .filter((t): t is string => Boolean(t));

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#1C2321]/5">
      {/* Etiqueta de categoría - estilo tag cosido */}
      <div className="absolute top-3 left-3 z-10">
        <Badge tone="category">{producto.categoria}</Badge>
      </div>

      {producto.descuentoPct ? (
        <div className="absolute top-3 right-3 z-10">
          <Badge tone="discount">{producto.descuentoPct}%</Badge>
        </div>
      ) : null}

      {/* Imagen */}
      <div className="aspect-4/5 bg-[#F7F7F5] overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/400x500/1C2321/F7F7F5?text=Sin+imagen';
          }}
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-2">
        <p className="text-xs font-medium text-[#3D5A80] uppercase tracking-wide">
          {producto.genero}
        </p>
        <h3 className="font-semibold text-[#1C2321] leading-snug line-clamp-2 min-h-[2.6em]">
          {producto.nombre}
        </h3>

        {tallas.length > 0 && (
          <p className="text-xs text-[#1C2321]/50">
            Tallas: {tallas.join(', ')}
          </p>
        )}

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-[#1C2321]/8">
          <div>
            <p className="text-[10px] text-[#1C2321]/50 uppercase tracking-wide">Desde</p>
            <p className="text-lg font-bold text-[#1C2321]">{formatCLP(precioDesde)}</p>
          </div>
          <button
            onClick={() => onVerDetalle?.(producto)}
            className="px-4 py-2 rounded-lg bg-[#FF6B35] text-white text-sm font-medium hover:bg-[#e85a28] transition-colors shadow-sm hover:shadow-md"
          >
            Ver detalle
          </button>
        </div>
      </div>
    </div>
  );
}