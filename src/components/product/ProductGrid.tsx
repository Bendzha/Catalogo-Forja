import type { Producto } from '../../data/productos';
import ProductCard from './ProductCard';

interface ProductGridProps {
  productos: Producto[];
  onVerDetalle?: (producto: Producto) => void;
}

export default function ProductGrid({ productos, onVerDetalle }: ProductGridProps) {
  if (productos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-semibold text-[#1C2321]">
          No encontramos productos con esos filtros
        </p>
        <p className="text-sm text-[#1C2321]/50 mt-1">
          Prueba ajustando la categoría, el género o el texto de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} onVerDetalle={onVerDetalle} />
      ))}
    </div>
  );
}